export const showNotification = (api, type, message, description) => {
    let style = {};

    if (type === 'success') {
        style = {
            backgroundColor: '#f0f0f0',
            border: '1px solid #28a745',
            borderRadius: '8px'
        };
    } else if (type === 'error') {
        style = {
            backgroundColor: '#f0f0f0',
            border: '1px solid #dc3545',
            borderRadius: '8px'
        };
    }

    api[type]({
        message,
        description,
        style
    });
};
