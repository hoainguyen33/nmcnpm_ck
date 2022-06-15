import { useState } from 'react' 
import './card.style.scss';
import { Button, Row, Col, Modal, Checkbox, Avatar, Badge } from 'antd'
import FormLeage from '../../containers/admin/FormLeage/FormLeage';
import FormTeam from '../../containers/admin/FormTeam/FormTeam';
import DrawerWrapper from '../drawer/drawer';
import { Link } from 'react-router-dom'
import useSWR from 'swr';
import { fetcher } from '../../api/swr';
import axiosClient from '../../api/axiosClient';
import { openNotification } from '../Notification/Notification';

const Card = (data) => {
    const role = localStorage.getItem('userType');
    
    const [visible, setVisible] = useState(false);

    //teams
    const [showModal, setShowModal] = useState(false);
    const [teamSelected, setTeamSelected] = useState();
    const { data: dataSeasonDetail } = useSWR(`/get-team/${data?.data.id}`, fetcher);
    const { data: dataTeams } = useSWR('/teams', fetcher);


    const handleClick = () => {
        setVisible(true)        
    }

    // teams
    const handleShowModal = () => {
        setShowModal(true);
    }
    const handleOk = () => {
        if(teamSelected.length === 0) {
            return;
        }
        let n = teamSelected.length - 1;

        axiosClient.post('/import-team', {
            season_id: Number(data?.data?.id),
            team_id: Number(teamSelected[n])
        }).then(() => {
            openNotification('success', 'Thêm đội bóng vào mùa giải thành công!')
            setShowModal(false);
        }).catch(() => {
            openNotification('success', 'Thêm đội bóng vào mùa giải thất bại!')
        })
    }
    const handleClickCardIdol = (value) => {
        setTeamSelected(value)
    }
    const checkCardActive = (value, item) => {
        return value?.indexOf(item.id) === -1 || !teamSelected ? true : false;
    };


    return (
        <div className='wrapper-card'>
            <p>{data.data.name}</p>
            <img className='img-logo' src={data?.data?.logo?.indexOf('http') > -1 ? data?.data?.logo : (data?.type === 'home' ? '/logoMu.png' : '/default-team-logo.png')}/>
            <p style={{fontWeight: 'normal', fontSize: '20px'}}>{data.data?.pitch}</p>
            {data?.type === 'home' ? 
                <Link style={{width: '100%'}} to={`/detail-champion?championId=${data.data?.id}`}>
                    <Button  style={{ width: '100%'}} type="primary" shape="round">Xem chi tiết</Button>
                </Link> : 
                <Link style={{width: '100%'}} to={`/detail-teams?teamId=${data.data?.id}`}>
                    <Button  style={{ width: '100%'}} type="primary" shape="round">Xem chi tiết</Button>
                </Link> 
            }
            {role === 'admin' && <Button style={{margin: '10px 0px'}} type="primary" shape="round" onClick={handleClick}>
                    Chỉnh sửa
                </Button>
            }

            {role === 'admin' && data?.type === 'home' && <Button style={{margin: ' 0px'}} type="primary" shape="round" onClick={handleShowModal}>
                    Thêm đội bóng
                </Button>
            }

            {role === 'admin' && data?.type === 'team' && <Link to={`/add-player?teamId=${data?.data?.id}`}>
                    <Button style={{margin: ' 0px', width: '100%'}} type="primary" shape="round" >
                        Thêm Cầu Thủ
                    </Button>
                </Link>
            }
            
            <DrawerWrapper 
                child={data?.type === 'home' ? 
                    <FormLeage setDisplay={setVisible} initialValue={null} type={'edit'}/>
                    : <FormTeam setDisplay={setVisible} initialValue={null} type={'edit'}/>
                }
                display={visible}
                setDisplay={setVisible}
            >
            </DrawerWrapper>

            
            {showModal && <Modal
                className='modal-add-idol'
                title='Thêm đội bóng (1 đội)'
                centered
                visible={showModal}
                onOk={handleOk}
                onCancel={() => setShowModal(false)}
                cancelText={'Cancel'}
                >
                    <Checkbox.Group onChange={handleClickCardIdol}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexFlow: 'wrap',
                            width: '100%',
                            height: '100%'
                        }}
                    >
                        {dataTeams &&
                            dataTeams?.result?.map((item) => (
                            <Checkbox
                                style={{
                                    display: 
                                        dataSeasonDetail?.result?.team_info?.id !== item.id
                                        ? 'block'
                                        : 'none'
                                }}
                                className='add-idol-item'
                                value={item.id}
                                key={item.id}
                            >
                                <Badge.Ribbon color={'blue'} text={'追加'}>
                                    <div
                                    className='idol-item'
                                    style={{
                                        margin: 0,
                                        background: checkCardActive(teamSelected, item)
                                        ? 'none'
                                        : 'red'
                                        // border: checkCardActive(idolSelected, item) ? "none" : "1px solid red"
                                    }}
                                    >
                                    <Row style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} justify={'center'} className='content-idol'>
                                        <Avatar
                                            className='avatar-idol'
                                            size={72}
                                            src={item.logo ? item.logo : '/default-team-logo.png'}
                                        />
                                        
                                            <span className='name-idol-add'>
                                                {item.name}
                                            </span>
                                        </Row>
                                    </div>
                                </Badge.Ribbon>
                                </Checkbox>
                            ))}
                        </div>
                    </Checkbox.Group>
                </Modal>
            }
        </div>
    )
}

export default Card;