/* eslint-disable react-refresh/only-export-components */
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import { useContext, lazy, Suspense } from 'react';

import AppContext from './contexts/app.context';
import MainLayout from './layouts/MainLayout';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const Profile = lazy(() => import('./pages/Profile'));
const SelectPatient = lazy(() => import('./pages/SelectPatient'));
const CreateProfile = lazy(() => import('./pages/CreateProfile'));
const UpdatePatient = lazy(() => import('./pages/UpdatePatient'));

function ProtectedRoute() {
    const { isAuthenticated } = useContext(AppContext);
    return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
}

function RejectedRoute() {
    const { isAuthenticated } = useContext(AppContext);
    return !isAuthenticated ? <Outlet /> : <Navigate to='/' />;
}

function useRouter() {
    const routeElement = useRoutes([
        {
            path: '/',
            element: (
                <MainLayout>
                    <Suspense>
                        <Home />
                    </Suspense>
                </MainLayout>
            )
        },

        // Protected Route
        {
            path: '',
            element: <ProtectedRoute />,
            children: [
                {
                    path: '/profile',
                    element: <Profile />
                },
                {
                    path: '/select-patient-profile',
                    element: (
                        <MainLayout>
                            <Suspense>
                                <SelectPatient />
                            </Suspense>
                        </MainLayout>
                    )
                },
                {
                    path: '/create-patient-profile',
                    element: (
                        <MainLayout>
                            <Suspense>
                                <CreateProfile />
                            </Suspense>
                        </MainLayout>
                    )
                },
                {
                    path: '/update-patient-profile',
                    element: (
                        <MainLayout>
                            <Suspense>
                                <UpdatePatient />
                            </Suspense>
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
                    element: (
                        <Suspense>
                            <Login />
                        </Suspense>
                    )
                },
                {
                    path: '/register',
                    element: (
                        <Suspense>
                            <Register />
                        </Suspense>
                    )
                },
                {
                    path: '/forgotPassword',
                    element: (
                        <Suspense>
                            <ForgotPassword />
                        </Suspense>
                    )
                },
                {
                    path: '/resetPassword',
                    element: (
                        <Suspense>
                            <ResetPassword />
                        </Suspense>
                    )
                }
            ]
        }
    ]);

    return routeElement;
}

export default useRouter;
