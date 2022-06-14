import './CardPlayer.style.scss';
import { useState } from 'react';
import { Modal } from 'antd';

const CardPlayer = (data) => {
    console.log('data: ', data)
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
                <img src={data?.data?.image?.indexOf('http') ? data?.data?.image : '/hidden.jpeg'}/>
                <div className='name-pos'>
                    <div>{data?.data?.name}</div>
                </div>
                <div>{data?.data?.position}</div>
                <p>{data?.data?.point}</p>
                <p>{data?.data?.team?.name ?? 'Tự do'}</p>
            </div>
            <Modal visible={visible} onCancel={onCancel} footer={false} >
                <div className="modal-card" >
                    <img src={data?.data?.image?.indexOf('http') ? data?.data?.image : '/hidden.jpeg'}/>
                    <p><b>Team</b>: {data?.data?.team?.name ?? 'Tự do'}</p>

                    <div className='name-pos'>
                        <div>{data?.data?.name}</div>
                    </div>
                    <p><b>Position</b>: {data?.data?.position}</p>
                    <p><b>Gender</b>: {data?.data?.gender}</p>
                    <p><b>Age</b>: {data?.data?.age}</p>
                    <p><b>Height</b>: {data?.data?.height}</p>
                    <p><b>Weight</b>: {data?.data?.gender}</p>
                </div>
            </Modal>
        </>
        
    )
}

export default CardPlayer;