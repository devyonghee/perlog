import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
    root: {
        flexBasis: ({ width }) => `${width}px`,
        flexShrink: 0,
        overflowX: 'hidden'
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