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
import { useState } from 'react';

export default function DashboardHome(props) {
  const [isShow, setIsShow] = useState(false)
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
          hover={props.path === "/home/champions"}
          to="/home/champions"
          isShow={isShow}
          />
        <NavItem
          logo={iconTeam}
          title="Teams"
          hover={props.path === "/home/teams"}
          to="/home/teams"
          isShow={isShow}
          />
        <NavItem
          logo={iconPlayer}
          title="Players"
          hover={props.path === "/home/players"}
          to="/home/players"
          isShow={isShow}
          />
      </Nav>
    </div>
  );
}
