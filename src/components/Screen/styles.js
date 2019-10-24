import {makeStyles} from '@material-ui/styles'

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

    contents: {
        paddingLeft: '10px',
        h1: true,
    },
}));

export default useStyles;