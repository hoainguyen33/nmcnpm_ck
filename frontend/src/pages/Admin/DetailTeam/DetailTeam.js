
import './DetailTeam.style.scss';
import { Radio, Row, Col, Tabs, Result } from 'antd';
import GeneralInfo from '../../../containers/admin/GeneralInfo/GeneralInfo';
import ListPlayers from '../../../containers/admin/ListPlayers/ListPlayers';
import ListMatchs from '../../../containers/admin/ListMatchs/ListMatch';
import useSWR from 'swr';
import { fetcher } from '../../../api/swr';
const { TabPane } = Tabs;

const DetailTeam = () => {
    const queryParams = new URLSearchParams(window.location.search)
    const id = queryParams.get("teamId")
    const {data: dataTeams} = useSWR(`get-team/${id}`, fetcher)
    console.log('data team: ', dataTeams);
    return (
        <div className="wrapper-detail-team">
            <div className='top-banner'>
                <img className='background' src={'/bgMu.jpeg'}/>
                <div className='profile'>
                    <img className='avatar' src={dataTeams?.result?.team_info?.logo?.indexOf('http') ? dataTeams?.result?.team_info?.logo : '/default-team-logo.png'}/>
                    <div className='title'>
                        <p>{dataTeams?.result?.team_info?.name}</p>
                    </div>
                </div>
            </div>
            <div className='wrapper-content'>
                <div className='radio-button'>
                    <Tabs type="card" defaultActiveKey={1}>
                        <TabPane tab="Thông tin chung" key="1" >
                            <GeneralInfo data={dataTeams?.result?.team_info}></GeneralInfo>
                        </TabPane>
                        <TabPane tab="Cầu thủ" key="2" >
                            <ListPlayers data={dataTeams?.result?.players}></ListPlayers>
                        </TabPane>
                        <TabPane tab="Lịch thi đấu" key="3">
                            <ListMatchs data={dataTeams?.result?.matches}></ListMatchs>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
export default DetailTeam;