import './DetailChampion.style.scss';
import { Form, Row, Col, Input, DatePicker, Button, Tabs } from 'antd';
import { openNotification } from '../../../components/Notification/Notification'
import Card from '../../../components/card/card';
import Match from '../../../pages/Admin/Match/Match';
import moment from 'moment';
const formatDate = 'YYYY/MM/DD hh:mm A';

const { TabPane } = Tabs;

const  data = {
    name: 'Mùa giải 1',
    logo: './logoMu.jpeg',
    startTime: '2022/04/04 10:05 PM',
    endTime: '2022/04/04 10:25 PM',
    team: 32,
    option: 'vòng tròn'
}


const listTeams = [];

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
            <div className='wrapper-content'>
                <div className='radio-button'>
                    <Tabs type="card" defaultActiveKey={1}>
                        <TabPane tab="Thông tin chung" key="1" >
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
                                        label='Logo mùa giải'
                                        name='img'
                                        // rules={[{ required: true, message: 'Image required' }]}
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
                                        <Col xs={8}>
                                            <Button 
                                                className='button-confirm'
                                                size='large'
                                                style={{
                                                    background: 'green'
                                                }}
                                            >
                                                Tạo trận
                                            </Button>
                                        </Col>
                                        <Col xs={8}>
                                            <Button 
                                                className='button-confirm'
                                                value='confirm'
                                                htmlType='submit'
                                                size='large'
                                            >
                                                {data?.type === 'create' ? 'Create' : 'Edit'}
                                            </Button>
                                        </Col>
                                        <Col xs={8}>
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
                        </TabPane>
                        <TabPane tab="Danh sách đội bóng" key="2" >
                        <Row >
                            {
                                listTeams?.map((item, idx) => (
                                    <Col xs={6}>
                                        <Card data={item} type="team" to={`/team/${item.id}`} key={idx}></Card>
                                    </Col>
                                ))
                            }
                        </Row>
                        </TabPane>
                        <TabPane tab="Lịch thi đấu" key="3" >
                            <Match></Match>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default DetailChampion;