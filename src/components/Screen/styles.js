import {makeStyles} from '@material-ui/styles'
import colors from 'src/modules/file/colors';

const createFileNameClass = (themeType) =>
    colors.reduce((colorClasses, color, index) => ({
        ...colorClasses,
        [`fileName${index}`]: {
            fontWeight: 'bold',
            color: color[500],
        }
    }), {});

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        flexGrow: 1,
        overflow: 'auto',
        '&:hover $search': {
            display: 'block',
        },
    },

    message: {
        overflowWrap: 'break-word',
        whiteSpace: 'pre-wrap',
    },

    contents: {
        paddingLeft: '10px',
        h1: true,
    },

    ...createFileNameClass(theme.palette.type),
}));

export default useStyles;