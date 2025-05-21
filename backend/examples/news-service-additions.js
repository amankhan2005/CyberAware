/**
 * Additional functions to add to newsService.js for handling claps and related features
 */

// Add a clap to a news article
export const clapNews = async (id, token) => {
    try {
        const response = await axios.post(`${API_URL}/news/clap/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Follow an expert
export const followExpert = async (expertId, token) => {
    try {
        const response = await axios.post(`${API_URL}/experts/follow/${expertId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Unfollow an expert
export const unfollowExpert = async (expertId, token) => {
    try {
        const response = await axios.post(`${API_URL}/experts/unfollow/${expertId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
