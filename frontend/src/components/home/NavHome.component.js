import './NavHome.style.css';
import logoUser from '../../icons/user.png'
import {
  Navbar,
  Container,
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
    <Navbar 
      bg="primary"
      variant="dark"
      expand="lg"
      >
      <div style={{height: '44px'}} className="nav-home-component">
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="&#xF002; Search"
              className="me-2 nav-search"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
        <Button className="nav-button-user" onClick={handleShow}>
          <Image
            className="nav-icon-user"
            src={logoUser}
            />
        </Button>
      </div>
      <Modal
      show={show}
        handleClose={handleClose}
        />
    </Navbar>
  );
}
