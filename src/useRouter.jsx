import { useRoutes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register/Register';
import ForgotPassword from './pages/ForgotPassword';
import MainLayout from './layouts/MainLayout/MainLayout';
import Admin from './layouts/AdminLayout/Admin';
import UserLayout from './layouts/UserLayout/UserLayout';
import Profile from './pages/Profile/Profile';


function useRouter() {
    const routeElement = useRoutes([
        {
            path: '/',
            element: (
                <MainLayout>
                    <Home/>
                </MainLayout>
            )
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
        },
        {
            path: '/admin',
            element: <Admin/>
        },
        {
            path: '/user',
            element:(
                <UserLayout>
                    <Profile/>
                </UserLayout>
            )
        }
       
    ]);

    return routeElement;
}

export default useRouter;
