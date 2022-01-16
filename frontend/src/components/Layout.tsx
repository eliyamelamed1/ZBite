import Footer from './Footer';
import Navbar from './Navbar';
import PacmanLoader from 'react-spinners/PacmanLoader';
import React from 'react';
import { RootState } from '../redux/store';
import { ToastContainer } from 'react-toastify';
import styles from '../styles/layout/__layout.module.scss';
import { useSelector } from 'react-redux';

interface DataTypes {
    children: any;
}

const Layout: React.FC<DataTypes> = ({ children }) => {
    const { isLoading } = useSelector((state: RootState) => state.loadingReducer);

    return (
        <div data-testid='layout'>
            <h2>
                <ToastContainer position='top-right' autoClose={5000} newestOnTop={false} pauseOnFocusLoss={false} />
            </h2>

            <div className={styles.centerScreen}>
                <PacmanLoader loading={isLoading} color={'#ff5349'} size={40} margin={2} speedMultiplier={2} />
            </div>
            <meta name='csrf_token' content='{{ csrf_token }}'></meta>
            <Navbar />
            <div className={styles.layout}>{children}</div>
            <Footer />
        </div>
    );
};

export default Layout;
