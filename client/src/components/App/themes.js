import {lightBlue, red} from "@material-ui/core/colors";

const theme = {
    palette: {
        primary: lightBlue,
        secondary: red,
        background: {
            paper: 'white'
        },
    },
    spacing: {
        unit: '8px'
    },

    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        fontWeightMedium: 500,
        useNextVariants: true,
    }
};

export default theme;