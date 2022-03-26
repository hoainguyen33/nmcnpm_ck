import './index.css'
import { useEffect } from 'react';
import { Route } from 'react-router-dom'
import { useSelector } from 'react-redux';
import {
  Row,
  Container
} from 'react-bootstrap'
import Information from '../../layouts/account/Information.layout'
import ListTeam from '../../layouts/team/List.layout'
import NavbarHome from '../../components/home/NavHome.component' 

export default function Home(props) {
  const info = useSelector(state=>state.account.info)
   useEffect(()=>{
       (info && info.token) || props.history.push("/account/sign-in")
       return ()=>{
           // script end component
       }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [info])
  return (
    <Container fluid className="home-page">
      <Row>
        <NavbarHome />
      </Row>
      <Row>
        <Route path="/home/information" component={Information} />
        <Route path="/home/teams" component={ListTeam} />
      </Row>
    </Container>
  );
}
