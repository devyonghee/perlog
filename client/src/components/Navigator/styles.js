const styles = theme => ({
    toolbar: theme.mixins.toolbar,
    drawer: {
        width : '300vh',
    },
    title: {
        width: '200px',
        display: 'flex',
        flexGrow: 1,
        minHeight: '56px',
        alignItems: 'flex-start',
        paddingLeft: '24px',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },

    list: {
        height: '100vh',
        backgroundColor: theme.palette.background.paper,
    }
});

export default styles;