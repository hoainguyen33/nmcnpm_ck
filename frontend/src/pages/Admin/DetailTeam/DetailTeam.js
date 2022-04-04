
import './DetailTeam.style.scss';

const data = {
    id: 1,
    name: 'Manchester United', 
    img: './logoMu.jpeg',
    bg: './bgMu.jpeg',
    pitch: 'Old Trafford',
    coach: 'Sir Alex',
}

const DetailTeam = () => {
    const queryParams = new URLSearchParams(window.location.search)
    const term = queryParams.get("teamId")
    return (
        <div className="wrapper-detail-team">
            <h1>Thông tin chi tiết đội bóng</h1>
            <img src={data.bg}/>
            <img src={data.img}/>
            <p>{data.coach}</p>
            <p>{data.pitch}</p>
        </div>
    )
}
export default DetailTeam;