import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from './components/NotFound';
import Header from './containers/Header';
import AllBoards from './containers/AllBoards';
import ActiveBoard from './containers/ActiveBoard';
import Login from './containers/Login';
import './app.scss';

class App extends Component {
  render() {
    return (
      <div className='app'>
        <Header/>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/boards" component={AllBoards}/>
          <Route exact path="/boards/:id" component={ActiveBoard}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
    );
  }
}

export default App;
