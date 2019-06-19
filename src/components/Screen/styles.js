import {makeStyles} from '@material-ui/styles'
import colors from '../colors';

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
        padding: theme.spacing.unit * 2,
        height: `calc(100vh - ${theme.footerHeight}px - 48px)`,
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

    search: {
        display: 'none',
        position: 'absolute',
        right: '4%',
        borderRadius: theme.shape.borderRadius,
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: 'rgba(0, 0, 0, 0.23)',
        backgroundColor: theme.palette.common.white,
        opacity: 0.3,
        '&:hover, &:focus-within': {
            backgroundColor: theme.palette.common.white,
            opacity: 1,
        },

        marginLeft: 0,
    },

    searchIcon: {
        width: theme.spacing.unit * 4,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    inputRoot: {
        color: 'inherit',
        paddingLeft: theme.spacing.unit * 5,
        cursor: 'default',
    },

    inputInput: {
        padding: theme.spacing.unit,
        textOverflow: 'ellipsis',
        transition: theme.transitions.create('width'),
        width: 80,
        '&:focus': {
            width: 200,
        },
    },

    ...createFileNameClass(theme.palette.type),
}));

export default useStyles;