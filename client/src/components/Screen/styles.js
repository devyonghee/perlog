import {makeStyles} from '@material-ui/styles'
import colors from '../colors';

const createFileNameClass = (themeType) =>
    colors.reduce((colorClasses, [lightColor, darkColor], index) => ({
        ...colorClasses,
        [`fileName${index}`]: {
            color: themeType === 'light' ? lightColor[300] : darkColor[300],
        }
    }), {});

const useStyles = makeStyles(theme => ({
    paper: {
        paddingLeft: theme.spacing.unit * 30,
        paddingTop: theme.spacing.unit * 2,
        minHeight: '100vh',
    },

    message: {},

    contents: {
        paddingLeft: '10px',
        h1: true,
    },
    ...createFileNameClass(theme.type),
}));

export default useStyles;