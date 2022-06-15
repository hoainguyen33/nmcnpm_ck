import { Form, Input, DatePicker, Upload, Button, Row, Col, Spin } from 'antd';
import moment from 'moment';
import './FormLeage.style.scss'
import axiosClient from '../../../api/axiosClient';
import { openNotification } from '../../../components/Notification/Notification';
import { getUrlFromFirebase } from '../.././../firebase/index';
import { useState } from 'react';
const formatDate = 'YYYY/MM/DD';

const FormLeage = (data) => {
    const [logo, setLogo] = useState('');
    const [disable, setDisable] = useState(false);

    const disabledDate = (current) => {
        return current && current < moment().startOf('day');
    }
    const onCancel = () => {
        data.setDisplay(false)
    }
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
    const onFinish = (values) => {
        console.log('values: ', values)
        if(data.type === 'create') {
            axiosClient.post('/season', {
                name: values?.name,
                logo: logo,
                start_date: moment(values?.startTime).format('YYYY-MM-DD'),
                end_date: moment(values?.endTime).format('YYYY-MM-DD'),
                max_numbers_of_teams: Number(values.maxNumber),
                rank: null
            }).then(() => {
                openNotification('success', 'Tạo mùa giải thành công!')
                data?.refetch()
                data?.setDisplay(false)
            }).catch(() => {
                openNotification('error', 'Tạo mùa giải thất bại!')
            })
        }
    }
    return (
        <div style={{height: '100%'}}>
            <Form
            layout='vertical'
            initialValues={ data?.initialValue && {
                    name: data?.initialValue?.name || null,
                    startTime: moment(data?.initialValue?.startTime).local() || null,
                    endTime: moment(data?.initialValue?.endTime).local() || null,
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
                    {data?.type === 'create' ? 'Tạo mùa giải mới' : 'Chỉnh sửa mùa giải'}
                </h1>
                <div className='content-form-field'>
                    <Form.Item
                        label={'Tên mùa giải'}
                        name='name'
                        rules={[{ required: true, message: 'Name required' }]}
                    >
                        <Input/>
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
                        name='maxNumber'
                        rules={[{ required: true, message: 'Max Number required' }]}
                    >
                        <Input type="Number"/>
                    </Form.Item>

                    <Form.Item
                        label='Hình ảnh'
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
                        {data?.type === 'create' ? 
                            <img 
                                src={logo || null} 
                                style={{
                                    width: '150px',
                                    height: 'auto',
                                    margin: '10px auto',
                                    display: 'block',
                                    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                                    padding: '10px'
                                }}
                            /> : (data?.initialValue?.urlImage && (
                                <img src={data?.initialValue?.urlImage || null} 
                                    style={{
                                        width: '150px',
                                        height: 'auto',
                                        margin: '10px auto',
                                        display: 'block',
                                        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                                        padding: '10px'
                                    }}
                                />
                            ))
                        }
                        
                        
                    </Form.Item>
                </div>
                <Form.Item>
                    <Row>
                        <Col xs={12}>
                            <Button 
                                className='button-confirm'
                                value='confirm'
                                htmlType='submit'
                                size='large'
                                disabled={disable ? true : false}
                            >
                                {data?.type === 'create' ? 'Create' : 'Edit'}
                            </Button>
                        </Col>
                        <Col xs={12}>
                            <Button 
                                className='button-cancel'
                                onClick={onCancel}
                            >
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
        </div>
    )
}

export default FormLeage;