/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from 'framer-motion';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

function MainLayout({ children }) {
    return (
        <main>
            <Header />
            <AnimatePresence mode='wait'>
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
            <Footer />
        </main>
    );
}

export default MainLayout;
