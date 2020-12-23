import React from 'react';
// import react router dom
import {Switch,Route,Redirect} from 'react-router-dom';
// import pages
import Pengguna from './pengguna'
import Toko from './toko'

// import MUI
import useStyles from './styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function Pengaturan(props){

    const {location,history} = props;

    const handleChange = (event, val) => {
        history.push(val)
    };
    // console.log(props)

    const classes = useStyles();

    return (
    <div>
        
        <Paper square>
            <Tabs
            value={location.pathname}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="disabled tabs example"
            >
                <Tab label="Pengguna" value="/pengaturan/pengguna"/>
                <Tab label="Toko" value="/pengaturan/toko"/>
            </Tabs>
            <div className={classes.tabContent}>
                <Switch>
                    <Route path="/pengaturan/pengguna" component={Pengguna}/>
                    <Route path="/pengaturan/toko" component={Toko}/>
                    <Redirect to="/pengaturan/pengguna"/>
                </Switch>
            </div>
        </Paper>
    </div>
    ) 
}

export default Pengaturan;