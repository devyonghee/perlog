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
        margin: theme.spacing.unit * 2,
        height: `calc(100vh - ${theme.footerHeight}px - ${theme.spacing.unit * 6}px)`
    },

    message: {},

    contents: {
        paddingLeft: '10px',
        h1: true,
    },
    ...createFileNameClass(theme.type),
}));

export default useStyles;