import { Space } from 'antd';
import ButtonEdit from '../../components/ButtonEdit/ButtonEdit';
import ButtonDelete from '../../components/ButtonDelete/ButtonDelete';
import PopoverChangeMatch from '../../components/PopoverChangeMatch/PopoverChangeMatch';

export const columns = [
    {
        title: 'Match',
        dataIndex: 'id',
        key: 'id',
        width: 100,
        align: 'center',
        render: (value, record) => {
            return (
                <span>{value}</span>
            )
        }
    }, {
        title: 'Logo1',
        dataIndex: 'logo1',
        key: 'logo1',
        align: 'center',
        render: (value, record) => {
            return (
                <img src={value} style={{width: '50px', height: 'auto'}}/>
            )
        }
    }, {
        title: 'Team 1',
        dataIndex: 'team1',
        key: 'team1',
        align: 'center',
        render: (value, record) => {
            return (
                <span>{value}</span>
            )
        }
    }, {
        title: 'Score',
        dataIndex: 'score',
        key: 'score',
        align: 'center',
        render: (value, record) => {
            return (
                <span>{value}</span>
            )
        }
    }, {
        title: 'Team 2',
        dataIndex: 'team2',
        key: 'team2',
        align: 'center',
        render: (value, record) => {
            return (
                <span>{value}</span>
            )
        }
    }, {
        title: 'Logo 2',
        dataIndex: 'logo2',
        key: 'logo2',
        align: 'center',
        render: (value, record) => {
            return (
                <img src={value} style={{width: '50px', height: 'auto'}}/>
            )
        }
    }, {
        title: 'Pitch',
        dataIndex: 'pitch',
        key: 'pitch',
        align: 'center',
        render: (value, record) => {
            return (
                <span>{value}</span>
            )
        }
    }, {
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
        align: 'center',
        render: (value, record) => {
            return (
                <span>{value}</span>
            )
        }
    } , {
        title: () => <span></span>,
        key: 'button',
        align: 'right',
        width: '10%',
        render: (value, record) => {
            return (
                <Space>
                    <ButtonEdit data={record}>Edit</ButtonEdit>
                    <ButtonDelete data={record}>Delete</ButtonDelete>
                </Space>
            )
        } 
    }
]

export const columnPlayers = [
    {
        title: 'Player',
        dataIndex: 'id',
        key: 'id',
        width: 100,
        align: 'center',
        render: (value, record) => {
            return (
                <span>{value}</span>
            )
        }
    },{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        render: (value, record) => {
            return (
                <span>{value}</span>
            )
        }
    }, {
        title: 'Avatar',
        dataIndex: 'logo',
        key: 'logo',
        align: 'center',
        render: (value, record) => {
            return (
                <img src={value?.indexOf("http") > 0 ? value : '/hidden.jpeg'} style={{width: '50px', height: 'auto'}}/>
            )
        }
    }, {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        align: 'center',
        render: (value, record) => {
            return (
                <span>{value}</span>
            )
        }
    }, {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        align: 'center',
        render: (value, record) => {
            return (
                <span>{value}</span>
            )
        }
    }, {
        title: 'Position',
        dataIndex: 'position',
        key: 'position',
        align: 'center',
        render: (value, record) => {
            return (
                <span>{value}</span>
            )
        }
    }, {
        title: 'Height',
        dataIndex: 'height',
        key: 'height',
        align: 'center',
        render: (value, record) => {
            return (
                <span>{value}</span>
            )
        }
    },{
        title: 'Weight',
        dataIndex: 'weight',
        key: 'weight',
        align: 'center',
        render: (value, record) => {
            return (
                <span>{value}</span>
            )
        }
    }, {
        title: 'Point',
        dataIndex: 'point',
        key: 'point',
        align: 'center',
        render: (value, record) => {
            return (
                <span>{value} ⭐️</span>
            )
        }
    }
]

export const columnSchedule = [
    {
        title: 'Match',
        dataIndex: 'id',
        key: 'id',
        width: 100,
        align: 'center',
        render: (value, record) => {
            return (
                <span>{value}</span>
            )
        }
    }, {
        title: 'Logo1',
        dataIndex: 'first_team',
        key: 'logo1',
        align: 'center',
        render: (value, record) => {
            return (
                <img src={value?.logo?.indexOf("http") < 0 ? value?.logo : '/default-team-logo.png'} style={{width: '50px', height: 'auto'}}/>
            )
        }
    }, {
        title: 'Team 1',
        dataIndex: 'first_team',
        key: 'name',
        align: 'center',
        render: (value, record) => {
            return (
                <span>{value?.name}</span>
            )
        }
    }, {
        title: 'VS',
        dataIndex: 'result',
        key: 'result',
        align: 'center',
        render: (value, record) => {
            return (
                <PopoverChangeMatch data={record} ></PopoverChangeMatch>
            )
        }
    }, {
        title: 'Logo 2',
        dataIndex: 'second_team',
        key: 'logo2',
        align: 'center',
        render: (value, record) => {
            return (
                <img src={value?.logo?.indexOf("http") < 0 ? value?.logo : '/default-team-logo.png'} style={{width: '50px', height: 'auto'}}/>
            )
        }
    }, {
        title: 'Team 2',
        dataIndex: 'second_team',
        key: 'name2',
        align: 'center',
        render: (value, record) => {
            return (
                <span>{value?.name}</span>
            )
        }
    }, {
        title: 'Match Day',
        dataIndex: 'match_day',
        key: 'match_day',
        align: 'center',
        render: (value, record) => {
            return (
                <span>{value}</span>
            )
        }
    }
]