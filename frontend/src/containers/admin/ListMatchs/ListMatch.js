import { Table } from 'antd';
import { columnSchedule } from '../../../constants/data/column';

const ListMatchs = (data) => {
    return (
        <div>
            <Table
                columns={columnSchedule}
                dataSource={data?.data}
            >
            </Table>
        </div>
    )
}

export default ListMatchs;