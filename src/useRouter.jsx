import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
 import Profile from './pages/Profile';
import MainLayout from './layouts/MainLayout';
import EmptyPatientProfile from './components/EmptyPatientProfile';
import SelectProfile from './components/SelectProfile/SelectProfile';
import Information from './components/Information/Information';
// import DetailInfo from './components/DetailInfo/DetailInfo';



const isAuthenticated = true;
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
            element: (
                <MainLayout>
                    <Home />    
                </MainLayout>
            )
            
        },
        {
            path: '',
            element: <ProtectedRoute />,
            children: [
                {
                    path: '/profile',
                    element: (
                        <MainLayout>
                            <Profile />
                        </MainLayout>
                    )
                },
                {
                    path: '/emptyprofile',
                    element:(
                        <MainLayout>
                        <EmptyPatientProfile/>
                        </MainLayout>
                    )
                },
                {
                    path: '/selectprofile',
                    element: (
                        <MainLayout>
                            <SelectProfile/>
                        </MainLayout>
                    )
                },
                {
                    path: '/infor',
                    element: (
                        <MainLayout>
                            <Information/>
                        </MainLayout>
                    )
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
