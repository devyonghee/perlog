import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    wrapper: {
        marginTop: '16px',
    },

    clearBtn: {
        float: 'left',
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