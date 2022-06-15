import './Players.style.scss';
import { useState } from 'react';
import {Row, Col, Button} from 'antd'
import CardPlayer from '../../../components/CardPlayer/CardPlayer';
import DrawerWrapper from '../../../components/drawer/drawer';
import FormPlayer from '../../../containers/admin/FormPlayer/FormPlayer';
import { PlusSquareOutlined } from '@ant-design/icons';
import useSWR from 'swr';
import { fetcher } from '../../../api/swr';



const Players = () => {
    const [visible, setVisible] = useState(false);
    const {data: dataPlayes} = useSWR('/players', fetcher);
    const role = localStorage.getItem('userType');

    const handleClickButton = () => {
        setVisible(true);
    }


    
    return (
        <div className="wrapper-player">
            <div
                className='header'
            >
                <div className='title'>Danh sách cầu thủ</div>
                {role === 'admin' && 
                    <Button 
                        size="large"
                        type='primary' 
                        icon={<PlusSquareOutlined/>}
                        onClick={handleClickButton}
                    >
                    </Button>
                }
                
            </div>

            <DrawerWrapper 
                child={<FormPlayer setDisplay={setVisible} type='create' initialValue={null}/>}
                display={visible}
                setDisplay={setVisible}
            >
            </DrawerWrapper>

            <div className='content-players'>
                <div className='main-content'>
                    <Row>
                        {dataPlayes?.result.map((item, idx) => {
                            return (
                                <Col lg={6} md={8} xs={24}>
                                    <CardPlayer data={item} key={idx}></CardPlayer >
                                </Col>
                            )
                        })} 
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default Players;