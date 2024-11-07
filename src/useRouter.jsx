import { Navigate, Outlet, useRoutes } from 'react-router-dom';
// import { useContext } from 'react';
// import AppContext from './contexts/app.context';
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
import Admin from './layouts/AdminLayout/Admin';
import DoctorManagenment from './pages/DoctorManagement/DoctorManagement';

// function ProtectedRoute() {
//     const { isAuthenticated, user } = useContext(AppContext);
//     return isAuthenticated && user?.role !== 'admin' ? <Outlet /> : <Navigate to="/profile" />;
//   }

//   function AdminRoute() {
//     const { isAuthenticated, user } = useContext(AppContext);
//     return isAuthenticated && user?.role === 'admin' ? <Outlet /> : <Navigate to="/login" />;
//   }

//   function  RejectedRoute() {
//     const { isAuthenticated } = useContext(AppContext);
//     return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
//   }

const isAuthenticated = true;
const isAdmin = true;
function ProtectedRoute() {
    return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
}
function AdminRoute() {
    return isAuthenticated && isAdmin ? <Outlet /> : <Navigate to='/login' />;
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
                    path: 'profile',
                    element: (
                        <MainLayout>
                            <Profile />
                        </MainLayout>
                    )
                },
                {
                    path: 'emptyprofile',
                    element: (
                        <MainLayout>
                            <EmptyPatientProfile />
                        </MainLayout>
                    )
                },
                {
                    path: 'selectprofile',
                    element: (
                        <MainLayout>
                            <SelectProfile />
                        </MainLayout>
                    )
                },
                {
                    path: 'infor',
                    element: (
                        <MainLayout>
                            <Information />
                        </MainLayout>
                    )
                }
            ]
        },
        // Admin routes
        {
            path: '/admin',
            element: <AdminRoute />,
            children: [
                {
                    path: '',
                    element: <Admin />
                },
                {
                    path: 'doctormanagement',
                    element: <DoctorManagenment />
                }
            ]
        },
        // Public routes
        {
            path: '/login',
            element: <RejectedRoute />,
            children: [
                {
                    path: '',
                    element: <Login />
                }
            ]
        },
        {
            path: '/register',
            element: <RejectedRoute />,
            children: [
                {
                    path: '',
                    element: <Register />
                }
            ]
        },
        {
            path: '/forgotPassword',
            element: <RejectedRoute />,
            children: [
                {
                    path: '',
                    element: <ForgotPassword />
                }
            ]
        },
        {
            path: '/resetPassword',
            element: <RejectedRoute />,
            children: [
                {
                    path: '',
                    element: <ResetPassword />
                }
            ]
        }
    ]);

    return routeElement;
}

export default useRouter;
