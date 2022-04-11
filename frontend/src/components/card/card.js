import { useState } from 'react' 
import './card.style.scss';
import { Button, Row, Col } from 'antd'
import FormLeage from '../../containers/admin/FormLeage/FormLeage';
import FormTeam from '../../containers/admin/FormTeam/FormTeam';
import DrawerWrapper from '../drawer/drawer';
import { Link } from 'react-router-dom'

const initialDataHome = {
    name: 'Mùa 1', 
    startTime: '2022/04/04 10:05 PM',
    endTime: '2022/04/04 10:25 PM',
    urlImage: './logo.png'
}
const initialDataTeam = {
    name: 'Manchester United',
    coach: 'Sir Alex',
    pitch: 'Old Trafford',
    urlImage: './logoMu.jpeg'
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
            <p style={{fontWeight: 'normal', fontSize: '20px'}}>{data.data?.pitch}</p>
            {data?.type === 'home' ? 
                <Link style={{width: '100%'}} to={`/detail-champion?championId=${data.data?.id}`}>
                    <Button  style={{ width: '100%'}} type="primary" shape="round">Xem chi tiết</Button>
                </Link> : 
                <Link style={{width: '100%'}} to={`/detail-teams?teamId=${data.data?.id}`}>
                    <Button  style={{ width: '100%'}} type="primary" shape="round">Xem chi tiết</Button>
                </Link> 
            }
            
            <Button style={{margin: '10px 0px'}} type="primary" shape="round" onClick={handleClick}>Chỉnh sửa</Button>
            <DrawerWrapper 
                child={data?.type === 'home' ? 
                    <FormLeage setDisplay={setVisible} initialValue={initialDataHome} type={'edit'}/>
                    : <FormTeam setDisplay={setVisible} initialValue={initialDataTeam} type={'edit'}/>
                }
                display={visible}
                setDisplay={setVisible}
            >
            </DrawerWrapper>
        </div>
    )
}

export default Card;