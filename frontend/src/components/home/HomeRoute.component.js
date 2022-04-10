import './HomeRoute.style.css'
import { Link } from 'react-router-dom'

const HomeRoute = (props) =>
    <div className="home-route">
    { props.paths.map((e, i)=>
        <span>
            <Link to={e.path}>
                {e.title}
            </Link>
            {i + 1 !== props.paths.length && " > "}
        </span>) }
    </div>

export default HomeRoute