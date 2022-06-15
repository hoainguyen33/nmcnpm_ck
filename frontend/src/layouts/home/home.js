import { Row, Col, Button } from 'antd';

import Card from '../../components/card/card'
import { PlusSquareOutlined } from '@ant-design/icons';
import './home.style.scss';
import DrawerWrapper from '../../components/drawer/drawer';
import { useState } from 'react';
import FormLeage from '../../containers/admin/FormLeage/FormLeage';
import useSWR from 'swr';
import { fetcher } from '../../api/swr'

const HomeLayout = () => {

    const [visible, setVisible] = useState(false);

    const { data: dataSeason, mutate } = useSWR('/seasons', fetcher);
    const role = localStorage.getItem('userType');
    const handleClickButton = async () => {
        setVisible(true);
    }
    return (
        <div>
            <div
                className='header'
            >
                <div className='title'>Danh sách mùa giải</div>
                {(role === 'admin') &&  <Button 
                        size="large"
                        type='primary' 
                        icon={<PlusSquareOutlined/>}
                        onClick={handleClickButton}
                    >
                    </Button>
                }
                
            </div>
            <DrawerWrapper 
                child={<FormLeage setDisplay={setVisible} type='create' refetch={() => mutate()} initialValue={null}/>}
                display={visible}
                setDisplay={setVisible}
            >
            </DrawerWrapper>
            <Row>
                {
                    dataSeason?.result?.map((item, idx) => (
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