import { Space, Button } from 'antd';
import ButtonEdit from '../../components/ButtonEdit/ButtonEdit';
import ButtonDelete from '../../components/ButtonDelete/ButtonDelete';

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
        dataIndex: 'avatar',
        key: 'avatar',
        align: 'center',
        render: (value, record) => {
            return (
                <img src={value} style={{width: '50px', height: 'auto'}}/>
            )
        }
    }, {
        title: 'Sex',
        dataIndex: 'sex',
        key: 'sex',
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
        title: 'yearJoining',
        dataIndex: 'yearJoining',
        key: 'yearJoining',
        align: 'center',
        render: (value, record) => {
            return (
                <span>{value}</span>
            )
        }
    }, {
        title: 'Born',
        dataIndex: 'born',
        key: 'born',
        align: 'center',
        render: (value, record) => {
            return (
                <span>{value}</span>
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
        dataIndex: 'logo',
        key: 'logo',
        align: 'center',
        render: (value, record) => {
            return (
                <img src={value} style={{width: '50px', height: 'auto'}}/>
            )
        }
    }, {
        title: 'Team 1',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        render: (value, record) => {
            return (
                <span>{value}</span>
            )
        }
    }, {
        title: 'VS',
        dataIndex: 'vs',
        key: 'vs',
        align: 'center',
        render: (value, record) => {
            return (
                <span>vs</span>
            )
        }
    }, {
        title: 'Logo 2',
        dataIndex: 'logoCompetitor',
        key: 'logoCompetitor',
        align: 'center',
        render: (value, record) => {
            return (
                <img src={value} style={{width: '50px', height: 'auto'}}/>
            )
        }
    }, {
        title: 'Team 2',
        dataIndex: 'competitor',
        key: 'competitor',
        align: 'center',
        render: (value, record) => {
            return (
                <span>{value}</span>
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
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        align: 'center',
        render: (value, record) => {
            return (
                <span>{value}</span>
            )
        }
    }
]