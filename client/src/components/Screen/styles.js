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
        padding:theme.spacing.unit * 2,
        height: `calc(100vh - ${theme.footerHeight}px - 40px)`,
        overflow:'auto'
    },

    message: {
        overflowWrap: 'break-word',
    },

    contents: {
        paddingLeft: '10px',
        h1: true,
    },
    ...createFileNameClass(theme.palette.type),
}));

export default useStyles;