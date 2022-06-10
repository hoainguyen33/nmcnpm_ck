import { Row, Col, Button } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';
import { useState } from 'react';
import './TeamPage.style.scss'
import Card from '../../../components/card/card'
import DrawerWrapper from '../../../components/drawer/drawer';
import FormTeam from '../../../containers/admin/FormTeam/FormTeam';
import useSWR from 'swr';
import { fetcher } from '../../../api/swr'


const TeamPage = () => {
    const [visible, setVisible] = useState(false);
    const { data: dataTeam } = useSWR('/teams', fetcher);

    const handleClickButton = () => {
        setVisible(true);
    }
    return (
        <div>
            <div
                className='header'
            >
                <div className='title'>Danh sách đội bóng</div>
                <Button 
                    size="large"
                    type='primary' 
                    icon={<PlusSquareOutlined/>}
                    onClick={handleClickButton}
                >
                </Button>
            </div>
            <DrawerWrapper 
                child={<FormTeam setDisplay={setVisible} type='create' initialValue={null}/>}
                display={visible}
                setDisplay={setVisible}
            >
            </DrawerWrapper>
            <Row >
                {
                    dataTeam?.result.map((item, idx) => (
                        <Col xs={6}>
                            <Card data={item} type="team" to={`/team/${item.id}`} key={idx}></Card>
                        </Col>
                    ))
                }
            </Row>
        </div>
    )
}
export default TeamPage;