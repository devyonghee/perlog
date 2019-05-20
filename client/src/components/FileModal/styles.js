const styles = theme => ({
    paper: {
        width: theme.spacing.unit * 30,
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 2,
        outline: 'none',
        top: '40%',
        left: '40%',
    },
    buttonsWrap:{
        textAlign: 'right'
    },
    button: {
        margin: 'dense',
    },
});

export default styles;