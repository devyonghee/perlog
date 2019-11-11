import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
    wrapPaper: {
        height: '80vh',
    },
    title: {
        userSelect: 'none'
    },

    directoryWrap: {
        width: theme.spacing(30),
        height: theme.spacing(19),
    },

    fileWrap: {
        width: theme.spacing(50),
        height: theme.spacing(80),
    },

    buttonsWrap: {
        textAlign: 'right',
    },

    wrapNewFileForm: {
        height: '100%',
    },

    folderList: {
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: 'rgba(0, 0, 0, 0.23)',
        borderRadius: theme.shape.borderRadius,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(3),
        height: 'calc(100% - 80px)',
        overflow: 'auto',
    }
}));

export default useStyles;