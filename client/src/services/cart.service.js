import axios from 'axios';

const API_URL = 'http://localhost:6001/api/cart/';

const getCart = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error in getCart:', error.response || error.message);
        throw error;
    }
};

const addItem = async (userId, productId, quantity = 1) => {
    try {
        const response = await axios.post(`${API_URL}${userId}/add`, { productId, quantity });
        return response.data;
    } catch (error) {
        console.error('Error in addItem:', error.response || error.message);
        throw error;
    }
};

const removeItem = async (userId, productId) => {
    try {
        const response = await axios.post(`${API_URL}${userId}/remove`, { productId });
        return response.data;
    } catch (error) {
        console.error('Error in removeItem:', error.response || error.message);
        throw error;
    }
};

const clearCart = async (userId) => {
    try {
        const response = await axios.post(`${API_URL}${userId}/clear`);
        return response.data;
    } catch (error) {
        console.error('Error in clearCart:', error.response || error.message);
        throw error;
    }
};


const getTotalItems = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}${userId}/total-items`);
        return response.data;
    } catch (error) {
        console.error('Error in getTotalItems:', error.response || error.message);
        throw error;
    }
};
  
export default {
    getCart,
    addItem,
    removeItem,
    getTotalItems,
    clearCart,
};
