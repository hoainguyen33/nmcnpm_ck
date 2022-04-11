import { notification } from 'antd';

export const openNotification = (type, description) => {
    notification[type]({
        // message: type,
        description,
        duration: 7,
        placement: 'topRight',
    });
};