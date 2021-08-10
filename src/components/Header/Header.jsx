import React from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Typography, Box, Toolbar, InputBase } from '@material-ui/core';

const Header = () => {
	return <AppBar position="static">
    <Toolbar className={classes.toolbar}>
      <Typography variant="h5" className={classes.title}>Travel Guide</Typography>
      <Box display="flex"></Box>
    </Toolbar>
  </AppBar>;
};

export default Header;
