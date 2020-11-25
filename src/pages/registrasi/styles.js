import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    title : {
        // color: theme.palette.primary.main,
        textAlign: 'center',
        marginBottom: theme.spacing(5)
    },
    paper : {
        marginTop: theme.spacing(8),
        padding: theme.spacing(3) 
    },
    buttons : {
        marginTop: theme.spacing(3)
    }

}))
export default useStyles;