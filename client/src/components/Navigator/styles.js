import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
    drawerPaper: {
        width: theme.navigationWidth,
        float: 'left',
        overflowX: 'hidden',
    },

    title: {
        display: 'flex',
        minHeight: '56px',
        alignItems: 'flex-start',
        paddingLeft: '24px',
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
        height: '100vh',
        backgroundColor: theme.palette.background.paper,
    }
}));

export default useStyles;