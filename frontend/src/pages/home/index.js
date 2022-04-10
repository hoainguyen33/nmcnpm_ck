import './index.css'
import { useEffect } from 'react';
import { Route } from 'react-router-dom'
import { useSelector } from 'react-redux';
import {
  Row,
  Container,
} from 'react-bootstrap'
import Information from '../../layouts/account/Information.layout'
// import ListTeam from '../../layouts/team/List.layout'
import NavbarHome from '../../components/home/NavHome.component' 
import DashboardHome from '../../components/home/Dashboard.component';
import { Search } from '../../route/route';
// import ListChampion from '../../layouts/champion/List.component';
import HomeLayout from '../../layouts/home/home'
import TeamPage from '../Admin/TeamPage/TeamPage'
import Match from '../Admin/Match/Match'
import DetailTeam from '../Admin/DetailTeam/DetailTeam'
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import HomeRoute from '../../components/home/HomeRoute.component';

export default function Home(props) {
  const info = useSelector(state=>state.account.info)
  const paths = Search(props.location.pathname.split("/"))
  useEffect(()=>{
      (info && info.token) || props.history.push("/account/sign-in")
      return ()=>{
          // script end component
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info])
  return (
    <div fluid className="home-page">
      <DashboardHome path={(paths[0] && paths[1]?.path) || ''} />
      <Container fluid>
        <Row>
          <NavbarHome />
        </Row>
        <Row>
          <HomeRoute paths={paths} />
        </Row>
        <Row className="home-content">
          <Switch>
            {/* <Route path="/information" component={Information} /> */}
            {/* <Route path="/teams" component={ListTeam} /> */}
            {/* <Route path="/champions" component={ListChampion} /> */}
            <Route path='/team/:id' component={DetailTeam} />
            <Route path='/team' component={TeamPage} />
            <Route path='/match' component={Match} />
            <Route path="/" exact component={HomeLayout} />
          </Switch>
        </Row>
      </Container>
    </div>
  );
}
