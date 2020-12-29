import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    tabContent : {
        padding : theme.spacing(2)
    },
    fieldPengguna : {
        display: 'flex',
        flexDirection: 'column',
        width: theme.spacing(26)
    }
}))

export default useStyles;