import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';

const isAuthenticated = false;
function ProtectedRoute() {
    return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
}

function RejectedRoute() {
    return !isAuthenticated ? <Outlet /> : <Navigate to='/' />;
}

function useRouter() {
    const routeElement = useRoutes([
        {
            path: '/',
            element: <Home />
        },
        {
            path: '',
            element: <ProtectedRoute />,
            children: [
                {
                    path: '/profile',
                    element: <Profile />
                }
            ]
        },

        // Rejected Route
        {
            path: '',
            element: <RejectedRoute />,
            children: [
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
            ]
        }
    ]);

    return routeElement;
}

export default useRouter;
