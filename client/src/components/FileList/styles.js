import {green, purple} from '@material-ui/core/colors'
import {makeStyles} from '@material-ui/styles'


const useStyles = makeStyles(theme => ({
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
        color: ({color})=>color[theme.type][50],
        '&$colorSwitchChecked': {
            color: ({color})=>color[theme.type][300],
            '& + $colorSwitchBar': {
                backgroundColor: ({color})=>color[theme.type][500],
            },
        }
    },

    colorSwitchChecked: {color: ({color})=>color[theme.type][300]},
    colorSwitchBar: {backgroundColor: ({color})=>color[theme.type][500]},

    textList: {
        paddingLeft: '10px',
        userSelect: 'none'
    }

}));

export default useStyles;