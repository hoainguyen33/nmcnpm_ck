import './SignIn.style.css';
import {
    Form,
    Button
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import LoginAction from '../../actions/account/login'


export default function SignIn(props) {
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
            <h3>Sign In</h3>
            <Form.Group
                className="form-item mb-3 fadeIn second"
                controlId="formBasicEmail"
            >
                <Form.Label>
                    Email address
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter email"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group
                className="form-item mb-3"
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
            <Form.Group
                className="form-item mb-3"
                controlId="formBasicCheckbox"
            >
                 <Form.Check
                    type="checkbox"
                    label="Remember me"
                />
            </Form.Group>
            <Button
                variant="primary"
                className="form-item submit-button"
                type="submit"
            >
                Submit
            </Button>
            <Form.Group
                className="form-item form-links mt-3"
                controlId="formBasicCheckbox"
            >
                <Link className="form-link"
                    to="#"
                >
                    Forgot password?
                </Link>
                <Link className="form-link"
                    to="/account/sign-up"
                >
                    Sign Up?
                </Link>
            </Form.Group>
        </Form>
    );
}
