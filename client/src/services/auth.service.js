import axios from 'axios';

const API_URL = 'http://localhost:6001/api/auth/';

const register = (username, email, password, role) => {
    return axios.post(API_URL + 'signup', {
        username,
        email,
        password,
        role
    });
};

const login = (email, password) => {
    return axios.post(API_URL + 'signin', {
        email,
        password,
    }).then((response) => {
        if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export default {
    register,
    login,
    logout,
    getCurrentUser,
};
