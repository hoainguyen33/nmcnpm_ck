import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom/cjs/react-router-dom.min';

import Home from './pages/home';
import Account from './pages/account';

export default function App() {

  return (
    <BrowserRouter>
      <Route path='/' exact>
        <Redirect to="/home" />
      </Route>
      <Route path='/home' component={Home} />
      <Route path='/account' component={Account} />
    </BrowserRouter>
  );
}
