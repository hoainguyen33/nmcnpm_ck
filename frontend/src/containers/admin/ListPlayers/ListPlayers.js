import { Table } from 'antd';
import { columnPlayers } from '../../../constants/data/column';

const ListPlayers = (data) => {
    return (
        <div>
            <Table
                columns={columnPlayers}
                dataSource={data?.data}
            >
            </Table>
        </div>
    )
}

export default ListPlayers;