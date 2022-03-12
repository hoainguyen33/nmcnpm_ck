import './index.css'
import NavbarHome from '../../components/home/NavHome.component' 
import { Route } from 'react-router-dom'
import {
  Row
} from 'react-bootstrap'
import Information from '../../layouts/account/Information.layout'

export default function Home(props) {
  return (
    <div fluid className="home-page">
      <Row>
        <NavbarHome />
      </Row>
      <Row>
        <Route path="/home/information" component={Information} />
      </Row>
    </div>
  );
}
