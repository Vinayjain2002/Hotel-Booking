//we are just deleting the local Storage
const Logout = () => {
    localStorage.removeItem('user')
    window.location.href = "/login"
    return null
}

export default Logout
