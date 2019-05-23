import {green,purple} from '@material-ui/core/colors'
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

    icon: {
        height: theme.spacing.unit * 2
    },

    arrowIcon: {
        cursor: 'pointer',
    },

    fileIcon: {
        marginLeft: '23px'
    },

    colorSwitchBase: {
        color: green[500],
        '&$colorSwitchChecked': {
            color: purple[500],
            '& + $colorSwitchBar': {
                backgroundColor: purple[500],
            },
        }
    },

    colorSwitchChecked: {},
    colorSwitchBar:{},

    textList: {
        paddingLeft: '10px',
        userSelect: 'none'
    }

});

export default styles;