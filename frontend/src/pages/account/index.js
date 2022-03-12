import './index.css'
import React from 'react';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import {
    Container
} from 'react-bootstrap';
import SignIn from '../../components/account/SignIn.component';
import SignUp from '../../components/account/SignUp.component';

export default function Account(props) {
   
    return (
        <Container>
            <Route path="/account/sign-in" component={SignIn} />
            <Route path="/account/sign-up" component={SignUp} />
        </Container>
    );
}
