import { Form, Input, DatePicker, Upload, Button, Row, Col } from 'antd';
import './FormPlayer.style.scss';
import axiosClient from '../../../api/axiosClient';
import { openNotification } from '../../../components/Notification/Notification';


const FormTeam = (data) => {
    const onCancel = () => {
        data.setDisplay(false)
    }
    
    const onFinish = (values) => {
        console.log('values: ', values)
        if(data.type === 'create') {
            axiosClient.post('/player', {
                name: values?.name,
                logo: 'sdfsdf',
                age: Number(values?.age),
                gender: values?.gender,
                height: Number(values?.height),
                weight: Number(values?.weight),
                point: Number(values?.point),
                position: values?.position
            }).then(() => {
                openNotification('error', 'Tạo thành công')
            }).catch((err) => {
                console.log('err: ', err.err)
                openNotification('error', 'Lỗi')
            })
        }
    }
    return (
        <div style={{height: '100%'}}>
            <Form
            layout='vertical'
            initialValues={ data?.initialValue && {
                    name: data?.initialValue?.name || null,
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
                    {data?.type === 'create' ? 'Tạo cầu thủ' : 'Chỉnh sửa thông tin cầu thủ'}
                </h1>
                <div className='content-form-field'>
                    <Form.Item
                        label={'Tên cầu thủ'}
                        name='name'
                        rules={[{ required: true, message: 'Name required' }]}
                    >
                        <Input/>
                    </Form.Item>
                    
                    <Form.Item
                        label={'Chỉ số'}
                        name='point'
                        rules={[{ required: true, message: 'Number required' }]}
                    >
                        <Input type="number"/>
                    </Form.Item>
                    <Form.Item
                        label={'Tuổi'}
                        name='age'
                        rules={[{ required: true, message: 'Age required' }]}
                    >
                        <Input type="number"/>
                    </Form.Item>
                    <Form.Item
                        label={'Chiều cao'}
                        name='height'
                        rules={[{ required: true, message: 'Number required' }]}
                    >
                        <Input type="number"/>
                    </Form.Item>
                    <Form.Item
                        label={'Cân nặng'}
                        name='weight'
                        rules={[{ required: true, message: 'Number required' }]}
                    >
                        <Input type="number"/>
                    </Form.Item>
                    <Form.Item
                        label={'Vị trí'}
                        name='position'
                        rules={[{ required: true, message: 'Position required' }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label='Ảnh đại diện'
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