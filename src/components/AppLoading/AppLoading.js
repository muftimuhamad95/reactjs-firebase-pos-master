import { Typography } from '@material-ui/core';
import React from 'react';
import Container from '@material-ui/core/Container';
import useStyles from './styles';
import LinearProgress from '@material-ui/core/LinearProgress';
// import useStyles from '../../pages/registrasi/styles';

function AppLoading() {

    const classes = useStyles();

    return <>
        <Container maxWidth="xs">
            <div className={classes.loadingBox}>
                <Typography
                    variant="h6"
                    component="h2"
                    className={classes.title}
                >
                    Aplikasi Penjualan
                </Typography>
                <LinearProgress/>
            </div>
        </Container>
    </>
}

export default AppLoading;
