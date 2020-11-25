import React,{useState} from 'react';
import useStyle from './styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import {useFirebase} from '../../components/FirebaseProvider';
import {Redirect} from 'react-router-dom';
import AppLoading from '../../components/AppLoading/AppLoading';


function Login(){

    const classes = useStyle();

    const [form,setForm] = useState({
        email : "",
        password : ""
    });

    const [error,setError] = useState({
        email : "",
        password : ""
    })

    const [isSubmitting,setSubmitting] = useState(false);

    const validate = () => {

        const newError = {...error};

        if(form.email === ""){
            newError.email = "email harus diisi!";
        }else if(!isEmail(form.email)){
            newError.email = "email tidak valid!";
        }
        
        if(form.password === ""){
            newError.password = "Password harus diisi!"
        }
        
        return newError;
    }
    
    const {auth,user,loading} = useFirebase();

    const handleSubmit = e => {
        e.preventDefault();

        const findErrors = validate();

        if(Object.values(findErrors).some(err => err !== '')){
            setError(findErrors);
        }else{
            try{
                setSubmitting(true)
                auth.signInWithEmailAndPassword(form.email, form.password)
            }catch(e){
                const newError = {};
                switch (e.code){
                    case 'auth/user-not-found':
                        newError.email = "Alamat email tidak ditemukan!"
                    break;
                    case 'auth/invalid-email':
                        newError.email = "Alamat email tidak valid!"
                    break;
                    case 'auth/user-disabled':
                        newError.email = "Pengguna diblokir!"
                    break;
                    case 'auth/wrong-password':
                        newError.password = "Password salah!"
                    break;
                    default:
                        newError.email = "terjadi kesalahan coba lagi!"
                    break;
                }
                setError(newError);
                setSubmitting(false)
            }
        }

    }

    
    if(user){
        return <Redirect to="/"/>
    }
    if(loading){
        return <AppLoading/>
    }
    
    const handleChange = e => {
        
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
        setError({
            error : ""
        })

    }
    // console.log(error)
    console.log(form)


    return (
    <div>
        <Container maxWidth="xs">
            <Paper className={classes.paper}>
                <form onSubmit={handleSubmit} noValidate>
                <Typography variant="h5" component="h1" align="center" className={classes.title}>Halaman Login</Typography>
                <TextField 
                label="Masukan Email"
                name="email"
                id="email"
                type="email"
                // required
                fullWidth
                value={form.email}
                onChange={handleChange}
                helperText={error.email}
                error={error.email?true:false}
                disabled={isSubmitting?true:false}
                />
                <TextField
                label="Masukan Password"
                name="password"
                id="password"
                type="password"
                // required
                fullWidth
                value={form.password}
                onChange={handleChange}
                helperText={error.password}
                error={error.password?true:false}
                disabled={isSubmitting?true:false}
                />
                <Grid container className={classes.buttons}>
                    <Grid item xs>
                        <Button type="submit" variant="contained" color="primary" size="large" disabled={isSubmitting?true:false}>
                            Login
                        </Button>
                    </Grid>
                    <Grid>
                        <Button variant="contained" size="large" to="/registrasi" component={Link} disabled={isSubmitting?true:false}>
                            Daftar Akun Baru
                        </Button>
                    </Grid>
                </Grid>
                </form>
            </Paper>
            
        </Container>
    </div>
    )   
}

export default Login;