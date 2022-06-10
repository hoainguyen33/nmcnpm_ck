import { Form, Input, DatePicker, Upload, Button, Row, Col } from 'antd';
import './FormTeam.style.scss';
import axiosClient from '../../../api/axiosClient';
import { openNotification } from '../../../components/Notification/Notification';


const FormTeam = (data) => {
    const onCancel = () => {
        data.setDisplay(false)
    }
    const onFinish = (values) => {
        console.log('values: ', values)
        if(data.type === 'create') {
            axiosClient.post('/team', {
                name: values?.name,
                logo: 'sdfsdf',
                max_numbers_of_players: Number(values.maxNumber),
                coach: values.coach
            }).then(() => {
                openNotification('error', 'Tạo thành công')
            }).catch((err) => {
                console.log('err: ', err.err)
                openNotification('error', 'Tên đội bóng trùng, vui lòng tạo lại.')
            })
        }
    }
    return (
        <div style={{height: '100%'}}>
            <Form
            layout='vertical'
            initialValues={ data?.initialValue && {
                    name: data?.initialValue?.name || null,
                    pitch: data?.initialValue?.pitch || null,
                    coach: data?.initialValue?.coach || null,
                    urlImage: data?.initialValue?.urlImage || null
                }
            }
            onFinish={onFinish}
            >
                <h1
                    style={{
                        textAlign: 'center',
                        fontSize: '30px',
                        color: '#2566df',
                    }}
                >
                    {data?.type === 'create' ? 'Tạo đội bóng mới' : 'Chỉnh sửa thông tin đội bóng'}
                </h1>
                <div className='content-form-field'>
                    <Form.Item
                        label={'Tên đội bóng'}
                        name='name'
                        rules={[{ required: true, message: 'Name required' }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label={'Sân vận động'}
                        name='pitch'
                        rules={[{ required: true, message: 'Pitch required' }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label={'Huấn luyện viên'}
                        name='coach'
                        rules={[{ required: true, message: 'Coach required' }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label={'Số lượng cầu thủ'}
                        name='maxNumber'
                        rules={[{ required: true, message: 'Max Number required' }]}
                    >
                        <Input type="number"/>
                    </Form.Item>
                    <Form.Item
                        label='Logo đội bóng'
                        name='img'
                        // rules={[{ required: true, message: 'Logo required' }]}
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

export default FormTeam;