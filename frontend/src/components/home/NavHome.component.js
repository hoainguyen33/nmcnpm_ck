import './NavHome.style.css';
import logo from '../../logo.svg'
import logoUser from '../../icons/user.png'
import { Link } from 'react-router-dom'
import {
  Navbar,
  Container,
  NavDropdown,
  Nav,
  Form,
  FormControl,
  Button,
  Image
} from 'react-bootstrap'
import { useSelector } from 'react-redux';
import Modal from './ModalUser.component';
import { useState } from 'react';

export default function NavbarHome(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const account = useSelector(state=>state.account);
  const { info } = account;
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container fluid={!info}>
        <Navbar.Brand href="/">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Football Logo"
          />
          {' '}Chelsea Fc
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link className="nav-link" to="/home/players">Players</Link>
            <Link className="nav-link" to="/home/team">Teams</Link>
            <NavDropdown title="Service" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/home/buy-ticker">
                Buy Ticker
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/home/buy-food">
                Buy Food
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link className="nav-link" href="#" disabled>
              Admin
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Button className="nav-button-user" onClick={handleShow}>
            <Image
              className="nav-icon-user"
              src={logoUser}
              />
          </Button>
        </Navbar.Collapse>
      </Container>
      <Modal
      show={show}
        handleClose={handleClose}
        />
    </Navbar>
  );
}
