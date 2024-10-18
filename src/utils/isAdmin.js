import jwt from 'jsonwebtoken';

export const isAdmin = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    // Use the same secret used for signing the token
    const decoded = jwt.decode(token);
    return decoded && decoded.role === 'admin'; // Adjust according to your role naming
};
