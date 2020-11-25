import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    paper : {
        marginTop: theme.spacing(8),
        padding: theme.spacing(3)
    },
    buttons : {
        marginTop: theme.spacing(5),
        
    },
    title : {
        margin: theme.spacing(3)
    }
}))

export default useStyles;