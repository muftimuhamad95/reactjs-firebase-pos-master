import React from 'react';
//import react router dom
import {BrowserRouter as Router,
  Switch,
  Route} from 'react-router-dom';
// import pages
import Registrasi from './pages/registrasi';
import Login from './pages/login';
import LupaPassword from './pages/lupa-password';
import NotFound from './pages/404';
import Private from './pages/private';
import PrivateRoute from './components/PrivateRoutes';
// firebaseProvider
import FirebaseProvider from './components/FirebaseProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import theme from './config/theme';
import { SnackbarProvider } from 'notistack';



function App() {
  return (
    <>
    <CssBaseline/>
    <ThemeProvider theme={theme}>
    <FirebaseProvider>
    <SnackbarProvider maxSnack={3}>
      <Router>
        <Switch>
        {/* private routing */}
          <PrivateRoute path='/' exact component={Private}/>
          <PrivateRoute path='/pengaturan' component={Private}/>
          <PrivateRoute path='/produk' component={Private}/>
          <PrivateRoute path='/transaksi' component={Private}/>
        {/* public routing */}
          <Route path='/login' component={Login}/>
          <Route path='/registrasi' component={Registrasi}/>
          <Route path='/lupa-password' component={LupaPassword}/>
          <Route component={NotFound}/>
        </Switch>
      </Router>
      </SnackbarProvider>
      </FirebaseProvider>
    </ThemeProvider>
    </>
  )
}

export default App;
