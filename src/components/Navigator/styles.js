import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
    root: {
        flexBasis: theme.spacing(30),
        flexShrink: 0,
        overflowX: 'hidden'
    },

    divider:{
        position: 'absolute',
        top: 0,
        height: '100%',
        width: '2px',
        left: theme.spacing(30),
        cursor: 'w-resize',
        zIndex: '1',
    },

    title: {
        display: 'flex',
        height: '56px',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },

    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },

    arrowIcon: {
        cursor: 'pointer',
    },

    dense: {
        marginTop: 19,
    },
}));

export default useStyles;