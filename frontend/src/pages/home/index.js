import './index.css'
import { useEffect } from 'react';
import { Route, Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import {
  Row,
  Container,
} from 'react-bootstrap'
import Information from '../../layouts/account/Information.layout'
import ListTeam from '../../layouts/team/List.layout'
import NavbarHome from '../../components/home/NavHome.component' 
import DashboardHome from '../../components/home/Dashboard.component';
import { Search } from '../../route/route';
// import ListChampion from '../../layouts/champion/List.component';
import HomeLayout from '../../layouts/home/home'
import ListChampion from '../../layouts/home/home';

export default function Home(props) {
  const info = useSelector(state=>state.account.info)
  const paths = Search(props.location.pathname.split("/").slice(1))
  useEffect(()=>{
      (info && info.token) || props.history.push("/account/sign-in")
      return ()=>{
          // script end component
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info])
  return (
    <div fluid className="home-page">
      <DashboardHome path={paths[0] && paths[1] && paths[1].path} />
      <Container fluid>
        <Row>
          <NavbarHome />
        </Row>
        <Row>
          <div className="home-route">
            { paths.map((e, i)=><span><Link to={e.path}>{e.title}</Link>{i + 1 !== paths.length && " > "}</span>) }
          </div>
        </Row>
        <Row className="home-content">
          <Route path="/" component={HomeLayout} />
          <Route path="/home/information" component={Information} />
          <Route path="/home/teams" component={ListTeam} />
          <Route path="/home/champions" component={ListChampion} />
        </Row>
      </Container>
    </div>
  );
}
