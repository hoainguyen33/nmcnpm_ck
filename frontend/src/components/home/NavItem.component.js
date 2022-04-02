import './NavItem.style.css'
import {
  Nav,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function NavItem(props) {
    return (
    <Nav.Item>
        <Link to={props.to} 
          style={{
            backgroundColor: props.hover ? "#1b1f2b" : undefined,
            padding: props.isShow ? "20px 10px" : undefined}}
            className="nav-item-link"
            >
            <img
                src={props.logo}
                width="20"
                height="20"
                className="d-inline-block align-top"
                alt="Champion logo"
            />
            {props.isShow || (' '+props.title)}
        </Link>
    </Nav.Item>
  );
}
