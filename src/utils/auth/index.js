export const isLogged = () => {
    const token = localStorage.getItem("access_token")
    return (token !== null && token !== "undefined")
}

export const getUser = () => {
    const user = localStorage.getItem("user")
    return user
}

export const getToken = () => {
    const token = localStorage.getItem("access_token")
    return token
}

export const logout = () => {
    localStorage.removeItem("access_token")
    window.location.replace("/")
}

export const isAdmin = () => {
    return localStorage.getItem("role") === "admin"
}