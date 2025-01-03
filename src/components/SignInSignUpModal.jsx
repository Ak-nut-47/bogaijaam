import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText, // For loading state text
    DialogActions,
    Button,
    TextField,
    IconButton,
    Snackbar,
    Alert,
    CircularProgress, // For loading indicator
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close'; // For close button
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const SignInSignUpModal = ({ open, handleClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [passwordError, setPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // For loading state

    const handleTogglePasswordVisibility = () => setShowPassword(!showPassword);

    const validatePassword = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const isValidLength = password.length >= 8 && password.length <= 20;

        if (!hasUpperCase || !hasLowerCase || !hasNumber || !isValidLength) {
            return 'Password must be 8-20 characters long, include uppercase, lowercase, and a number.';
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const error = validatePassword(password);
        if (error) {
            setPasswordError(error);
            return;
        } else {
            setPasswordError('');
        }

        setIsLoading(true); // Set loading state before API call

        try {
            const url = isSignup ? '/.netlify/functions/signup' : '/.netlify/functions/login';
            console.log("URL is ______", url)
            const data = isSignup ? { email, password, username } : { email, password };

            const response = await axios.post(url, data);
            const token = response?.data?.token
            console.log("Response ___", response)
            if (token) {
                const decodedToken = jwtDecode(token);
                const userRole = decodedToken.role;
                localStorage.setItem('token', token);
                localStorage.setItem('role', userRole);
            }
            setSnackbarMessage(isSignup ? 'Signup successful!' : 'Login successful!');
            setSnackbarSeverity('success');

            setEmail('');
            setPassword('');
            setUsername('');
            setIsSignup(false);

            setTimeout(() => {
                handleClose();
            }, 1500);
        } catch (error) {
            setSnackbarMessage(error.response.data.error || 'An error occurred');
            setSnackbarSeverity('error');
        } finally {
            setIsLoading(false); // Clear loading state after API call
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => setSnackbarOpen(false);

    useEffect(() => {
        if (!open) {
            setEmail('');
            setPassword('');
            setUsername('');
            setIsSignup(false);
            setShowPassword(false);
            setPasswordError('');
        }
    }, [open]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {isSignup ? 'Sign Up' : 'Login'}
                <IconButton onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        fullWidth
                        margin="normal"
                        required
                    />
                    {isSignup && (
                        <TextField
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            fullWidth
                            margin="normal"
                            required
                        />
                    )}
                    <TextField
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        margin="normal"
                        required
                        error={Boolean(passwordError)}
                        helperText={passwordError}
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={handleTogglePasswordVisibility}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            ),
                        }}
                    />
                    {isLoading && (
                        <DialogContentText>
                            <CircularProgress /> Loading...
                        </DialogContentText>
                    )}
                    <DialogActions>
                        <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                            {isSignup ? 'Sign Up' : 'Login'}
                        </Button>
                        <Button onClick={() => setIsSignup(!isSignup)}>
                            {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Dialog>
    );
};

export default SignInSignUpModal;