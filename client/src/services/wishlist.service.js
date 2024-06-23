import axios from 'axios';

const API_URL = 'http://localhost:6001/api/wishlist/';

const getWishlist = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error in getWishlist:', error.response || error.message);
        throw error;
    }
};

const addItemToWishlist = async (userId, productId) => {
    try {
        const response = await axios.post(`${API_URL}${userId}/add`, { productId });
        return response.data;
    } catch (error) {
        console.error('Error in addItemToWishlist:', error.response || error.message);
        throw error;
    }
};

const removeItemFromWishlist = async (userId, productId) => {
    try {
        const response = await axios.post(`${API_URL}${userId}/remove`, { productId });
        return response.data;
    } catch (error) {
        console.error('Error in removeItemFromWishlist:', error.response || error.message);
        throw error;
    }
};

const clearWishlist = async (userId) => {
    try {
        const response = await axios.post(`${API_URL}${userId}/clear`);
        return response.data;
    } catch (error) {
        console.error('Error in clearWishlist:', error.response || error.message);
        throw error;
    }
};

export default {
    getWishlist,
    addItemToWishlist,
    removeItemFromWishlist,
    clearWishlist,
};
