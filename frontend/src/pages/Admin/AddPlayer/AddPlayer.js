import './AddPlayer.scss';
import { Form, Select, Row, Col, Button } from 'antd';
import axiosClient from '../../../api/axiosClient';
import useSWR from 'swr';
import { fetcher } from '../../../api/swr';
import { useState, useEffect } from 'react';
const { Option } = Select;

const AddPlayer = () => {
    const queryParams = new URLSearchParams(window.location.search)
    const id = queryParams.get("teamId")
    const [listPlayers, setListPlayers] = useState([])
    const { data: players } = useSWR('/players', fetcher);
    const { data: currPlayers } = useSWR(`/get-team/${id}`, fetcher);
    console.log(players, currPlayers);

    // useEffect(() => {
    //     const pls = players?.result;
    //     const curPls = currPlayers?.result?.players;
    //     for(let i = 0; i < pls?.length; i++ ) {
    //         for(let j = 0; j < curPls?.length; j++ ) {
    //             if(pls[i].id === curPls[j].id) {
    //                 pls[i].splice(i, 1);
    //                 setListPlayers(pls)
    //             }
    //         }
    //     }
    // }, [players, currPlayers])
    const handleAddPlayer = (value) => {
        console.log(listPlayers)
    }
    return (
        <div className='add-player-wrapper'>
            <h2>Thêm Cầu thủ vào đội bóng</h2>
            <Form
                layout='vertical'
                onFinish={handleAddPlayer}
            >
                <Form.Item
                    label='Cầu thủ'
                    name='group_ids'
                    rules={[{ required: true, message: 'Player is requied!' }]}
                    >
                    {listPlayers && listPlayers?.length > 0 ? (
                        <Select
                        showSearch
                        placeholder='chọn cầu thủ'
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
                        {listPlayers.data.map((item) => (
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
                    ) : (
                        <span>
                        ※None players.
                        </span>
                    )}
                    </Form.Item>
                    <Form.Item>
                        <Row>
                            <Col xs={12} style={{ textAlign: 'center' }}>
                                <Button
                                    className='button-cancel'
                                    size='large'
                                >
                                    Hủy
                                </Button>
                            </Col>
                            <Col xs={12} style={{ textAlign: 'center' }}>
                                <Button
                                    className='button-confirm'
                                    value='confirm'
                                    htmlType='submit'
                                    size='large'
                                >
                                    Thêm cầu thủ
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>
            </Form>
        </div>
    )
}

export default AddPlayer;