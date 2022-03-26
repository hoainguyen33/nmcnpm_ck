import './ModalUser.style.css';
import LogOut from '../../actions/account/logout'
import {
  Modal,
  Button
} from 'react-bootstrap'
import { useDispatch } from 'react-redux';

export default function ModalUser(props) {
    const dispatch = useDispatch();
  const logOut = () => {
    dispatch(LogOut());
    props.handleClose();
  }
  return (
    <Modal
        className="modal-user"
        show={props.show}
        onHide={props.handleClose}
        dialogClassName='custom-dialog'
        >
        <Modal.Body className="modal-user-content">
            <Button variant="secondary" onClick={props.handleClose}>
                Infomation(don't work)
            </Button>
            <Button variant="secondary" onClick={props.handleClose}>
                Setting(don't work)
            </Button>
            <Button variant="secondary" onClick={logOut}>
                Log-out
            </Button>
        </Modal.Body>
      </Modal>
  );
}
