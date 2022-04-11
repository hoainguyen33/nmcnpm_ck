import React from 'react';
import { BrowserRouter, Switch, Link } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import {
  Row,
  Container,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import Home from './layouts/home/home';
import Account from './pages/account';
import TeamPage from './pages/Admin/TeamPage/TeamPage'
import Match from './pages/Admin/Match/Match'
import MatchUser from './pages/User/Match/Match'
import Players from './pages/Admin/Players/Players'
import DetailTeam from './pages/Admin/DetailTeam/DetailTeam'
import DetailChampion from './pages/Admin/DetailChampion/DetailChampion'
import NavbarHome from './components/home/NavHome.component' 
import DashboardHome from './components/home/Dashboard.component';
import { Search } from './route/route';
import './App.css'

export default function App() {
  const info = useSelector(state=>state.account.info)
  const paths = Search(window.location.pathname.split("/").slice(1))
  useEffect(()=>{
      (info && info.token) || window.history.push("/account/sign-in")
      return ()=>{
          // script end component
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info])
  return (
    <BrowserRouter>
      <Switch>
        <div fluid className="home-page">
          <DashboardHome path={paths[0] && paths[1] && paths[1].path} />
          <Container fluid>
            <Row>
              <NavbarHome />
            </Row>
            {/* <Row>
              <div className="home-route">
                { paths.map((e, i)=><span><Link to={e.path}>{e.title}</Link>{i + 1 !== paths.length && " > "}</span>) }
              </div>
            </Row> */}
            <Row className="home-content">
              <Route path='/team' component={TeamPage} />
              <Route path='/' exact>
                <Redirect to="/home" />
              </Route>
              <Route path='/home' component={Home} />
              <Route path='/detail-teams' component={DetailTeam} />
              <Route path='/detail-champion' component={DetailChampion}/>
              <Route path='/match' component={Match} />
              <Route path='/players' component={Players}/>
            </Row>
          </Container>
        </div>
        {/* <Route path='/team' component={TeamPage} /> */}
        <Route path='/account' component={Account} />
        <Route path='/match-user' component={MatchUser} />
      </Switch>
    </BrowserRouter>
  );
}
