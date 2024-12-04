import { notification } from 'antd';

export const showNotification = (
    type,
    message,
    description,
    placement = 'top'
) => {
    let style = {};
    const duration = 4;

    if (type === 'success') {
        style = {
            fontFamily: 'Lexend, sans-serif',
            position: 'relative',
            backgroundColor: '#FFFFFF',
            border: '1px solid #52c41a',
            borderRadius: '8px',
            zIndex: 100
        };
    } else if (type === 'error') {
        style = {
            fontFamily: 'Lexend, sans-serif',
            position: 'relative',
            backgroundColor: '#FFFFFF',
            border: '1px solid #ff4d4f',
            borderRadius: '8px',
            zIndex: 100
        };
    }

    notification[type]({
        message,
        description,
        style,
        duration,
        placement
    });
};
