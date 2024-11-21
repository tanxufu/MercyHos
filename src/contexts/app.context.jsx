/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';
import { getUserFromLS } from '../utils/auth';

const AppContext = createContext({
    isAuthenticated: Boolean(getUserFromLS()),
    setIsAuthenticated: () => {},
    user: getUserFromLS(),
    setUser: () => {},
    isAdmin: Boolean(getUserFromLS()?.role === 'admin' || false),
    setIsAdmin: () => {},
    isDoctor: Boolean(getUserFromLS()?.role === 'doctor' || false),
    setIsDoctor: () => {},
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
    const [isAdmin, setIsAdmin] = useState(defaultValue.isAdmin);
    const [isDoctor, setIsDoctor] = useState(defaultValue.isDoctor);

    const reset = () => {
        setIsAuthenticated(false);
        setIsAdmin(false);
        setIsDoctor(false);
        setUser(null);
    };

    return (
        <AppContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                user,
                setUser,
                isAdmin,
                setIsAdmin,
                isDoctor,
                setIsDoctor,
                reset
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
