import './Rank.scss';

const Rank = (data) => {

    return (
        <div>
            {data?.data.map((item, index) => {
                return (
                        <div key={index}>{item}</div>
                    )
                })
            }
        </div>
    )
}

export default Rank;
