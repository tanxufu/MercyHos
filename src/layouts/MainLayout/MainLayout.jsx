import PropTypes from 'prop-types';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { useEffect, useState } from 'react';

function MainLayout({ children }) {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        // Lấy thông tin user từ localStorage khi component mount
        const userFromLS = localStorage.getItem('user');
        if (userFromLS !== 'undefined') {
            const user = JSON.parse(userFromLS);
            if (user?.name) {
                setUserName(user.name);
            }
        }
    }, []);

    const handleLogout = () => {
        // Xử lý logout
        localStorage.removeItem('user');
        // Các xử lý khác khi logout
    };

    return (
        <main>
            <Header userName={userName} onLogout={handleLogout} />
            {children}
            <Footer />
        </main>
    );
}

MainLayout.propTypes = {
    children: PropTypes.node
};

export default MainLayout;