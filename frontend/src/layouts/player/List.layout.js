import './List.style.css'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Container
} from 'react-bootstrap'
import Table from '../../components/table'

export default function ListPlayer(props) {
  const info = useSelector(state=>state.account.info)
   useEffect(()=>{
       // script start and re-render component
       return ()=>{
           // script end component
       }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [info])
  return (
    <Container fluid>
      <Table />
    </Container>
  );
}
