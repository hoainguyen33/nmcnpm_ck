import './SignUp.style.css';
import {
    Form,
    Button,
    Alert
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import RegisterAction from '../../actions/account/register'


export default function SignUp(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [message, setMessage] = useState('');
    const dispatch = useDispatch()

    const action = (mes, redirect) => {
        if (redirect) {
            props.history.push("/login")
        } else {
            setMessage(mes)
        }
    }

    const register = (e) => {
        e.preventDefault();
        action("", false)
        if (!email) {
            action("Username không được để trống", false)
            return
        }
        if (password.length < 8) {
            action("Mật khẩu phải lớn hơn 8 ký tự", false)
            return
        }
        if (password !== rePassword) {
            action("Confirm Password phải giống với Password", false)
            return
        } 
        dispatch(RegisterAction(email, password, action));
    }

    return (
        <Form
            className="form-center"
            onSubmit={register}
        >
            {message && 
            <Alert>
                {message}
                </Alert>
            }
            <h3>Sign Up</h3>
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
                controlId="formBasicRePassword"
            >
                <Form.Label>
                    Confirm Password
                </Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Re-Password"
                    value={rePassword}
                    onChange={e=>setRePassword(e.target.value)}
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
                className="form-item form-links-center mt-3"
                controlId="formBasicCheckbox"
            >
                <Link className="form-link"
                    to="/account/sign-in"
                >
                    Already registered Sign In?
                </Link>
            </Form.Group>
        </Form>
    );
}
