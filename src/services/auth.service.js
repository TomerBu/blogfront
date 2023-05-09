import axios from "axios";

const baseUrl = 'http://tomerbu.com:8081/api/v1/auth';

const register = (email, username, password) => {
    return axios.post(`${baseUrl}/signup`, { email, username, password })
}

const login = (username, password) => {
    return axios.post(`${baseUrl}/signin`, { username, password })
        .then(res => {
            console.log(res)
            console.log(res.data) //token
            const token = res.data.token

            if (token) {
                //save the token in local storage
                localStorage.setItem("token", token)
                localStorage.setItem("user",
                    JSON.stringify({
                        username, token
                    })
                )
            }
            //enable chaining:
            return res.data
        })
}

const logout = () => {
    //delete the token from localstorage:
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    //localStorage.clear()
}

const authService = { register, login, logout }
export default authService;