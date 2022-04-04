import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom/cjs/react-router-dom.min';

import Home from './pages/home';
import Account from './pages/account';
import TeamPage from './pages/Admin/TeamPage/TeamPage'
import Match from './pages/Admin/Match/Match'
import MatchUser from './pages/User/Match/Match'
import DetailTeam from './pages/Admin/DetailTeam/DetailTeam'

export default function App() {

  return (
    <BrowserRouter>
      <Route path='/' exact>
        <Redirect to="/home" />
      </Route>
      <Route path='/home' component={Home} />
      <Route path='/team' component={TeamPage} />
      <Route path='/account' component={Account} />
      <Route path='/match' component={Match} />
      <Route path='/match-user' component={MatchUser} />
      <Route path='/detail-teams' component={DetailTeam} />
    </BrowserRouter>
  );
}
