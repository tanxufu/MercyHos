import { useRoutes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

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
            path: '/register',
            element: <Register />
        },
        {
            path: '/forgotPassword',
            element: <ForgotPassword />
        },
        {
            path: '/resetPassword',
            element: <ResetPassword />
        }
    ]);

    return routeElement;
}

export default useRouter;
