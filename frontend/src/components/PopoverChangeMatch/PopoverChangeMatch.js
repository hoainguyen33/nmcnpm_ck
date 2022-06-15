import { Popover, Button, Input, Form } from "antd";
import { useState } from 'react';
import axiosClient from "../../api/axiosClient";
import { openNotification } from "../Notification/Notification";
const PopoverChangeMatch = (data) => {
    const [visible, setVisible] = useState(false);
    const hide = () => {
        setVisible(false);
      };
    
      const handleVisibleChange = (newVisible) => {
        setVisible(newVisible);
      };
    return (
        <Popover
            content={Content(data?.data, hide)}
            title="Chỉnh sửa tỉ số"
            trigger="click"
            visible={visible}
            onVisibleChange={handleVisibleChange}
        >
            <Button type="primary">{data?.data?.result}</Button>
        </Popover>
    )
}
const Content = (data, hide) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    console.log('content: ', data);
    const handleChangeResult = (values) => {
        axiosClient.put(`update-match-result/${data?.id}`, {
            result: values.result
        }).then(() => {
            openNotification('success', 'Cập nhật tỉ số thành công!')
            hide()
        }).catch(() => {
            openNotification('error', 'Cập nhật tỉ số thất bại')
            hide()
        })
    }
    return ( 
        <Form form={form} onFinish={handleChangeResult}>
            <div style={{
                display: 'flex',
                justifyContent: 'center'
            }}>
            <Form.Item name="result" noStyle>
                <Input placeholder="Tỉ số" type="text" style={{width: 120}} />
            </Form.Item>
        <Button 
            loading={loading} 
            type="primary"
            htmlType="submit"
            style={{width: 100}} 
            size='middle'>Chỉnh sửa</Button></div>
        </Form>
    )
}

export default PopoverChangeMatch;