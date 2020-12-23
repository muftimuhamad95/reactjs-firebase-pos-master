import React, { useRef,useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { useFirebase } from '../../../components/FirebaseProvider';
import isEmail from 'validator/lib/isEmail';
import useStyles from './styles';


function Pengguna(){


  const displayNameRef = useRef();
  const emailRef = useRef();
  const { user } = useFirebase();
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
      alert('nama berhasil dirubah');
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
      .then(function() {
        // Update successful.
        alert('email updated!')
      })
      .catch(function(error) {
        alert(error)
      });
      setSubmitting(false)
    }
  }

    return (
    <div className={classes.fieldPengguna}>
         <TextField
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
        // InputProps={{
        //   startAdornment: (
        //     <InputAdornment position="start">
        //       <AccountCircle />
        //     </InputAdornment>
        //   ),
        // }}
      />
         <TextField
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
        // InputProps={{
        //   startAdornment: (
        //     <InputAdornment position="start">
        //       <AccountCircle />
        //     </InputAdornment>
        //   ),
        // }}
      />
    </div>
    ) 
}

export default Pengguna;