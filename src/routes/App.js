import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login';
import Register from '../components/Register'
import Publishes from '../components/Publishes';
import NotFound from '../components/NotFound';
import '../assets/styles/App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/publishes' component={Publishes} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
