import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
    title: {
        '& h2': {
            color: theme.palette.text.primary
        }
    },

    dialogPaper: {
        backgroundColor: theme.palette.background.paper
    },

    content: {
        textAlign: 'center'
    },

    textField: {
        '& label': {
            color: theme.palette.text.disabled,
        },

        '& label.Mui-focused': {
            color: 'green',
        },
        '& label.MuiFormLabel-focused': {
            color: 'green',
        },

        '& .MuiInput-underline:after': {
            borderBottomColor: theme.palette.text.disabled,
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'red',
            },
            '&:hover fieldset': {
                borderColor: 'yellow',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'green',
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
            '&$focused': {
                backgroundColor: '#fff',
                borderColor: theme.palette.primary.main,
            },
            focused: {},
        },
    },
}));

export default useStyles;