import React from 'react';
// import react router dom
import {Switch,Route,Redirect} from 'react-router-dom';
// import pages
import Pengguna from './pengguna'
import Toko from './toko'

function Pengaturan(){
    return (
    <div>
        <Switch>
            <Route path="/pengaturan/pengguna" component={Pengguna}/>
            <Route path="/pengaturan/toko" component={Toko}/>
            <Redirect to="/pengaturan/pengguna"/>
        </Switch>
    </div>
    ) 
}

export default Pengaturan;