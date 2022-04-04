
import { Row, Col, Button, Table } from 'antd';
import './Match.style.scss'
import { columns } from '../../../constants/data/column';
const data = [
    {
        id: 1,
        pitch: 'Old Trafford',
        team1: 'Manchester United',
        team2: 'Chelsea',
        score: '0 - 0',
        logo1: './logoMu.jpeg',
        logo2: 'logo.png',
        time: '2022/11/12 20:10'
    } , {
        id: 2,
        pitch: 'Old Trafford',
        team1: 'Manchester United',
        team2: 'Chelsea',
        score: '0 - 0',
        logo1: './logoMu.jpeg',
        logo2: 'logo.png',
        time: '2022/11/12 20:10'
    } , {
        id: 3,
        pitch: 'Old Trafford',
        team1: 'Manchester United',
        team2: 'Chelsea',
        score: '0 - 0',
        logo1: './logoMu.jpeg',
        logo2: 'logo.png',
        time: '2022/11/12 20:10'
    }, {
        id: 4,
        pitch: 'Old Trafford',
        team1: 'Manchester United',
        team2: 'Chelsea',
        score: '0 - 0',
        logo1: './logoMu.jpeg',
        logo2: 'logo.png',
        time: '2022/11/12 20:10'
    }, {
        id: 5,
        pitch: 'Old Trafford',
        team1: 'Manchester United',
        team2: 'Chelsea',
        score: '0 - 0',
        logo1: './logoMu.jpeg',
        logo2: 'logo.png',
        time: '2022/11/12 20:10'
    }
]

const Match = () => {
    return(
        <div>
            <div
                className='header'
            >
                <div className='title'>Danh sách trận đấu</div>
            </div>
            {/* <div className='content-match'>
                {data.map((item, idx) => (
                    <CardMatch key={idx} data={item}/>
                ))}
            </div> */}
            <div className='content-match'>
                <Table
                dataSource={data}
                columns={columns}
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