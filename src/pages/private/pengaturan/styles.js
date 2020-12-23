import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    tabContent : {
        padding : theme.spacing(2)
    },
    formPengguna : {
        display: 'flex',
        flexDirection: 'column',
        padding: 'normal',
        width: theme.spacing(26)
    }
}))

export default useStyles;