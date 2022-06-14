import './Dashboard.style.css';
import logo from '../../logo.svg'
import {
  Nav
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import NavItem from './NavItem.component';
import iconChamp from '../../icons/icon-champion.svg'
import iconTeam from '../../icons/icon-team.svg'
import iconPlayer from '../../icons/icon-player.svg'
import iconMenu from '../../icons/icon-menu.svg'
import iconRight from '../../icons/icon-right.svg'
import iconLogout from '../../icons/icon-logout.svg'
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import Logout from '../../actions/account/logout'

export default function DashboardHome(props) {
  const [isShow, setIsShow] = useState(false)
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(Logout())
  }
  return (
    <div
      className={isShow ? "dashboard left" : 'dashboard'}
      style={{width: isShow? "80px" : undefined}}
    >
       <Link to="/home">
          <img
            src={logo}
            width={isShow ? "30": "40"}
            height={isShow ? "30": "40"}
            className="d-inline-block align-top"
            alt="Football Logo"
          />
          {isShow || " CHELSEA FC"}
        </Link>
        <img
          src={isShow ? iconRight : iconMenu}
          width="40"
          height="40"
          alt="Dashboard Logo"
          className={isShow ? "icon-menu" : "icon-menu"}
          onClick={()=>setIsShow(!isShow)}
          />
      <div className="dashboard-gap"></div>
      <Nav className='dashboard-scroll'>
        <NavItem
          logo={iconChamp}
          title="Champions"
          hover={props.path === "/"}
          to="/"
          isShow={isShow}
          />
        <NavItem
          logo={iconTeam}
          title="Teams"
          hover={props.path === "/team"}
          to="/team"
          isShow={isShow}
          />
        <NavItem
          logo={iconPlayer}
          title="Players"
          hover={props.path === "/players"}
          to="/players"
          isShow={isShow}
          />
        <NavItem
          logo={iconLogout}
          title="Logout"
          isShow={isShow}
          action={logout}
          />
      </Nav>
    </div>
  );
}