import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import DrawerWrapper from '../drawer/drawer';
import FormMatch from '../../containers/admin/FormMatch/FormMatch';
import { useState } from 'react';

const ButtonEdit = (data) => {
    const [visible, setVisible] = useState(false);
    const handleClick = () => {
        setVisible(true);
    }
    
    return (
        <>
            <Button 
                style={{
                    border: 'none',
                    background: 'transparent',
                }}
                icon={<EditOutlined size={20} style={{color: 'blue'}}/>}
                onClick={handleClick}
            >
            </Button>
            <DrawerWrapper 
                display={visible}
                setDisplay={setVisible}
                child={<FormMatch initialValue={data.data} setDisplay={setVisible} type='edit'/>}
            />
        </>
    )
}
export default ButtonEdit;