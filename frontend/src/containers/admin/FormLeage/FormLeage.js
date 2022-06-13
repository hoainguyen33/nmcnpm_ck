import { Form, Input, DatePicker, Upload, Button, Row, Col } from 'antd';
import moment from 'moment';
import './FormLeage.style.scss'
import axiosClient from '../../../api/axiosClient';
import { openNotification } from '../../../components/Notification/Notification';

const formatDate = 'YYYY/MM/DD hh:mm A';

const FormLeage = (data) => {
    const disabledDate = (current) => {
        return current && current < moment().startOf('day');
    }
    const onCancel = () => {
        data.setDisplay(false)
    }
    const onFinish = (values) => {
        console.log('values: ', values)
        if(data.type === 'create') {
            axiosClient.post('/season', {
                name: values?.name,
                logo: 'sdfsdf',
                max_numbers_of_teams: Number(values.maxNumber),
                start_date: values?.startTime,
                end_date: values?.endTime,
                rank: null
            }).then(() => {
                openNotification('success', 'Tạo mùa giải thành công')
            }).catch((err) => {
                console.log('err: ', err)
                openNotification('error', err.response)
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
                        ></Input>
                        {data?.initialValue?.urlImage && (
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
                        )}
                        
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