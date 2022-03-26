import './List.style.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container
} from 'react-bootstrap'
import Table from '../../components/table'
import List from '../../actions/team/list'

export default function ListTeams(props) {
   const teams = useSelector(state=>state.teams)
   const dispatch = useDispatch();
   const action = ({page, pageSize}) => {
    dispatch(List(page, pageSize))
   }
   useEffect(()=>{
       // script start and re-render component
      dispatch(List(0, 0))
       return ()=>{
           // script end component
       }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
  return (
    <Container fluid>
      <Table 
        {...teams}
        action={action}
        />
    </Container>
  );
}
