import './index.css'
import {
    Container,
    Image
} from 'react-bootstrap'

export default function DescriptionCompoment(props) {
  return (
    <Container className="description">
        <div>
            <div dangerouslySetInnerHTML={{ __html: props.names.map(e=>`<b>${e}</b>`).join(" hay ") }} />
            {props.content}
        </div>
        <Image
        className='description-image'
        src={props.avatar} />
    </Container>
  );
}