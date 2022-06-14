
import { Row, Col, Button, Table } from 'antd';
import './Match.style.scss'
import { columnSchedule } from '../../../constants/data/column';


const Match = (data) => {
    console.log('match:', data?.data)
    return(
        <div>
            <div
                className='header'
            >
                <div className='title'>Danh sách trận đấu</div>
            </div>
            <div className='content-match'>
                <Table
                dataSource={data?.data}
                columns={columnSchedule}
                style={{
                    border: '2px solid blue',
                    padding: '5px'
                }}
                scroll={{
                    x: '100%',
                    y: 'calc(100vh - 230px)'
                  }}
                ></Table>
            </div>
        </div>
    )
}

export default Match;