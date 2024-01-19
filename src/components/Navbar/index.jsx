import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = () => {

  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { sm: 'block' }, ml: 5 }}
            onClick={() => navigate('/')}
          >
            TOKOKU
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {
            location?.pathname?.slice(1) === 'cart' ?
              null
              :
              <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 5 }}>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="error">
                    <ShoppingCartIcon onClick={() => navigate('/cart')} />
                  </Badge>
                </IconButton>
              </Box>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar