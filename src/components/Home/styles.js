import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    wrapper: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
    },
    container: {
        display: 'flex',
        flexGrow: 1,
        minWidth: theme.spacing(50),
        padding: '0 !important',
        maxWidth: 'none !important',
    },

    divider: {
        position:'relative',
        width: '4px',
        height: '100% !important',
        cursor: 'w-resize',
        display:'block',
    },

    screenBox: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '16px',
    }
}));

export default useStyles;