import React from 'react';
import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavigationBar } from './components/NavigationBar';
import { User } from './pages/User';
import Login from './pages/Login';
import { Index } from './pages/Index';
import { NoMatch } from './NoMatch';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <React.Fragment>
      <Router>
        <NavigationBar />

        <Sidebar />

        <Switch>
          <Route exact path="/" component={Index} />
          <Route path="/user" component={User} />
          <Route path="/login" component={Login} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
