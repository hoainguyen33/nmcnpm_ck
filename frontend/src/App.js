import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect } from 'react';

import Home from './pages/home';
import Account from './pages/account';
import MatchUser from './pages/User/Match/Match'

import './App.css'

export default function App() {
 
  useEffect(()=>{
     // script start and re-render component
      return ()=>{
          // script end component
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/account' component={Account} />
        <Route path='/match-user' component={MatchUser} />
        <Route path='/' component={Home} />
      </Switch>
    </BrowserRouter>
  );
}
