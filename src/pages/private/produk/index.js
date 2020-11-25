import React from 'react';
import {Switch,Route} from 'react-router-dom';
// import page
import GridProduk from './grid';
import EditProduk from './edit';

function Produk(){
    return (
    <div>
       <Switch>
           <Route path="/produk/edit/:produkId" component={EditProduk}/>
           <Route component={GridProduk}/>
       </Switch>
    </div>
    ) 
}

export default Produk;