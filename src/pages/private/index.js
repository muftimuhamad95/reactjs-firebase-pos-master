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
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SettingsIcon from '@material-ui/icons/Settings';
// import ViewListIcon from '@material-ui/icons/ViewList';
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
            <Switch>
              <Route path="/" exact children="Dashboard"/>
              <Route path="/produk" children="Produk"/>
              <Route path="/transaksi" children="Transaksi"/>
              <Route path="/pengaturan" children="Pengaturan"/>
            </Switch>
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
        <h1>Aplikasi Toko</h1>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <Route path="/" exact children={({match,history}) => {
            return  <ListItem 
                      button 
                      selected={match ? true : false}
                      onClick={() => {
                        history.push('/')
                      }}>
                      <ListItemIcon>
                        <HomeIcon/>
                      </ListItemIcon>
                      <ListItemText primary="Home"/>
                    </ListItem>
          }} />
          <Route path="/produk" children={({match,history}) => {
            return  <ListItem 
                      button 
                      selected={match ? true : false}
                      onClick={() => {
                        history.push('/produk')
                      }}>
                      <ListItemIcon>
                        <StoreIcon/>
                      </ListItemIcon>
                      <ListItemText primary="Produk"/>
                    </ListItem>
          }} />
          <Route path="/transaksi" children={({match,history}) => {
            return  <ListItem 
                      button 
                      selected={match ? true : false}
                      onClick={() => {
                        history.push('/transaksi')
                      }}>
                      <ListItemIcon>
                        <ShoppingCartIcon/>
                      </ListItemIcon>
                      <ListItemText primary="Transaksi"/>
                    </ListItem>
          }} />
          <Route path="/pengaturan" children={({match,history}) => {
            return  <ListItem 
                      button 
                      selected={match ? true : false}
                      onClick={() => {
                        history.push('/pengaturan')
                      }}>
                      <ListItemIcon>
                        <SettingsIcon/>
                      </ListItemIcon>
                      <ListItemText primary="Pengaturan"/>
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




