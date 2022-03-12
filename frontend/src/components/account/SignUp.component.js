import './SignUp.style.css';
import {
    Form,
    Button
} from 'react-bootstrap'
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import LoginAction from '../../actions/account/login'


export default function SignUp(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()

    const login = (e) => {
    e.preventDefault();
    dispatch(LoginAction(email, password));
    }

    return (
        <Form
        className="form-center"
        onSubmit={login}
        >
            <Form.Group
            className="mb-3 fadeIn second"
            controlId="formBasicEmail"
            >
                <Form.Label>
                Email address
                </Form.Label>
                <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={e=>setEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group
            className="mb-3"
            controlId="formBasicPassword"
            >
                <Form.Label>
                Password
                </Form.Label>
                <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={e=>setPassword(e.target.value)}
                />
            </Form.Group>
            <Button
            variant="primary"
            className="submit-button"
            type="submit"
            >
                Log-in
            </Button>
        </Form>
    );
}
