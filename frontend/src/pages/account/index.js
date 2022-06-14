import './index.css'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import {
    Container
} from 'react-bootstrap';
import SignIn from '../../components/account/SignIn.component';
import SignUp from '../../components/account/SignUp.component';

export default function Account(props) {
   const info = useSelector(state=>state.account.info)
   useEffect(()=>{
       info && info["access-token"] && props.history.push("/")
       return ()=>{
           // script end component
       }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [info])
    return (
        <Container
            style={{
                background: "#1C8CF6",
                minHeight: "100vh",
                minWidth: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Route path="/account/sign-in" component={SignIn} />
            <Route path="/account/sign-up" component={SignUp} />
        </Container>
    );
}
