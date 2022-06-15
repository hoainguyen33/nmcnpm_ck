import './Rank.scss';

const Rank = (data) => {

    return (
        <div>
            <div class ="card-rank" style={{fontSize: '18px', background: 'orange', color: 'white'}}>
                <div><b>Rank</b></div>
                <div><b>Đội bóng</b></div>
                <div><b>Logo</b></div>
                <div><b>Điểm</b></div>
            </div>  
            {data?.data && data?.data.map((item, index) => {
                return (
                        <div class ="card-rank" key={index}>
                            <div>{index + 1}</div>
                            <div>{item?.name}</div>
                            <img src={item?.logo?.indexOf("http") ? item?.logo : '/default-team-logo.png'}/>
                            <div>{item?.total_points}</div>
                        </div>  
                    )
                })
            }
        </div>
    )
}

export default Rank;
