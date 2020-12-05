import React from 'react';
// import react route dom
import {Route,Redirect} from 'react-router-dom';
// import useFirebase()
import {useFirebase} from './FirebaseProvider';

function PrivateRoute({component: Component , ...restProps}) {
   
    // const user = null;
    const {user} = useFirebase();
    return <Route
        {...restProps}

        render={props => {
            return user ?
            <Component {...props}/>
            :
            <Redirect to={{
                pathname:'/login',
                state:{
                    from:props.location
                }
            }}/>
            // <Redirect to="/login"/>
        }}
    />
}

export default PrivateRoute;