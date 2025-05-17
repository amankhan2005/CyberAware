import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Get all news articles with pagination and filters
export const getAllNews = async (params = {}) => {
    try {
        const response = await axios.get(`${API_URL}/news/getall`, { params });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Get a single news article by ID
export const getNewsById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/news/getbyid/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Add a new news article (Admin only)
export const addNews = async (newsData, token) => {
    try {
        const response = await axios.post(`${API_URL}/news/add`, newsData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Update a news article (Admin only)
export const updateNews = async (id, newsData, token) => {
    try {
        const response = await axios.put(`${API_URL}/news/update/${id}`, newsData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Delete a news article (Admin only)
export const deleteNews = async (id, token) => {
    try {
        const response = await axios.delete(`${API_URL}/news/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}; 