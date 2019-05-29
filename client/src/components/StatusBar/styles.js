import {makeStyles} from '@material-ui/styles'


const useStyles = makeStyles(theme => ({
    statusPaper: {
        margin: theme.spacing.unit * 2,
        height: `${theme.footerHeight}px`,
        backgroundColor: 'inherit'
    },

    status: {
        float: 'right',
        display: 'inline-block',
        margin: '20px'
    },
}));

export default useStyles;