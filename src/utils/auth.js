export const LocalStorageEventTarget = new EventTarget();

export const clearLS = () => {
    localStorage.removeItem('user');
    const clearLSEvent = new Event('clearLS');
    LocalStorageEventTarget.dispatchEvent(clearLSEvent);
};

export const getUserFromLS = () => {
    const result = localStorage.getItem('user');
    return result ? JSON.parse(result) : null;
};

export const setUserToLS = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};
