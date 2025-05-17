import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Get all queries with pagination and filters
export const getAllQueries = async (page = 1, limit = 10, filters = {}) => {
    try {
        const response = await axios.get(`${API_URL}/queries/getall`, {
            params: {
                page,
                limit,
                ...filters
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Get a single query by ID
export const getQueryById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/queries/getbyid/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Create a new query
export const createQuery = async (queryData) => {
    try {
        const response = await axios.post(`${API_URL}/queries/create`, queryData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Add a response to a query
export const addResponse = async (queryId, responseData) => {
    try {
        const response = await axios.post(`${API_URL}/queries/respond/${queryId}`, responseData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Update query status
export const updateQueryStatus = async (queryId, status) => {
    try {
        const response = await axios.patch(`${API_URL}/queries/updatestatus/${queryId}`, { status }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Update query priority
export const updateQueryPriority = async (queryId, priority) => {
    try {
        const response = await axios.patch(`${API_URL}/queries/updatepriority/${queryId}`, { priority }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Add attachment to query
export const addAttachment = async (queryId, attachmentData) => {
    try {
        const response = await axios.post(`${API_URL}/queries/addattachment/${queryId}`, attachmentData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Delete a query
export const deleteQuery = async (queryId) => {
    try {
        const response = await axios.delete(`${API_URL}/queries/delete/${queryId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}; 