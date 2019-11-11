import { makeStyles } from '@material-ui/styles';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        flexGrow: 1,
        flexBasis: '0',
        overflow: 'auto',
    },

    message: {
        position: 'relative',
        overflowWrap: 'break-word',
        whiteSpace: 'pre-wrap',
        '&:hover > $contents': {
            backgroundColor: grey[100],
        },
        '&:hover > $copyBtn' : {
            display: 'inline-block !important',
        }
    },

    contents: {
        textAlign: 'initial',
        lineHeight: '1.5',
        fontSize: '13px !important',
        display:'block',
        position:'relative',
        wordBreak:'break-word',
    },

    copyBtn: {
        textTransform: 'none !important',
        display: 'none !important',
        fontSize: '12px !important',
        width: '50px',
        height: '23px',
        minWidth: 'unset !important',
        padding: '0 !important',
        position: 'absolute !important',
        bottom: '10px',
        right: '20px',
    }
}));

export default useStyles;