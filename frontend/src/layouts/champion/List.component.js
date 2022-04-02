import './List.style.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
} from 'react-bootstrap'
import gifCreate from '../../icons/icon-create.gif'
import iconCreate from '../../icons/icon-create.svg'
import Cards from '../../components/cards';
// import List from '../../actions/champion/list'

export default function ListChampion(props) {
  const [isShown, setIsShown] = useState(false);
  const champions = useSelector(state=>state.champions)
  const dispatch = useDispatch();
  //  const action = ({page, pageSize}) => {
  //   dispatch(List(page, pageSize))
  //  }
   useEffect(()=>{
       // script start and re-render component
      // dispatch(List(0, 0))
       return ()=>{
           // script end component
       }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
  return (
    <Container fluid className='champions-component'>
      <div className="champions-creater">
        <div>
          <span>Hồ Sơ Giải Đấu</span>
        </div>
        <img 
          src={isShown ? gifCreate : iconCreate} alt="loading..."
          style={{height: "24px", width: "24px"}}
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}/>
      </div>
      <Cards />
    </Container>
  );
}
