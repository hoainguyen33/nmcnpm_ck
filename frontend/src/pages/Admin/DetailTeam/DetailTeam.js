
import './DetailTeam.style.scss';
import { Radio, Row, Col, Tabs } from 'antd';
import GeneralInfo from '../../../containers/admin/GeneralInfo/GeneralInfo';
import ListPlayers from '../../../containers/admin/ListPlayers/ListPlayers';
import ListMatchs from '../../../containers/admin/ListMatchs/ListMatch';

const { TabPane } = Tabs;

const data = {
    id: 1,
    name: 'Manchester United', 
    img: './logoMu.jpeg',
    bg: './bgMu.jpeg',
    pitch: 'Old Trafford',
    coach: 'Sir Alex',
    players: 30,
    year: '20/01/1900',
    champions: 300,
    playerList: [
        {
            id: 1,
            name: 'Ronaldo', 
            born: '1985',
            sex: 'male',
            yearJoining: 20,
            age: 37,
            avatar: './ronaldo.webp'
        }, {
            id: 2,
            name: 'Ronaldo', 
            born: '1985',
            sex: 'male',
            yearJoining: 20,
            age: 37,
            avatar: './ronaldo.webp'
        }, {
            id: 3,
            name: 'Ronaldo', 
            born: '1985',
            sex: 'male',
            yearJoining: 20,
            age: 37,
            avatar: './ronaldo.webp'
        },{
            id: 4,
            name: 'Ronaldo', 
            born: '1985',
            sex: 'male',
            yearJoining: 20,
            age: 37,
            avatar: './ronaldo.webp'
        }, {
            id: 5,
            name: 'Ronaldo', 
            born: '1985',
            sex: 'male',
            yearJoining: 20,
            age: 37,
            avatar: './ronaldo.webp'
        }, {
            id: 6,
            name: 'Ronaldo', 
            born: '1985',
            sex: 'male',
            yearJoining: 20,
            age: 37,
            avatar: './ronaldo.webp'
        },{
            id: 7,
            name: 'Ronaldo', 
            born: '1985',
            sex: 'male',
            yearJoining: 20,
            age: 37,
            avatar: './ronaldo.webp'
        }
    ],
    schedules: [
        {
            id: 1,
            date: '20/12/2022',
            logo: './logoMu.jpeg',
            name: 'Manchester United',
            competitor: 'Chelsea',
            logoCompetitor: './logo.png',
            pitch: 'Old Trafford'
        },{
            id: 2,
            date: '20/12/2022',
            logo: './logoMu.jpeg',
            name: 'Manchester United',
            competitor: 'Chelsea',
            logoCompetitor: './logo.png',
            pitch: 'Old Trafford'
        },
        {
            id: 3,
            date: '20/12/2022',
            logo: './logoMu.jpeg',
            name: 'Manchester United',
            competitor: 'Chelsea',
            logoCompetitor: './logo.png',
            pitch: 'Old Trafford'
        },{
            id: 4,
            date: '20/12/2022',
            logo: './logoMu.jpeg',
            name: 'Manchester United',
            competitor: 'Chelsea',
            logoCompetitor: './logo.png',
            pitch: 'Old Trafford'
        },{
            id: 5,
            date: '20/12/2022',
            logo: './logoMu.jpeg',
            name: 'Manchester United',
            competitor: 'Chelsea',
            logoCompetitor: './logo.png',
            pitch: 'Old Trafford'
        },{
            id: 6,
            date: '20/12/2022',
            logo: './logoMu.jpeg',
            name: 'Manchester United',
            competitor: 'Chelsea',
            logoCompetitor: './logo.png',
            pitch: 'Old Trafford'
        },{
            id: 7,
            date: '20/12/2022',
            logo: './logoMu.jpeg',
            name: 'Manchester United',
            competitor: 'Chelsea',
            logoCompetitor: './logo.png',
            pitch: 'Old Trafford'
        },{
            id: 8,
            date: '20/12/2022',
            logo: './logoMu.jpeg',
            name: 'Manchester United',
            competitor: 'Chelsea',
            logoCompetitor: './logo.png',
            pitch: 'Old Trafford'
        },{
            id: 9,
            date: '20/12/2022',
            logo: './logoMu.jpeg',
            name: 'Manchester United',
            competitor: 'Chelsea',
            logoCompetitor: './logo.png',
            pitch: 'Old Trafford'
        },{
            id: 10,
            date: '20/12/2022',
            logo: './logoMu.jpeg',
            name: 'Manchester United',
            competitor: 'Chelsea',
            logoCompetitor: './logo.png',
            pitch: 'Old Trafford'
        },{
            id: 11,
            date: '20/12/2022',
            logo: './logoMu.jpeg',
            name: 'Manchester United',
            competitor: 'Chelsea',
            logoCompetitor: './logo.png',
            pitch: 'Old Trafford'
        },{
            id: 12,
            date: '20/12/2022',
            logo: './logoMu.jpeg',
            name: 'Manchester United',
            competitor: 'Chelsea',
            logoCompetitor: './logo.png',
            pitch: 'Old Trafford'
        }
    ]
}

const DetailTeam = (props) => {
    // const queryParams = new URLSearchParams(window.location.search)
    // const term = queryParams.get("teamId")
    const term = props.match.params.id
    return (
        <div className="wrapper-detail-team">
            <div className='top-banner'>
                <img className='background' src={data.bg}/>
                <div className='profile'>
                    <img className='avatar' src={data.img}/>
                    <div className='title'>
                        <p>{data.name}</p>
                        <span>{data.pitch}</span>
                    </div>
                </div>
            </div>
            <div className='wrapper-content'>
                <div className='radio-button'>
                    <Tabs type="card" defaultActiveKey={1}>
                        <TabPane tab="Thông tin chung" key="1" >
                            <GeneralInfo data={data}></GeneralInfo>
                        </TabPane>
                        <TabPane tab="Cầu thủ" key="2" >
                            <ListPlayers data={data.playerList}></ListPlayers>
                        </TabPane>
                        <TabPane tab="Lịch thi đấu" key="3">
                            <ListMatchs data={data.schedules}></ListMatchs>
                        </TabPane>
                        <TabPane tab="Thống kê" key="4">
                            <div>Trang thống kê</div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
export default DetailTeam;