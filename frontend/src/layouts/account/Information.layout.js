import './Information.style.css';
import { 
    Container,
    Stack
 } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Current from '../../actions/account/current'

export default function Infomation(props) {
    const account = useSelector(state=>state.account);
    const { info } = account;

    const dispatch = useDispatch()

    useEffect(()=>{
      if(!info){
        const token = localStorage.getItem("token");
        if(token){
            dispatch(Current(token));
        } else props.history.push('/login');
      }
      return ()=>{
        //
      }
    }, [info])
    return (
        <Container className="information-layout">
            {info &&
                <Stack gap={3}>
                <Container>
                    <div>Họ và tên</div>
                    <div className="bg-light border">{info.name}</div>
                </Container>
                <Container>
                    <div>CMND</div>
                    <div className="bg-light border">{info.cmnd}</div>
                </Container>
                <Container>
                    <div>Năm sinh</div>
                    <div className="bg-light border">{info.birth_day}</div>
                </Container>
                <Container>
                    <div>Địa chỉ</div>
                    <div className="bg-light border">{info.address}</div>
                </Container>
                <Container>
                    <div>Trạng thái</div>
                    <div className="bg-light border">{info.status}</div>
                </Container>
                <Container>
                    <div>Nơi đang điều trị</div>
                    <div className="bg-light border">{info.hospital}</div>
                </Container>
            </Stack>
            }
        </Container>
    )
}