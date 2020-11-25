import React,{useState} from 'react';
import useStyles from './styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'; 
import {Link,Redirect} from 'react-router-dom';
// import isEmail validator
import isEmail from 'validator/lib/isEmail';
import {useFirebase} from '../../components/FirebaseProvider';
import AppLoading from '../../components/AppLoading/AppLoading';


function Registrasi(){
    
    const classes = useStyles();

    // // state form untuk set default form
    // const [form,setForm] = useState({
    //     email: '',
    //     password: '',
    //     ulang_password: ''
    // });

    // // state error untuk error validation
    // const [error,setError] = useState({
    //     email: "",
    //     password: "",
    //     ulang_password: ""
    // });

    // const validate = () => {

    //     const newError = {...error};
        
    //     if(!error.email){
    //         newError.email = "email wajib diisi!";
    //     }else if(!isEmail(form.email)){
    //         newError.email = "email tidak valid!";
    //     }

    //     if(!error.password){
    //         newError.password = "password wajib diisi!";
    //     }

    //     if(!error.ulang_password){
    //         newError.ulang_password = "ulang password wajib diisi!";
    //     }else if(form.ulang_password !== form.password){
    //         newError.ulang_password = "ulang password tidak sama dengan password";
    //     }

    //     return newError;
    // }

    // const handleChange = e => {
        
    //     setForm({
    //         ...form,
    //         [e.target.name] : e.target.value
    //     })

    //     // setError({
    //     //     error : ""
    //     // })

    // }
    // console.log(error)
    // const handleSubmit = e => {
    //     e.preventDefault();

    //     const findErrors = validate();

    //     if(Object.values(findErrors).some(err => err !== '')){
    //         setError(findErrors);
    //     }
    // }

    const {auth,user,loading} = useFirebase();

    const [form,setForm] = useState({
        email : "",
        password : "",
        ulang_password : ""
    });
    
    const [error,setError] = useState({
        email : "",
        password : "",
        ulang_password : ""
    })

    const [isSubmitting,setSubmitting] = useState(false);

    const validate = () => {
        const newError = {...error};
        if(form.email === ""){
            newError.email = "Alamat Email wajib diisi !"
        }else if(!isEmail(form.email)){
            newError.email = "Email tidak valid !"
        }

        if(form.password === ""){
            newError.password = "Password wajib diisi !"
        }
        
        if(form.ulang_password=== "" ){
            newError.ulang_password = "Ulang password wajib diisi !"
        }else if(form.ulang_password !== form.password){
            newError.ulang_password = "Ulang password tidak sama dengan password !"
        }

        return newError;
    }

    const handleChange = e => {
        // console.log('testing')
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
 
        setError({
            error : ""
        })

    }

    console.log(form)

    const handleSubmit = async e => {
        e.preventDefault();
        const findErrors = validate();
        // console.log();
        if(Object.values(findErrors).some(err => err !== "")){
            setError(findErrors)
        }else{
            try {
                setSubmitting(true);
                await 
                auth.createUserWithEmailAndPassword(form.email,form.password)
            } catch (e) {
                const newError = {};

                switch(e.code){
                    case 'auth/email-already-in-use':
                    newError.email = "Email sudah terdaftar";
                    break;
                    case 'auth/invalid-email':
                    newError.email = "Email tidak valid";
                    break;
                    case 'auth/weak-password':
                    newError.password = "Password lemah";
                    break;
                    case 'auth/operation-not-allowed':
                    newError.email = "metode email dan password tidak didukung";
                    break;
                    default:
                    newError.email = "";
                    break;
                }
                setError(newError);
                setSubmitting(false);
            }
        }

    }

    if(loading){
        return <AppLoading/>
    }
    
    if(user){
        return <Redirect to="/"/>
    }


    return (
    <div>
        <Container maxWidth="xs">
        <Paper className={classes.paper}>
            <Typography 
                variant="h5" 
                component="h1" 
                className={classes.title}>Buat Akun Baru
            </Typography>
            <form onSubmit={handleSubmit} noValidate>
                <TextField 
                    id="email"
                    name="email"
                    label="Alamat Email"
                    type="email"
                    margin="normal"
                    fullWidth
                    required
                    value={form.email}
                    onChange={handleChange}
                    helperText={error.email}
                    error={error.email?true:false}
                    disabled={isSubmitting}
                    />
                <TextField 
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    margin="normal"
                    fullWidth
                    required
                    value={form.password}
                    onChange={handleChange}
                    helperText={error.password}
                    error={error.password?true:false}
                    disabled={isSubmitting}
                    />
                <TextField 
                    id="ulang_password"
                    name="ulang_password"
                    label="Ulang Password"
                    type="password"
                    margin="normal"
                    fullWidth
                    required
                    value={form.ulang_password}
                    onChange={handleChange}
                    helperText={error.ulang_password}
                    error={error.ulang_password?true:false}
                    disabled={isSubmitting}
                    />
                <Grid container className={classes.buttons}>
                    <Grid item xs>
                        <Button 
                        color="primary" 
                        variant="contained" 
                        size="large" 
                        type="submit" 
                        disabled={isSubmitting}
                        >Registrasi</Button>
                    </Grid>
                    <Grid>
                        <Button 
                        variant="contained" 
                        className={classes.button} 
                        size="large" 
                        type="submit" 
                        component={Link} 
                        disabled={isSubmitting}
                        to="/login">Login</Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
        </Container>
    </div>
    ) 
}

export default Registrasi;