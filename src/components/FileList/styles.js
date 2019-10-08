import {makeStyles} from '@material-ui/styles'
import colors from 'src/modules/file/colors';

const createSwitchColorsClass = (themeType) =>
    colors.reduce((colorClasses, color, index) => ({
        ...colorClasses,
        [`colorSwitchBase${index}`]: {
            color: color[300],
            [`&$colorSwitchChecked${index}`]: {
                color: color[500],
                [`& + $colorSwitchBar${index}`]: {
                    backgroundColor: color[300],
                },
            }
        },
        [`colorSwitchChecked${index}`]: {},
        [`colorSwitchBar${index}`]: {},
    }), {});


const useStyles = makeStyles(theme => ({
    listItem: {
        overflowX: 'hidden',
        overflowY: '-webkit-paged-x',
        padding: '2px',
        "&:hover": {
            backgroundColor: "rgba(0,0,0, 0.08)",
        }
    },
    iconWrap: {
        alignItems: 'center',
        marginRight: '0'
    },

    arrowIcon: {
        cursor: 'pointer',
    },

    iconMargin:{
        marginRight: '0px'
    },

    arrowMargin: {
        marginLeft: '23px'
    },

    textList: {
        overflow: 'hidden',
        width: '100px',
        paddingLeft: '5px',
        userSelect: 'none'
    },
    emptyText : {
        height: '10px'
    },

    switchRoot: {
        padding: 0,
        margin: theme.spacing.unit,
    },

    ...createSwitchColorsClass(theme.palette.type),
}));

export default useStyles;