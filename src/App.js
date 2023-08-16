import React from 'react';
import logo from './logo.svg';
import './App.css';
import { styled } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavigationBar } from './components/NavigationBar';
import { User } from './pages/User';
import Login from './pages/Login';
import { Index } from './pages/Index';
import { NoMatch } from './NoMatch';
import Sidebar from './components/Sidebar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

function App() {
  return (
    <React.Fragment>
      <Router>
           <NavigationBar />
          <Switch>
            <Route path="/login" component={Login} />
            <div>
            <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
        <Card sx={{ minWidth: "100%" }}>
        <Sidebar />
        </Card>
        </Grid>
        <Grid item xs={9}>
        <Route exact path="/" component={Index} />
                  <Route path="/user" component={User} />
                  <Route component={NoMatch} />
        </Grid>
      </Grid>
    </Box>                 
          </div>
          </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
