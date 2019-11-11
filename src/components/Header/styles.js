import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    root :{
        flexBasis: '48px',
        borderBottom: '1px solid #CACACA',
    },

    plusIcon : {
        marginRight: '5px'
    },

    search: {
        position: 'absolute',
        right: '50px',
        borderRadius: theme.shape.borderRadius * 5,
        borderStyle: 'solid',
        borderColor: theme.palette.common.black,
        color: theme.palette.common.black,
        borderWidth: '1px',
        opacity: 0.6,
        marginLeft: 0,

        '&:hover, &:focus-within': {
            backgroundColor: theme.palette.common.white,
            opacity: 1,
        },
    },

    searchIcon: {
        height: '100% !important',
        position: 'absolute',
        marginLeft: '8px',
    },

    inputRoot: {
        paddingLeft: theme.spacing(5),
    },

    inputInput: {
        padding: theme.spacing(1),
        textOverflow: 'ellipsis',
        transition: theme.transitions.create('width'),
        width: `${theme.spacing(15)}px !important`,
        '&:focus': {
            width: `${theme.spacing(25)}px !important`,
        },
    },
}));

export default useStyles;