import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
    drawerPaper: {
        width: theme.navigationWidth,
        height: '100vh',
        float: 'left',
        overflowX: 'hidden',
    },

    title: {
        display: 'flex',
        height: '56px',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },

    list: {
        height: 'calc(100vh - 64px)',
    }
}));

export default useStyles;