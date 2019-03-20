import {
    PRIMARY_COLOR,
    INFO_COLOR,
    SUCCESS_COLOR,
    WARNING_COLOR,
    DANGER_COLOR,
    WHITE_COLOR,
    GRAY_COLOR,
} from "../../style_config/_colors";
import {CONTAINER, DEFAULT_FONT} from "../../style_config/_sizes";

const headerStyle = theme => ({
    appBar: {
        backgroundColor: "transparent",
        borderBottom: "0",
        marginBottom: "0",
        position: "fixed",
        width: "100%",
        paddingTop: "10px",
        zIndex: "0",
        color: GRAY_COLOR[7],
        border: "0",
        borderRadius: "3px",
        padding: "10px 0",
        transition: "all 150ms ease 0s",
        minHeight: "50px",
        display: "block"
    },
    searchWrapper: {
        [theme.breakpoints.down("sm")]: {
            width: "-webkit-fill-available",
            margin: "10px 15px 0"
        },
        display: "inline-block"
    },
    container: {
        ...CONTAINER,
        minHeight: "50px"
    },
    flex: {
        flex: 1
    },
    title: {
        ...DEFAULT_FONT,
        lineHeight: "30px",
        fontSize: "18px",
        borderRadius: "3px",
        textTransform: "none",
        color: "inherit",
        margin: "0",
        "&:hover,&:focus": {
            background: "transparent"
        }
    },
    appResponsive: {
        top: "8px"
    },
    primary: {
        backgroundColor: PRIMARY_COLOR[0],
        color: WHITE_COLOR,
    },
    info: {
        backgroundColor: INFO_COLOR[0],
        color: WHITE_COLOR,
    },
    success: {
        backgroundColor: SUCCESS_COLOR[0],
        color: WHITE_COLOR,
    },
    warning: {
        backgroundColor: WARNING_COLOR[0],
        color: WHITE_COLOR,
    },
    danger: {
        backgroundColor: DANGER_COLOR[0],
        color: WHITE_COLOR,
    }
});

export default headerStyle;
