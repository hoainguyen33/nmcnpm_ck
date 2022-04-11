import './CardPlayer.style.scss';
import { useState } from 'react';
import { Modal } from 'antd';

const CardPlayer = (data) => {
    const [visible, setVisible] = useState(false)

    const handleClickCard = (value) => {
        setVisible(true);
    }
    const onCancel = () => {
        setVisible(false); 
    }
    return (
        <>
            <div className="main-card" onClick={handleClickCard}>
                <img src={data?.data.avatar}/>
                <div className='name-pos'>
                    <div>{data?.data?.name}</div>
                    <div>{data?.data?.position}</div>
                </div>
                <h1>{data?.data?.number}</h1>
                <p>{data?.data?.team}</p>
            </div>
            <Modal visible={visible} onCancel={onCancel} footer={false} >
                <div className="modal-card" >
                    <img src={data?.data.avatar}/>
                    <div className='name-pos'>
                        <div>{data?.data?.name}</div>
                        <div>{data?.data?.position}</div>
                    </div>
                    <h1>{data?.data?.number}</h1>
                    <p>{data?.data?.team}</p>
                    <p>Full name: {data?.data?.fullname}</p>
                    <p>Born: {data?.data?.when}</p>
                    <p>National: {data?.data?.national}</p>
                </div>
            </Modal>
        </>
        
    )
}

export default CardPlayer;