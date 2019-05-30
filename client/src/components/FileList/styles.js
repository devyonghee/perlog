import {makeStyles} from '@material-ui/styles'
import colors from '../colors';

const createSwitchColorsClass = (themeType) =>
    colors.reduce((colorClasses, [lightColor, darkColor], index) => ({
        ...colorClasses,
        [`colorSwitchBase${index}`]: {
            color: themeType === 'light' ? lightColor[300] : darkColor[300],
            [`&$colorSwitchChecked${index}`]: {
                color: themeType === 'light' ? lightColor[500] : darkColor[500],
                [`& + $colorSwitchBar${index}`]: {
                    backgroundColor: themeType === 'light' ? lightColor[300] : darkColor[300],
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