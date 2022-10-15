// To post data to the back-end and change data in Local Storage
import axios from 'axios'

const BASE_URL_AUTH = 'http://localhost:8080/auth'

const signup = (username, password, email) => {
    return axios.post(BASE_URL_AUTH + 'signup', { username, password, email });
};

const login = async (username, password) => {
    res = await axios.post(BASE_URL_AUTH + 'login', { username, password });
    if (res.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(res.data));
    }
    return res.data
}

const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    signup,
    login,
    logout
}

export default authService;