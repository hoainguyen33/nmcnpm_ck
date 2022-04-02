import './Card.style.css'
import {
  Card,
  Button
} from 'react-bootstrap'

export default function CardCompoment(props) {
  return (
    <Card className='card-component'>
        <Card.Title>Mùa Giải Test</Card.Title>
        <Card.Img variant="top" src="https://thethaoso.com/wp-content/uploads/2020/10/champions-league-la-gi.jpg" />
        <Card.Body>
            <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
            </Card.Text>
            <Button className='card-button' variant="primary">Xem chi tiết</Button>
        </Card.Body>
    </Card>
  );
}