const GeneralInfo = (data) => {
    return (
        <div className="wrapper-info">
            <p>Huấn luyện viên: {data?.data?.coach}</p>
            <p>Số lượng cầu thủ: {data?.data?.players}</p>
            <p>Năm thành lập: {data?.data?.year}</p>
            <p>Số lần vô địch: {data?.data?.champions}</p>
        </div>
    )
}

export default GeneralInfo;