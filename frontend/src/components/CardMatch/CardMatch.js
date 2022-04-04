
import './CardMatch.style.scss';
import { Row, Col, Modal } from 'antd';
import { useState } from 'react';
const CardMatch = (data) => {
    const [visible, setVisible] = useState(false);

    const handleClick = () => {
        setVisible(true);
    }
    const handleCancel = () => {
        setVisible(false);
    }
    return (
        <>
            <div className="wrapper-match" onClick={handleClick}>
                <Row justify='center'>
                    <Col xs={24}>
                        <p>{data.data?.time}</p>
                    </Col>
                    <Col xs={24}>
                        <Row justify='center'>
                            <Col xs={8} style={{margin: 'auto'}}>
                                <Row>
                                    <Col xs={24}>
                                        <img src={data.data?.logo1}/>
                                    </Col>
                                    <Col xs={24}>
                                        <span style={{fontSize: '15px', fontWeight: '600'}}>{data.data?.team1}</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={8} style={{margin: 'auto'}}>
                                <Row>
                                    <Col xs= {24}>
                                        <p style={{fontSize: '30px', fontWeight: '600'}}>{data.data?.score}</p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={8} style={{margin: 'auto'}}>
                                <Row>
                                    <Col xs={24}>
                                        <img src={data.data?.logo2}/>
                                    </Col>
                                    <Col xs={24}>
                                        <span style={{fontSize: '15px', fontWeight: '600'}}>{data.data?.team2}</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs= {24}>
                                <p style={{fontSize: '20px', fontWeight: '600'}}>{data.data?.pitch}</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            <Modal 
            visible={visible} 
            onCancel={handleCancel}
            footer={false}
            >  
                
            </Modal>
        </>
    )
}
export default CardMatch;