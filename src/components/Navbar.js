import React from 'react';
import { AppBar, Toolbar, Box, Typography } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#000', height: '150px' }}>
      <Toolbar sx={{ height: '100%' }}>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', height: '100%' }}>
          <Box
            component="img"
            src={`${process.env.PUBLIC_URL}/top-right.jpeg`}
            alt="Left"
            sx={{ maxHeight: '100%', width: 'auto', mr: 2 }}
          />
          <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
            <Typography variant="h3" sx={{ color: '#fff', textDecoration: 'underline' }}>
              UN PEACE KEEPERS
            </Typography>
          </Box>
          <Box
            component="img"
            src={`${process.env.PUBLIC_URL}/top-left.jpeg`}
            alt="Right"
            sx={{ maxHeight: '100%', width: 'auto', ml: 2 }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
