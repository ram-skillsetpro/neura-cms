import React from 'react';
import Sidebar from '../Sidebar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const WithSidebarLayout = ({ children }) => {
  return (

    <Grid sx={{ flexGrow: 1 }} container>
      <Grid item xs={3}>
      <Sidebar />
      </Grid>
      <Grid item xs={9}>
      <Container fixed className='body-container'>
      {children}
      </Container>
      </Grid>
      <Grid item xs={12}>
       
      </Grid>
    </Grid>
  );
};

export default WithSidebarLayout;
