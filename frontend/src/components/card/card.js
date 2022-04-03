import { useState } from 'react' 
import './card.style.scss';
import { Button, Row, Col } from 'antd'
import FormLeage from '../../containers/admin/FormLeage/FormLeage';
import DrawerWrapper from '../drawer/drawer';

const initialData = {
    name: 'Mùa 1', 
    startTime: '2022/04/04 10:05 PM',
    endTime: '2022/04/04 10:25 PM',
    urlImage: './logo.png'
}
const Card = (data) => {
    const [visible, setVisible] = useState(false);
    console.log("data: ", data);
    const handleClick = () => {
        setVisible(true)
    }
    return (
        <div className='wrapper-card'>
            <p>{data.data.name}</p>
            <img className='img-logo' src={data?.data?.img}/>
            <Button type="primary" shape="round" onClick={handleClick}>Xem chi tiết</Button>

            <DrawerWrapper 
                title="Tạo mùa giải mới"
                child={<FormLeage setDisplay={setVisible} initialValue={initialData} type={'edit'}/>}
                display={visible}
                setDisplay={setVisible}
            >
            </DrawerWrapper>
        </div>
    )
}

export default Card;