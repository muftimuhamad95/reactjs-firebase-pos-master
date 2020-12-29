import React, { useRef,useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { useFirebase } from '../../../components/FirebaseProvider';
import isEmail from 'validator/lib/isEmail';
import useStyles from './styles';
import { useSnackbar } from 'notistack';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


function Pengguna(){


  const displayNameRef = useRef();
  const emailRef = useRef();
  const { user } = useFirebase();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles()


  //create states
  const [isSubmitting,setSubmitting] = useState(false);
  const [error,setError] = useState({
    displayName : ''
  });
  
    const saveDisplayName = async (e) => {
    const displayName = displayNameRef.current.value;
    console.log(displayName);
    
    if(!displayName){
      setError({
        displayName: 'Nama wajib diisi!'
      });
    }else if(displayName !== user.displayName){
      setError({
        displayName: ''
      });
      setSubmitting(true);
      await user.updateProfile({
        displayName
      });
      setSubmitting(false);
      // alert('nama berhasil dirubah');
      enqueueSnackbar('nama berhasil dirubah',{
        variant: 'success'
      })
    }
  }
  
  const saveUpdateEmail = async (e) => {
    const displayEmailRef = emailRef.current.value;
    console.log(user)
    if(!displayEmailRef){
      setError({
        email: "email harus diisi"
      })
    }else if(!isEmail(displayEmailRef)){
      setError({
        email: "Format email salah"
      })
      alert()
    }else if(displayEmailRef !== user.email){
      setError({
        email: "" 
      })
      setSubmitting(true)
      await user.updateEmail(displayEmailRef)
      .then(() => {
        // alert('email updated!')
        enqueueSnackbar('email berhasil dirubah, segera verifikasi email !',{
          variant: 'success'
        })
      })
      .catch( error => {
        alert(error)
      });
      setSubmitting(false)
    }
  }

  const emailVerification = async (e) => {
    const actionCodeSettings = {
      url: `${window.location.origin}/login`
    };
    // console.log(actionCodeSettings)
    // setSubmitting(true);
    // await user.sendEmailVerification(actionCodeSettings)
    // .then(() => {
    //     enqueueSnackbar(`Verifikasi email telah dikirim ke ${user.email}`,{
    //         variant:"success"
    //       })
    // })
    // .catch( e => {
      //     enqueueSnackbar(`Pesan ${e}`,{
        //         variant:"error"
        //       })
        // })
    setSubmitting(true);
    try{
      await user.sendEmailVerification(actionCodeSettings)
      .then(() => {
        enqueueSnackbar(`Verifikasi email telah dikirim ke ${user.email}`,{
          variant:"success"
        })
      })
    }
    catch(e) {
      enqueueSnackbar(`Pesan ${e}`,{
        variant:"error"
      })
    }
    setSubmitting(false);
  }


    return (
      <div className={classes.fieldPengguna}>
         <TextField
         margin="normal"
         id="displayName"
         name="displayName"
         label="Nama"
         defaultValue={user.displayName}
        inputProps={{
          ref: displayNameRef,
          onBlur: saveDisplayName
        }}
        disabled={isSubmitting}
        helperText={error.displayName}
        error={error.displayName?true:false}
      />
         <TextField
        margin="normal"
        id="email"
        name="email"
        label="email"
        defaultValue={user.email}
        inputProps={{
          ref: emailRef,
          onBlur: saveUpdateEmail
        }}
        disabled={isSubmitting}
        helperText={error.email}
        error={error.email?true:false}
      />
      {
        user.emailVerified?
        <Typography 
          margin="normal"
          color="primary"
          variant="caption">
          Email sudah diverifikasi
        </Typography>
        :
        <Button 
          margin="normal"
          variant="outlined"
          color="default"
          size="small"
          onClick={emailVerification}
          disabled={isSubmitting?true:false}>
            Kirim Verifikasi Email
        </Button>
      }
      {
        user.providerData.forEach(profile=>{
          console.log(profile)
        })
      }

    </div>
    ) 
}

export default Pengguna;