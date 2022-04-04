import { Form, Input, DatePicker, Upload, Button, Row, Col } from 'antd';

import moment from 'moment';
const formatDate = 'YYYY/MM/DD hh:mm A';

const FormMatch = (data) => {
    console.log('button edit: ', data);
    const onCancel = () => {
        data.setDisplay(false)
    }
    const onFinish = (values) => {
        console.log('values: ', values)
    }
    const disabledDate = (current) => {
        return current && current < moment().startOf('day');
    }
    return (
        <div>
            <Form
            layout='vertical'
            initialValues={ data?.initialValue && {
                    id: data?.initialValue?.id || null,
                    time: moment(data?.initialValue?.time).local() || null,
                    team1: data?.initialValue?.team1 || null,
                    score: data?.initialValue?.score || null,
                    team2: data?.initialValue?.team2 || null,
                    pitch: data?.initialValue?.pitch || null
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
                    {data?.type === 'create' ? 'Tạo mới trận đấu' : 'Chỉnh sửa thông tin trận đấu'}
                </h1>
                <div className='content-form-field'>
                    <Form.Item
                        label={'Số thứ tự trận đấu'}
                        name='id'
                        rules={[{ required: true, message: 'Name required' }]}
                    >
                        <Input disabled={true}/>
                    </Form.Item>
                    <Form.Item
                        label={'thời gian bắt đầu thi đấu'}
                        name='time'
                        rules={[{ required: true, message: 'Time required' }]}
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
                        label={'Sân bóng'}
                        name='pitch'
                        rules={[{ required: true, message: 'Pitch required' }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label={'Đội chủ nhà'}
                        name='team1'
                        rules={[{ required: true, message: 'Team 1 required' }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label={'Logo đội chủ nhà'}
                        name='logo1'
                        rules={[{ required: true, message: 'Logo required' }]}
                    >
                        <img src={data?.initialValue?.logo1 || null} style={{width: '100px', height: 'auto'}}/>
                    </Form.Item>
                    <Form.Item
                        label={'Score'}
                        name='score'
                        rules={[{ required: true, message: 'Score required' }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label='Tên đội khách'
                        name='team2'
                        rules={[{ required: true, message: 'Team 2 required' }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label={'Logo đội khách'}
                        name='logo2'
                        rules={[{ required: true, message: 'Logo required' }]}
                    >
                        <img src={data?.initialValue?.logo2 || null} style={{width: '100px', height: 'auto'}}/>
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
export default FormMatch;