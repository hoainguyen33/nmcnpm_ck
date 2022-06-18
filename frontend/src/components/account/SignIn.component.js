import './SignIn.style.css';
import {
    Form,
    Button,
    Alert
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import LoginAction from '../../actions/account/login'


export default function SignIn(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [remember, setRemember] = useState(false);
    const dispatch = useDispatch()

    const action = (mes, redirect) => {
        if (redirect) {
           
        } else {
            setMessage(mes)
        }
    }

    const login = (e) => {
        e.preventDefault();
        action("", false)
        dispatch(LoginAction(email, password, remember, action));
    }

    return (
        <Form
            className="form-center"
            onSubmit={login}
        >   {message && 
            <Alert>
                {message}
             </Alert>
            }
            <h3>Sign In</h3>
            <Form.Group
                className="form-item mb-3 fadeIn second"
                controlId="formBasicEmail"
            >
                <Form.Label>
                    Username
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter username"
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
                    onChange={e=>setRemember(!remember)}
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
