import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
    title: {
        '& h2': {
        }
    },

    dialogPaper: {
        width: '300px'
    },

    content: {
        textAlign: 'center'
    },

    textField: {
        '& label': {
            color: theme.palette.text.disabled,
        },

        '& label.Mui-focused': {
        },
        '& label.MuiFormLabel-focused': {
        },

        '& .MuiInput-underline:after': {
            borderBottomColor: theme.palette.text.disabled,
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
            },
            '&:hover fieldset': {
            },
            '&.Mui-focused fieldset': {
            },
        }
    },

    textFieldInput: {
        '&root': {
            border: '1px solid #e2e2e1',
            overflow: 'hidden',
            borderRadius: 4,
            backgroundColor: '#fcfcfb',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            '&:hover': {
                backgroundColor: '#fff',
            },
        },
    },
}));

export default useStyles;