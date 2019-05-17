const styles = theme => ({
    toolbar: theme.mixins.toolbar,
    title: {
        'display': 'flex',
        'flex-grow': 1,
        'min-height': '56px',
        'align-items': 'flex-start',
        'padding-left': '24px',
        'flex-direction': 'column',
        'justify-content': 'center',
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