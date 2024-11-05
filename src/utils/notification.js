import { notification } from 'antd';

export const showNotification = (type, message, description) => {
    let style = {};
    const duration = 3;

    if (type === 'success') {
        style = {
            position: 'relative',
            backgroundColor: '#f0f0f0',
            border: '1px solid #28a745',
            borderRadius: '8px',
            zIndex: 100
        };
    } else if (type === 'error') {
        style = {
            position: 'relative',
            backgroundColor: '#f0f0f0',
            border: '1px solid #e74c3c',
            borderRadius: '8px',
            zIndex: 100
        };
    }

    notification[type]({
        message,
        description,
        style,
        duration
    });
};
