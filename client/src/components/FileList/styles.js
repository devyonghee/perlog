const styles = theme => ({
    listItem: {
        padding: '2px',
        "&:hover": {
            backgroundColor: "rgba(0,0,0, 0.08)",
        }
    },
    iconWrap: {
        alignItems: 'center',
        marginRight: '0'
    },

    filesIcon: {
        height: theme.spacing.unit * 2
    },

    fileIcon: {
        marginLeft: '23px'
    },

    textList: {
        paddingLeft: '10px',
        userSelect: 'none'
    }

});

export default styles;