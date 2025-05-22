// Simple cache utility for profile data
let profileDataCache = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 60000; // 1 minute cache

export const getProfileCache = () => {
    try {
        const now = Date.now();
        if (profileDataCache && now - cacheTimestamp < CACHE_DURATION) {
            return profileDataCache;
        }
    } catch (error) {
        console.error("Cache access error:", error);
    }
    return null;
};

export const setProfileCache = (data) => {
    profileDataCache = data;
    cacheTimestamp = Date.now();
};

export const clearProfileCache = () => {
    profileDataCache = null;
    cacheTimestamp = 0;
};
