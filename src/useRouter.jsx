/* eslint-disable react-refresh/only-export-components */
import { Navigate, Outlet, useRoutes, useLocation } from 'react-router-dom';
import { useContext, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import AppContext from './contexts/app.context.jsx';
import MainLayout from './layouts/MainLayout';
import UserLayout from './layouts/UserLayout';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const Profile = lazy(() => import('./pages/Profile'));
const SelectPatient = lazy(() => import('./pages/SelectPatient'));
const CreateProfile = lazy(() => import('./pages/CreateProfile'));
const UpdatePatient = lazy(() => import('./pages/UpdatePatient'));
const SelectSpecialty = lazy(() => import('./pages/SelectSpecialty'));
const SelectDoctor = lazy(() => import('./pages/SelectDoctor'));
const SelectService = lazy(() => import('./pages/SelectService'));
const SelectDate = lazy(() => import('./pages/SelectDate'));
const ConfirmAppointment = lazy(() => import('./pages/ConfirmAppointment'));
const Introduction = lazy(() => import('./pages/Introduction'));
const Procedure = lazy(() => import('./pages/Procedure'));
const QandA = lazy(() => import('./pages/QandA'));
const Contact = lazy(() => import('./pages/Contact'));
const UserNotification = lazy(() => import('./pages/UserNotification'));
const UserMedicalBill = lazy(() => import('./pages/UserMedicalBill'));
const AccountSetting = lazy(() => import('./pages/AccountSetting'));

function ProtectedRoute() {
    const { isAuthenticated } = useContext(AppContext);
    return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
}

function RejectedRoute() {
    const { isAuthenticated } = useContext(AppContext);
    return !isAuthenticated ? <Outlet /> : <Navigate to='/' />;
}

function useRouter() {
    const location = useLocation();

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
        {
            path: '/introduction',
            element: (
                <MainLayout>
                    <Suspense>
                        <Introduction />
                    </Suspense>
                </MainLayout>
            )
        },
        {
            path: '/procedure',
            element: (
                <MainLayout>
                    <Suspense>
                        <Procedure />
                    </Suspense>
                </MainLayout>
            )
        },
        {
            path: '/qa',
            element: (
                <MainLayout>
                    <Suspense>
                        <QandA />
                    </Suspense>
                </MainLayout>
            )
        },
        {
            path: '/contact',
            element: (
                <MainLayout>
                    <Suspense>
                        <Contact />
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
                    element: (
                        <UserLayout>
                            <Suspense>
                                <Profile />
                            </Suspense>
                        </UserLayout>
                    )
                },
                {
                    path: '/user-medical-bill',
                    element: (
                        <UserLayout>
                            <Suspense>
                                <UserMedicalBill />
                            </Suspense>
                        </UserLayout>
                    )
                },
                {
                    path: '/user-notifications',
                    element: (
                        <UserLayout>
                            <Suspense>
                                <UserNotification />
                            </Suspense>
                        </UserLayout>
                    )
                },
                {
                    path: '/account-setting',
                    element: (
                        <UserLayout>
                            <Suspense>
                                <AccountSetting />
                            </Suspense>
                        </UserLayout>
                    )
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
                },
                {
                    path: '/select-specialty',
                    element: (
                        <MainLayout>
                            <Suspense>
                                <SelectSpecialty />
                            </Suspense>
                        </MainLayout>
                    )
                },
                {
                    path: '/select-doctor',
                    element: (
                        <MainLayout>
                            <Suspense>
                                <SelectDoctor />
                            </Suspense>
                        </MainLayout>
                    )
                },
                {
                    path: '/select-service',
                    element: (
                        <MainLayout>
                            <Suspense>
                                <SelectService />
                            </Suspense>
                        </MainLayout>
                    )
                },
                {
                    path: '/select-date',
                    element: (
                        <MainLayout>
                            <Suspense>
                                <SelectDate />
                            </Suspense>
                        </MainLayout>
                    )
                },
                {
                    path: '/confirm-appointment',
                    element: (
                        <MainLayout>
                            <Suspense>
                                <ConfirmAppointment />
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

    return (
        <AnimatePresence mode='wait'>
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeIn' }}
            >
                {routeElement}
            </motion.div>
        </AnimatePresence>
    );
}

export default useRouter;
