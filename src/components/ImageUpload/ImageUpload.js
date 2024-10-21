import React, { useState, useRef } from 'react';
import { FormButton, Input } from '../GlobalStyles/FormStyles';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { ModalBox, ModalContainer } from '../GlobalStyles/ModalStyles';
import { ButtonsContainer } from '../../pages/Auth/ModuleStyles';
import BlankImg from "../../assets/hotel.png";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import './ImageUpload.css'; // Make sure to create this CSS file

const ImageUpload = (props) => {
    const { setImageURL, imageUrl, data, styles, setSelected, selected } = props;
    const fileInput = useRef(null);
    // if the image is not present then we are setting the blank image
    const [src, setSrc] = useState(imageUrl ? imageUrl : BlankImg);
    const [popup, setPopup] = useState(false);
    const [image, setImage] = useState(null);
    const [crop, setCrop] = useState({
        unit: 'px',
        x: 130,
        y: 50,
        width: 160,
        height: 90,
        aspect: 16 / 9
    });
    const [preview, setPreview] = useState('');
    const [imageFile, setImageFile] = useState({});

    const displayChange = (e) => {
        e.preventDefault();
        setImageFile(e.target.files[0]);
        setSrc(URL.createObjectURL(e.target.files[0]));
        setPopup(true);
    };

    const dataURLtoFile = (dataurl, filename) => {
        const arr = dataurl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        const n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };

    const getCroppedImg = (e) => {
        e.preventDefault();
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height,
        );
        const base64Image = canvas.toDataURL('image/jpeg');
        const file = dataURLtoFile(base64Image, "file.jpg");
        setPreview(base64Image);
        setImageURL(file);
        setPopup(false);
    };

    const closeCrop = () => {
        setSrc(imageUrl);
        setPopup(false);
    };

    const selectForDelete = () => {
        if (selected.includes(data.uuid)) {
            const sl = selected.filter(s => s !== data.uuid);
            setSelected(sl);
        } else {
            setSelected([...selected, data.uuid]);
        }
    };

    return (
        <div className="upload-container">
            {popup && (
                <ModalContainer>
                    <ModalBox>
                        {src && (
                            <>
                                <ReactCrop src={src} onImageLoaded={setImage}
                                    crop={crop} onChange={setCrop} />
                                <ButtonsContainer>
                                    <FormButton className="crop-btn" onClick={closeCrop}>
                                        Cancel
                                    </FormButton>
                                    <FormButton className="crop-btn" onClick={getCroppedImg}>
                                        Crop & Upload Image
                                    </FormButton>
                                </ButtonsContainer>
                            </>
                        )}
                    </ModalBox>
                </ModalContainer>
            )}

            <div 
                className={`image-container ${props.single ? '' : selected.includes(data.uuid) ? 'selected' : ''}`} 
                onClick={() => !imageUrl ? fileInput.current.click() : null} 
                style={styles}
            >
                {preview ? <img src={preview} alt="" /> : <img src={src} alt="" />}
                {imageUrl && <DeleteOutlineIcon className="delete-icon" onClick={selectForDelete} />}
            </div>

            <Input 
                type="file" 
                accept="image/*" 
                onChange={displayChange} 
                style={{ display: 'none' }} 
                ref={fileInput} 
            />
        </div>
    );
}

export default ImageUpload;