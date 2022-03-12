function Login(email, password){
    if(email === "admin@admin.com" && password === "admin") return true
    return false
}

module.exports = {
    Login
}