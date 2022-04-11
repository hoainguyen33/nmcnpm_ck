import './DetailChampion.style.scss';
import { Form, Row, Col, Input, DatePicker, Button, Select } from 'antd';
import { openNotification } from '../../../components/Notification/Notification'
import moment from 'moment';
const formatDate = 'YYYY/MM/DD hh:mm A';
const { Option } = Select;

const  data = {
    name: 'Mùa giải 1',
    logo: './logoMu.jpeg',
    startTime: '2022/04/04 10:05 PM',
    endTime: '2022/04/04 10:25 PM',
    team: 32,
    option: 'vòng tròn'
}

const options = [
    {
        id: 1,
        name: 'vòng tròn',
        avatar: './around.png'
    } , {
        id: 2,
        name: 'loại trực tiếp',
        avatar: './around.png'
    } , {
        id: 3,
        name: 'thi đấu vòng bảng lấy 2 đội đầu bảng',
        avatar: './around.png'
    }
]

const DetailChampion = () => {
    const disabledDate = (current) => {
        return current && current < moment().startOf('day');
    }
    const onFinish = (values) => {
        console.log(values);
        openNotification(
            'success',
            'update successful'
        )
    } 
    const onCancel = () => {
        console.log('cancel')
        openNotification(
            'error',
            'update error'
        )
    }
    return (
        <div className="wrapper-champion">
            <Form
            layout='vertical'
            initialValues={ data && {
                    name: data?.name || null,
                    startTime: moment(data?.startTime).local() || null,
                    endTime: moment(data?.endTime).local() || null,
                    team: Number(data?.team) || 0,
                    option: data?.option || null,
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
                        name='team'
                        rules={[{ required: true, message: 'Team required' }]}
                    >
                        <Input type='number'/>
                    </Form.Item>
                    <Form.Item
                        label={'thể thức thi đấu'}
                        name='option'
                        rules={[{ required: true, message: 'Team required' }]}
                    >
                        <Select
                            showSearch
                            // mode='multiple'
                            placeholder={'Chọn thể thức'}
                            optionFilterProp='children'
                            filterOption={(input, option) => {
                                return (
                                option?.children[1]
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                                );
                            }}
                            filterSort={(optionA, optionB) => {
                                return optionA?.children[1]
                                .toLowerCase()
                                .localeCompare(optionB?.children[1].toLowerCase());
                            }}
                            >
                            {options.map((item) => (
                                <Option key={item.id} value={item.id}>
                                <img
                                    style={{ width: 30, margin: '0 5px' }}
                                    src={item.avatar}
                                    alt='logo'
                                />
                                {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label='Logo mùa giải'
                        name='img'
                        rules={[{ required: true, message: 'Image required' }]}
                    >
                        <Input 
                            type='file'
                        ></Input>
                        {data?.logo && (
                            <img src={data?.logo || null} 
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

export default DetailChampion;