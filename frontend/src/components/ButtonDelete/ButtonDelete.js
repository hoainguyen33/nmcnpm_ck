import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ShowConfirmDelete } from '../ModalConfirm/ModalConfirm';
const ButtonDelete = (data) => {
   
    const handleClick = () => {
        ShowConfirmDelete({
            title: 'Bạn chắc chắn muốn xóa nó ?',
            content: "Hãy kiểm tra lại lần nữa！",
            onOK: () => handleDelete(data.id)
        })
    }
    const handleDelete = () => {
        console.log("delete");
    }
    return (
        <>
            <Button 
                style={{
                    border: 'none',
                    background: 'transparent',
                }}
                icon={<DeleteOutlined size={20} style={{color: 'red'}}/>}
                onClick={handleClick}
            >
            </Button>
        </>
        
    )
}
export default ButtonDelete;