import './index.css'
import {
  Container,
  Table,
} from 'react-bootstrap'
import Pagination from './Pagination.component'
import Link from './Link.component'

export default function TableCompoment(props) {
  return (
    <Container>
      <Table
        striped
        bordered
        hover
        >
        <thead>
            <tr>
            { props.columns &&
              props.columns.map(e=><th class="text-center" align="center">{e.value}</th>)
            }
            </tr>
        </thead>
        <tbody>
            { props.columns && props.data &&
              props.data.map(e=><tr>
                  {props.columns.map(i=>
                    i.link ?
                    <td>
                      <Link
                        beforTitle={e[i.key].befor_title}
                        afterTitle={e[i.key].after_title}
                        hoverTitle={e[i.key].hover_title}
                        description={e[i.key].description}
                        to={e[i.key].path+e[i.key].id}
                        />
                      </td> :
                    <td>{e[i.key]}</td>
                  )
                }
                </tr>
              )
            }
        </tbody>
      </Table>
      {props.page &&
        <Pagination action={props.action} page={props.page} pageSize={props.pageSize} total={props.total} />
      }
    </Container>
  );
}