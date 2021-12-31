import Footer from './Footer';
import Navbar from './Navbar';
import React from 'react';
import styles from '../styles/layout/__layout.module.scss';

interface DataTypes {
    children: any;
}

const Layout: React.FC<DataTypes> = ({ children }) => {
    return (
        <div data-testid='layout'>
            <meta name='csrf_token' content='{{ csrf_token }}'></meta>
            <Navbar />
            <div className={styles.layout}>{children}</div>
            <Footer />
        </div>
    );
};

export default Layout;
