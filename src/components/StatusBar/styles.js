import { makeStyles } from '@material-ui/styles';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    wrapper: {
        marginTop: '16px',
    },

    actionBtn: {
        float: 'left',
        marginLeft: '15px !important',
        '&:first-child': {
            marginLeft: '0 !important',
        }
    },

    stoppedBtn: {
        backgroundColor: grey[500],
        '&:hover': {
            backgroundColor: `${grey[500]} !important`,
        }
    },

    statusPaper: {
        flexBasis: `${theme.footerHeight}px`,
        backgroundColor: 'inherit',
        textAlign: 'end',
        overflowX: 'hidden',
        overflowY: '-webkit-paged-x',
        lineHeight: '28px'
    },

    status: {
        display: 'inline-block',
        marginLeft: '20px'
    },
}));

export default useStyles;