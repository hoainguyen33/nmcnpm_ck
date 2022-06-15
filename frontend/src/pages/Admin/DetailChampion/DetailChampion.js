import './DetailChampion.style.scss';
import { Form, Row, Col, Input, DatePicker, Button, Tabs, Spin } from 'antd';
import { openNotification } from '../../../components/Notification/Notification'
import Card from '../../../components/card/card';
import Match from '../../../pages/Admin/Match/Match';
import moment from 'moment';
import useSWR from 'swr';
import { fetcher } from '../../../api/swr';
import { useState, useEffect } from 'react';
import Rank from '../../../containers/admin/Rank/Rank';
import axiosClient from '../../../api/axiosClient';
import { getUrlFromFirebase } from '../../../firebase/index';

const formatDate = 'YYYY-MM-DD';


const { TabPane } = Tabs;


const DetailChampion = () => {
    const [logo, setLogo] = useState();
    const [disable, setDisable] = useState(false);
    const [ form ] = Form.useForm();
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('championId');
    const { data: dataSeason, mutate } = useSWR(`/get-season/${id}`, fetcher) 
    const { data: dataRank } = useSWR(`/get-season-rank/${id}`, fetcher)
    const role = localStorage.getItem('userType');

    useEffect(() => {
        form.setFieldsValue({ 
            name: dataSeason?.result?.season_info?.name || null ,
            startTime: moment(dataSeason?.result?.season_info?.start_date).local() || null,
            endTime: moment(dataSeason?.result?.season_info?.end_date).local() || null,
            team: Number(dataSeason?.result?.season_info?.max_numbers_of_teams) || 0,
         })
        setLogo(dataSeason?.result?.season_info?.logo);
    }, [dataSeason])

    const handleUpload = (e) => {
        setDisable(true)
       getUrlFromFirebase(e, (result) => {
            console.log('result: ', result)
            if(result.success) {
                setLogo(result.image)
                setDisable(false)
            } else {
                setLogo(null)
                setDisable(false)
            }
       }) 
    }
    const handleBeforeCreateMatch = () => {
        axiosClient.post(
            `/create-match-schedule/${id}`
        ).then(() => {
            openNotification(
                'success',
                'Tạo lịch thi đấu thành công!'
            )
            mutate()
        }).catch(() => {
            openNotification(
                'error',
                'Tạo lịch thi đấu thất bại!'
            )
        })
    }

    const disabledDate = (current) => {
        return current && current < moment().startOf('day');
    }
    const onFinish = (values) => {
        console.log(values);
        axiosClient.put(`/update-season/${id}`, {
            logo: logo,
            start_date: moment(values?.startTime).format('YYYY-MM-DD'),
            end_date: moment(values?.endTime).format('YYYY-MM-DD'),
            max_numbers_of_teams: Number(values?.team),
        }).then(() => {
            openNotification(
                'success',
                'Chỉnh sửa thành công!'
            )
        }).catch(() => {
            openNotification(
                'error',
                'Chỉnh sửa thất bại'
            )
        })
        
    } 
    return (
        <div className="wrapper-champion">
            <div className='wrapper-content'>
                <div className='radio-button'>
                    <Tabs type="card" defaultActiveKey={1}>
                        <TabPane tab="Thông tin chung" key="1" >
                        <Form
                            form={form}
                            layout='vertical'
                            initialValues={ dataSeason?.result && {
                                    name: dataSeason?.result?.season_info?.name || null ,
                                    startTime: moment(dataSeason?.result?.season_info?.start_date).local() || null,
                                    endTime: moment(dataSeason?.result?.season_info?.end_date).local() || null,
                                    team: Number(dataSeason?.result?.season_info?.max_numbers_of_teams) || 0,
                                }
                            }
                            scrollToFirstError
                            onFinish={onFinish}
                            >
                                <h1
                                    style={{
                                        textAlign: 'center',
                                        fontSize: '30px',
                                        color: '#2566df',
                                    }}
                                >
                                    Thông tin chi tiết mùa giải
                                </h1>
                                <div className='content-form-field'>
                                    <Form.Item
                                        label={'Tên mùa giải'}
                                        name='name'
                                        rules={[{ required: true, message: 'Name required' }]}
                                    >
                                        <Input disabled={true}/>
                                    </Form.Item>
                                    <Form.Item
                                        label={'Ngày bắt đầu'}
                                        name='startTime'
                                        rules={[{ required: true, message: 'Start Time required' }]}
                                    >
                                        <DatePicker
                                        disabledDate={disabledDate}
                                        showTime
                                        size='large'
                                        style={{
                                            width: '100%'
                                        }}
                                        format={formatDate}
                                        >
                                        </DatePicker>
                                    </Form.Item>
                                    <Form.Item
                                        label={'Ngày kết thúc'}
                                        name='endTime'
                                        rules={[{ required: true, message: 'End Time required' }]}
                                    >
                                        <DatePicker
                                        disabledDate={disabledDate}
                                        showTime
                                        size='large'
                                        format={formatDate}
                                        style={{
                                            width: '100%'
                                        }}
                                        >
                                        </DatePicker>
                                    </Form.Item>
                                    <Form.Item
                                        label={'Số lượng đội bóng'}
                                        name='team'
                                        rules={[{ required: true, message: 'Team required' }]}
                                    >
                                        <Input type='number'/>
                                    </Form.Item>
                                    <Form.Item
                                        label='Logo mùa giải'
                                        name='img'
                                        // rules={[{ required: true, message: 'Image required' }]}
                                    >
                                        <Input 
                                            type='file'
                                            onChange={handleUpload}
                                        ></Input>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            marginTop: '10px'
                                        }}>
                                            {disable ? <Spin size="large"/> : <></>}
                                        </div>
                                        {logo && (
                                            <img src={logo.indexOf('http') > -1 ? logo : '/default-team-logo.png'} 
                                                style={{
                                                    width: '150px',
                                                    height: 'auto',
                                                    margin: '10px auto',
                                                    display: 'block',
                                                    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                                                    padding: '10px'
                                                }}
                                            />
                                        )}
                                        
                                    </Form.Item>
                                </div>
                                {role === 'admin' && <Form.Item>
                                    <Row>
                                        <Col xs={12}>
                                            <Button 
                                                className='button-confirm'
                                                size='large'
                                                style={{
                                                    background: 'green'
                                                }}
                                                disabled={dataSeason?.result?.season_info?.is_start ? true : false}
                                                onClick={handleBeforeCreateMatch}
                                            >
                                                Tạo lịch thi đấu
                                            </Button>
                                        </Col>
                                        <Col xs={12}>
                                            <Button 
                                                className='button-confirm'
                                                value='confirm'
                                                htmlType='submit'
                                                size='large'
                                                disabled={disable ? true : false}
                                            >
                                                Chỉnh sửa
                                            </Button>
                                        </Col>
                                        
                                    </Row>
                                </Form.Item>
                            }
                        </Form>
                        </TabPane>
                        <TabPane tab="Danh sách đội bóng" key="2" >
                        <Row >
                            {
                                dataSeason?.result?.teams?.map((item, idx) => (
                                    <Col xs={6}>
                                        <Card data={item} type="team" to={`/team/${item.id}`} key={idx}></Card>
                                    </Col>
                                ))
                            }
                        </Row>
                        </TabPane>
                        <TabPane tab="Lịch thi đấu" key="3" >
                            <Match data={ dataSeason?.result?.matches }></Match>
                        </TabPane>
                        <TabPane tab="Bảng xếp hạng" key="4" >
                            <Rank data={ dataRank?.result ?? [] }></Rank>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default DetailChampion;