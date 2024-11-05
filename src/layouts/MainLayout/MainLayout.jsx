/* eslint-disable react/prop-types */
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

function MainLayout({ children }) {
    return (
        <main>
            <Header />
            {children}
            <Footer />
        </main>
    );
}

export default MainLayout;
