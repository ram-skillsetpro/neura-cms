import React from 'react';
import Sidebar from '../Sidebar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const WithSidebarLayout = ({ children }) => {
  return (

    <Grid sx={{ flexGrow: 1 }} container className='body-bx'>
      <Grid item xs className='sidebar-bx'>
      <Sidebar />
      </Grid>
      <Grid item xs className='body-container'>
      <Container fixed>
      {children}
      </Container>
      </Grid>
      <Grid item xs={12}>
       
      </Grid>
    </Grid>
  );
};

export default WithSidebarLayout;
