import './index.css'
import {
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Description from './Description.component'

export default function LinkCompoment(props) {
  return (
    <OverlayTrigger
    placement="bottom"
    overlay={<Tooltip id="button-tooltip-2" ><Description {...props.description} /></Tooltip>}
  >
    {({ ref, ...triggerHandler }) => (
      <span
        variant="light"
        {...triggerHandler}
        className="d-inline-flex align-items-center"
      >
        {props.beforTitle}
        <Link
          ref={ref}
          roundedCircle
          to={props.to}
        >
        {props.hoverTitle}
        </Link>
        {props.afterTitle}
      </span>
    )}
  </OverlayTrigger>
  );
}