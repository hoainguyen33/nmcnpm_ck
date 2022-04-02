import './index.css'
import {
  Container,
} from 'react-bootstrap'
import Card from './Card.component'
import Pagination from '../../components/table/Pagination.component'
export default function CardsCompoment(props) {
  return (
    <Container>
      <div className='cards-component'>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <Pagination
        pd="10px 20px 20px 20px"
        // action={action}
        page={1}
        pageSize={10}
        total={25}
       />
    </Container>
  );
}