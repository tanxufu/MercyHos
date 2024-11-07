/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';
import { getUserFromLS } from '../utils/auth';

const AppContext = createContext({
    isAuthenticated: Boolean(getUserFromLS()),
    setIsAuthenticated: () => {},
    user: getUserFromLS(),
    setUser: () => {},
    reset: () => {}
});

export const AppProvider = ({
    children,
    defaultValue = AppContext._currentValue
}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        defaultValue.isAuthenticated
    );
    const [user, setUser] = useState(defaultValue.user);

    const reset = () => {
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AppContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                user,
                setUser,
                reset
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;