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
        [`colorSwitchChecked${index}`]: {                color: themeType === 'light' ? lightColor[500] : darkColor[500],},
        [`colorSwitchBar${index}`]: {                backgroundColor: themeType === 'light' ? lightColor[500] : darkColor[500],},
    }), {});


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

    textList: {
        paddingLeft: '10px',
        userSelect: 'none'
    },

    ...createSwitchColorsClass(theme.type),

}));

export default useStyles;