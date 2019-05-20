import {createMuiTheme} from "@material-ui/core/styles";
import {lightBlue, red} from "@material-ui/core/colors";

export default createMuiTheme({
    palette: {
        primary: lightBlue,
        secondary: red,
        background: {
            paper: 'white'
        },
        type: 'light',
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
});
