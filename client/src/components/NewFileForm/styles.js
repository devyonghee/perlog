const styles = theme => ({
    wrapPaper: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 2,
        outline: 'none',
        left: '50%',
        top: '50%',
        transform: 'translateX(-50%) translateY(-50%)',
        alignItems : 'center',
        verticalAlign : 'middle',
    },

    directoryWrap : {
        width: theme.spacing.unit * 30,
        height: theme.spacing.unit * 19,
    },

    fileWrap : {
        width: theme.spacing.unit * 50,
        height: theme.spacing.unit * 80,
    },

    buttonsWrap:{
        textAlign: 'right',
    },

    folderList: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 3,
        height: theme.spacing.unit * 60,
        overflow: 'auto',
    }
});

export default styles;