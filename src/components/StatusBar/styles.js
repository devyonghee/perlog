import {makeStyles} from '@material-ui/styles'


const useStyles = makeStyles(theme => ({
    statusPaper: {
        marginTop: '16px',
        flexBasis: `${theme.footerHeight}px`,
        backgroundColor: 'inherit',
        textAlign: 'end',
        overflowX: 'hidden',
        overflowY: '-webkit-paged-x',
    },

    status: {
        display: 'inline-block',
        marginLeft: '20px'
    },
}));

export default useStyles;