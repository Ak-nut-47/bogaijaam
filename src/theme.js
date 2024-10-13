import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#00897b', // Teal-like color
            light: '#26a69a',
            dark: '#00695c',
        },
        coral: {
            main: '#ff7f50', // Coral-like color
            light: '#ff9e70',
            dark: '#ff5c30',
        },
        secondary: {
            main: '#ff5722', // Complementary color 1 - a warm orange
            light: '#ff8a50',
            dark: '#e64a19',
        },
        accent: {
            main: '#607d8b', // Complementary color 2 - a cool slate blue
            light: '#8eacbb',
            dark: '#455a64',
        },
        background: {
            default: '#f0f4f8', // Light background for the whole site
            paper: '#ffffff', // Card background
        },
        text: {
            primary: '#212121', // Dark text
            secondary: '#757575', // Lighter text
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#00897b', // Primary teal color for headings
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
        },
        body1: {
            fontSize: '1rem',
            color: '#455a64', // Use complementary color for body text
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: '8px', // Slightly rounded buttons for a modern feel
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Soft shadow for cards
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: '#00897b', // Teal AppBar
                },
            },
        },
    },
});

export default theme;
