import './index.css'
import {
  Pagination,
} from 'react-bootstrap'

export default function PaginationCompoment(props) {
  const last_page = Math.ceil(props.total / props.pageSize)
  const action = (page) => () =>{
      console.log(page)
    props.action && props.action({
        page,
        pageSize: props.pageSize,
    })
  }
  return (
    <Pagination>
        {props.page !== 1 && [<Pagination.First onClick={action(1)} />,
            <Pagination.Prev onClick={action(props.page-1)} />,
            <Pagination.Item onClick={action(1)} >{1}</Pagination.Item>]}
        {(props.page  === 4 || props.page === 3) && <Pagination.Item onClick={action(2)}>{2}</Pagination.Item>}
        {props.page === 4 && <Pagination.Item onClick={action(3)}>{3}</Pagination.Item>}
        {props.page > 4 && [<Pagination.Ellipsis disabled />,
            <Pagination.Item onClick={props.page-2}>{props.page-2}</Pagination.Item>,
            <Pagination.Item onClick={action(props.page-1)}>{props.page-1}</Pagination.Item>]}
        <Pagination.Item active>{props.page}</Pagination.Item>
        {props.page < last_page - 4 && [<Pagination.Item onClick={action(props.page+1)}>{props.page+1}</Pagination.Item>,
            <Pagination.Item onClick={action(props.page+2)}>{props.page+2}</Pagination.Item>,
            <Pagination.Ellipsis disabled />]}
        {props.page  === last_page - 3 && <Pagination.Item onClick={action(last_page - 2)}>{last_page - 2}</Pagination.Item>}
        {(props.page === last_page - 3 || props.page === last_page - 2) && <Pagination.Item onClick={action(last_page - 1)}>{last_page - 1}</Pagination.Item>}
        {props.page !== last_page && [<Pagination.Item onClick={action(last_page)}>{last_page}</Pagination.Item>,
            <Pagination.Next onClick={action(props.page+1)} />,
            <Pagination.Last onClick={action(last_page)} />]}
        {/* <Form.Select aria-label={props.pageSize} style={{width: "70px", marginLeft: "20px"}}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
        </Form.Select> */}
    </Pagination>
  );
}