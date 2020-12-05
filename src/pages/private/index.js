import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
// import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HomeIcon from '@material-ui/icons/Home';
import StoreIcon from '@material-ui/icons/Store';
import ViewListIcon from '@material-ui/icons/ViewList';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// import react router dom
import {Switch,Route} from 'react-router-dom';
// import pages
import Produk from './produk';
import Transaksi from './transaksi';
import Pengaturan from './pengaturan';
import Home from './home';
//import usestyles Mui 
import useStyles from './styles';
// impport firebase hook
import {useFirebase} from '../../components/FirebaseProvider';

// const drawerWidth = 240;

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const {auth} = useFirebase()

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSignOut = () => {
    if(window.confirm("Apakah anda yakin ingin keluar?")){
      auth.signOut();
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {/* <Switch>
              <Route path="/" children={match}/>
              <Route path="/produk" children={match}/>
              <Route path="/transaksi" children={match}/>
            </Switch> */}
          </Typography>
          <IconButton 
            color="inherit" 
            onClick={handleSignOut}>
            <ExitToAppIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <Route path="/" children={({match}) => {
            return  <ListItem 
                      button 
                      selected={match ? true : false}>
                      <ListItemIcon>
                        <HomeIcon/>
                      </ListItemIcon>
                      <ListItemText primary="Home"/>
                    </ListItem>
          }} />
          <Route path="/produk" children={({match}) => {
            return  <ListItem 
                      button 
                      selected={match ? true : false}>
                      <ListItemIcon>
                        <StoreIcon/>
                      </ListItemIcon>
                      <ListItemText primary="Produk"/>
                    </ListItem>
          }} />
          <Route path="/transaksi" children={({match}) => {
            return  <ListItem 
                      button 
                      selected={match ? true : false}>
                      <ListItemIcon>
                        <ViewListIcon/>
                      </ListItemIcon>
                      <ListItemText primary="Transaksi"/>
                    </ListItem>
          }} />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Switch>
                <Route path="/produk" component={Produk}/>
                <Route path="/transaksi" component={Transaksi}/>
                <Route path="/pengaturan" component={Pengaturan}/>
                <Route component={Home}/>
            </Switch>
          </Grid>
        </Container>
      </main>
    </div>
  );
}





// import React from 'react';
// import clsx from 'clsx';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Drawer from '@material-ui/core/Drawer';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
// import IconButton from '@material-ui/core/IconButton';
// import Container from '@material-ui/core/Container';
// // import Grid from '@material-ui/core/Grid';
// // import Paper from '@material-ui/core/Paper';
// // import Link from '@material-ui/core/Link';
// import MenuIcon from '@material-ui/icons/Menu';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import HomeIcon from '@material-ui/icons/Home';
// import StoreIcon from '@material-ui/icons/Store';
// import ViewListIcon from '@material-ui/icons/ViewList';
// // import { mainListItems, secondaryListItems } from './listItems';

// // import react router dom
// import {Switch,Route} from 'react-router-dom';

// // import pages
// import Produk from './produk';
// import Transaksi from './transaksi';
// import Pengaturan from './pengaturan';
// import Home from './home';

// import useStyles from './styles';

// // import firebase hook
// import {useFirebase} from '../../components/FirebaseProvider';

// // function Copyright() {
// //   return (
// //     <Typography variant="body2" color="textSecondary" align="center">
// //       {'Copyright © '}
// //       <Link color="inherit" href="https://material-ui.com/">
// //         Your Website
// //       </Link>{' '}
// //       {new Date().getFullYear()}
// //       {'.'}
// //     </Typography>
// //   );
// // }


// export default function Private() {
//   const classes = useStyles();
//   const [open, setOpen] = React.useState(true);
//   const {auth} = useFirebase();
//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };
//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   const handleSignOut = () => {
//       if(window.confirm("Apakah anda yakin ingin keluar?")){
//         auth.signOut()
//       }
//   }

//   return (
//     <div className={classes.root}>
//       <CssBaseline />
//       <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
//         <Toolbar className={classes.toolbar}>
//           <IconButton
//             edge="start"
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
//             Dashboard
//           </Typography>
//           <IconButton 
//             onClick={handleSignOut}
//             color="inherit">
//             <ExitToAppIcon/>
//           </IconButton>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         variant="permanent"
//         classes={{
//           paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
//         }}
//         open={open}
//       >
//         <div className={classes.toolbarIcon}>
//           <IconButton onClick={handleDrawerClose}>
//             <ChevronLeftIcon />
//           </IconButton>
//         </div>
//         <Divider />
//         <List>
//             <Route path="/" exact children={(
//                 {match}) => {
//                     return  <ListItem 
//                             button
//                             selected={match ? true : false}>
//                                 <ListItemIcon>
//                                     <HomeIcon/>
//                                 </ListItemIcon>
//                                 <ListItemText primary="Home"/>
//                             </ListItem>
//                 }}/>
//             <Route path="/produk" children={(
//                 {match}) => {
//                     return  <ListItem 
//                             button
//                             selected={match ? true : false}>
//                                 <ListItemIcon>
//                                     <StoreIcon/>
//                                 </ListItemIcon>
//                                 <ListItemText primary="Produk"/>
//                             </ListItem>
//                 }}/>
//             <Route path="/transaksi" children={(
//                 {match}) => {
//                     return  <ListItem 
//                             button
//                             selected={match ? true : false}>
//                                 <ListItemIcon>
//                                     <ViewListIcon/>
//                                 </ListItemIcon>
//                                 <ListItemText primary="Transaksi"/>
//                             </ListItem>
//                 }}/>
//         </List>
//       </Drawer>
//       <main className={classes.content}>
//         <div className={classes.appBarSpacer} />
//         <Container maxWidth="lg" className={classes.container}>
//             <Switch>
//              <Route component={Home}/>
//              <Route path="/produk" component={Produk}/>
//              <Route path="/transaksi" component={Transaksi}/>
//              <Route path="/pengaturan" component={Pengaturan}/>
//             </Switch>
//         </Container>
//       </main>
//     </div>
//   );
// }






// import React from 'react';
// // import react router dom
// import {Switch,Route} from 'react-router-dom';
// // import pages
// import Produk from './produk';
// import Transaksi from './transaksi';
// import Pengaturan from './pengaturan';
// import Home from './home';

// function Private(){
//     return (
//     <div>
//         <Switch>
//             <Route component={Home}/>
//             <Route path="/produk" component={Produk}/>
//             <Route path="/transaksi" component={Transaksi}/>
//             <Route path="/pengaturan" component={Pengaturan}/>
//         </Switch>
//     </div>
//     ) 
// }

// export default Private;