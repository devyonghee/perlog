import { makeStyles } from '@material-ui/styles';
import { grey } from '@material-ui/core/colors';

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

    contentsRoot: {
        display: 'block',
        textAlign: 'justify',
        width: '100%',
        textTransform :'none !important',
        justifyContent: 'normal !important',
    },

    contentsLabel:{
        lineHeight: '1.1',
        display: 'block'
    }

}));

export default useStyles;