// Auth utility functions for CyberAware application
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import jwt_decode from './jwt_decode';

/**
 * Validates if user is authenticated and has appropriate role
 * @param {string|array} allowedRoles - Single role or array of roles allowed
 * @returns {Object} Authentication state and user data
 */
export function useAuth(allowedRoles = null) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [hasRequiredRole, setHasRequiredRole] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Check for authentication
        const checkAuth = () => {
            try {
                // First, check if this is for expert authentication
                if (allowedRoles === 'expert') {
                    // Check expert token
                    const expertToken = localStorage.getItem('expert-token');
                    if (!expertToken) {
                        setLoading(false);
                        return;
                    }

                    try {
                        // Directly decode the expert token to get user data
                        const decoded = jwt_decode(expertToken);
                        
                        // Check if token is expired
                        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                            localStorage.removeItem('expert-token');
                            setLoading(false);
                            return;
                        }
                        
                        // Set expert user data from decoded token
                        setUser(decoded);
                        setIsAuthenticated(true);
                        setHasRequiredRole(true); // Expert token implies expert role
                        setLoading(false);
                        return;
                    } catch (e) {
                        console.error('Expert token validation error:', e);
                        setLoading(false);
                        return;
                    }
                }
                
                // Regular user authentication flow
                const token = localStorage.getItem('token');
                if (!token) {
                    setLoading(false);
                    return;
                }

                // Get user data
                const userData = JSON.parse(localStorage.getItem('user'));
                if (!userData) {
                    setLoading(false);
                    return;
                }

                // Validate token expiration
                try {
                    const decoded = jwt_decode(token);
                    if (decoded.exp * 1000 < Date.now()) {
                        // Token expired
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        setLoading(false);
                        return;
                    }
                } catch (e) {
                    console.error('Token validation error:', e);
                    setLoading(false);
                    return;
                }

                setUser(userData);
                setIsAuthenticated(true);

                // Check role if needed
                if (allowedRoles) {
                    const userRole = userData.role;
                    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
                    if (roles.includes(userRole)) {
                        setHasRequiredRole(true);
                    }
                } else {
                    // No role requirement, so it's fine
                    setHasRequiredRole(true);
                }

                setLoading(false);
            } catch (error) {
                console.error('Auth check error:', error);
                setLoading(false);
            }
        };

        checkAuth();
    }, [allowedRoles, router]);

    return { user, loading, isAuthenticated, hasRequiredRole };
}

/**
 * Hook to protect routes based on authentication and role
 * @param {string|array} allowedRoles - Single role or array of roles allowed
 * @param {string} redirectUrl - Where to redirect if auth fails
 */
export function useProtectedRoute(allowedRoles, redirectUrl = '/login') {
    const { loading, isAuthenticated, hasRequiredRole } = useAuth(allowedRoles);
    const router = useRouter();

    useEffect(() => {
        if (!loading && (!isAuthenticated || !hasRequiredRole)) {
            router.push(redirectUrl);
        }
    }, [loading, isAuthenticated, hasRequiredRole, redirectUrl, router]);

    return { loading };
}

/**
 * Manually check if user is authenticated with a specific role
 * @param {string|array} requiredRoles - Roles to check for
 * @returns {boolean} Whether the user has permission
 */
export function checkUserPermission(requiredRoles) {
    try {
        // Special case for expert role check
        if (requiredRoles === 'expert') {
            const expertToken = localStorage.getItem('expert-token');
            if (expertToken) {
                try {
                    // If we have a valid expert token, they have expert permissions
                    const decoded = jwt_decode(expertToken);
                    return decoded && decoded._id; // Basic validation that token has an ID
                } catch (e) {
                    console.error('Expert token decode error:', e);
                    return false;
                }
            }
        }

        // Regular user permission check
        const userData = JSON.parse(localStorage.getItem('user'));
        if (!userData) return false;

        const userRole = userData.role;
        const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

        return roles.includes(userRole);
    } catch (error) {
        console.error('Permission check error:', error);
        return false;
    }
}

/**
 * Log user out and redirect
 * @param {function} router - Next.js router instance
 * @param {string} redirectPath - Path to redirect to after logout
 * @param {string} userType - Type of user ('user' or 'expert')
 */
export function logout(router, redirectPath = '/login', userType = 'user') {
    if (userType === 'expert') {
        localStorage.removeItem('expert-token');
        router.push('/expert_login');
    } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push(redirectPath);
    }
}
