import PropTypes from 'prop-types';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
// import Home from '../../pages/Home';

function MainLayout({ children }) {
    return (
        <main>
            <Header />
            {children}
            <Footer />
        </main>
    );
}
MainLayout.propTypes = {
    children: PropTypes.node, 
};
export default MainLayout;
