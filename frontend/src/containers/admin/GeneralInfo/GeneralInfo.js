import moment from "moment";
const GeneralInfo = (data) => {
    return (
        <div className="wrapper-info">
            <p>Huấn luyện viên: {data?.data?.coach}</p>
            <p>Số lượng cầu thủ: 22</p>
            <p>Năm thành lập: {moment(Date.now()).local().format('YYYY:MM:DD hh:mm')}</p>
            <p>Số lần vô địch: {Math.floor(Math.random() * 10)}</p>
        </div>
    )
}

export default GeneralInfo;