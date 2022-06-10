import { useState, useEffect } from 'react';
import { Drawer} from "antd";;


const DrawerWrapper = (data) => {
    const [show, setShow] = useState(data.display);

    useEffect(() => {
        setShow(data.display)
        return ()=>{
          // end  
        }
    }, [data.display])

    const handleClose = () => {
        setShow(false);
        data.setDisplay(false)
    }
    return (
        <>
            <Drawer
                width={'500'}
                placement='right'
                closable={false}
                title={data.title}
                visible={show}
                onClose={handleClose}
                destroyOnClose
                footer={null}
            >
                {data.child}
            </Drawer>
        </>
    )
}

export default DrawerWrapper;