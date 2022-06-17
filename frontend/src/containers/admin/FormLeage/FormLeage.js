import { Form, Input, DatePicker, Upload, Button, Row, Col, Spin } from 'antd';
import moment from 'moment';
import './FormLeage.style.scss'
import axiosClient from '../../../api/axiosClient';
import { openNotification } from '../../../components/Notification/Notification';
import { getUrlFromFirebase } from '../.././../firebase/index';
import { useEffect, useState } from 'react';
const formatDate = 'YYYY/MM/DD';

const FormLeage = (data) => {
    console.log('form leage: ', data);
    const [logo, setLogo] = useState('');
    const [disable, setDisable] = useState(false);
    const [ form ] = Form.useForm();
    
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
        } else {
            axiosClient.put(`/update-season/${data?.initialValue?.result?.season_info?.id}`, {
                logo: logo,
                start_date: moment(values?.startTime).format('YYYY-MM-DD'),
                end_date: moment(values?.endTime).format('YYYY-MM-DD'),
                max_numbers_of_teams: Number(values?.maxNumber),
            }).then(() => {
                openNotification(
                    'success',
                    'Chỉnh sửa thành công!'
                )
                data?.setDisplay(false)
                data?.refetch()
            }).catch(() => {
                openNotification(
                    'error',
                    'Chỉnh sửa thất bại!'
                )
            })
        }
    }

    useEffect(() => {
        if(data?.type === 'edit') {
            setLogo(data?.initialValue?.result?.season_info?.logo ?? null)
        }
    }, [data])

    return (
        <div style={{height: '100%'}}>
            <Form
            form={form}
            layout='vertical'
            initialValues={ data?.initialValue && {
                    name: data?.initialValue?.result?.season_info?.name || null,
                    startTime: moment(data?.initialValue?.result?.season_info?.start_date).local() || null,
                    endTime: moment(data?.initialValue?.result?.season_info?.end_date).local() || null,
                    maxNumber: Number(data?.initialValue?.result?.season_info?.max_numbers_of_teams) || null
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
                        <Input disabled={data?.type === 'create' ? false : true}/>
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
                            /> : (logo && (
                                <img src={logo?.indexOf('http') > -1 ? logo : '/logoMu.png'} 
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