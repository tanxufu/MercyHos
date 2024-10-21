import { useRoutes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register/Register';
import ForgotPassword from './pages/ForgotPassword';

function useRouter() {
    const routeElement = useRoutes([
        {
            path: '/',
            element: <Home />
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/login',
            element: <Register />
        },
        {
            path: '/login',
            element: <ForgotPassword />
        }
    ]);

    return routeElement;
}

export default useRouter;
