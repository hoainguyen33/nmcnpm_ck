import { Row, Col, Button } from 'antd';

import Card from '../../components/card/card'
import { PlusSquareOutlined } from '@ant-design/icons';
import './home.style.scss';
import DrawerWrapper from '../../components/drawer/drawer';
import { useState } from 'react';
import FormLeage from '../../containers/admin/FormLeage/FormLeage';
const data = [
    {
        id : 1,
        name: 'Mùa giải 1',
        img: './logo.png'
    }, {
        id : 2,
        name: 'Mùa giải 2',
        img: './logo.png'
    }, {
        id : 3,
        name: 'Mùa giải 3',
        img: './logo.png'
    }, {
        id : 4,
        name: 'Mùa giải 4',
        img: './logo.png'
    }
]
const HomeLayout = () => {
    const [visible, setVisible] = useState(false);
    const handleClickButton = () => {
        setVisible(true);
    }
    return (
        <div>
            <div
                className='header'
            >
                <div className='title'>Danh sách mùa giải</div>
                <Button 
                    size="large"
                    type='primary' 
                    icon={<PlusSquareOutlined/>}
                    onClick={handleClickButton}
                >
                </Button>
            </div>
            <DrawerWrapper 
                child={<FormLeage setDisplay={setVisible} type='create' initialValue={null}/>}
                display={visible}
                setDisplay={setVisible}
            >
            </DrawerWrapper>
            <Row justify='center'>
                {
                    data.map((item, idx) => (
                        <Col xs={24} md={8} lg={6}>
                            <Card data={item} type="home" to={`/champions/${item.id}`} key={idx}></Card>
                        </Col>
                    ))
                }
            </Row>
        </div>
    )
}
export default HomeLayout;