import Footer from './Footer';
import Navbar from './Navbar';
import React from 'react';

const Layout = ({ children }) => {
    return (
        <div data-testid='layout'>
            <meta name='csrf_token' content='{{ csrf_token }}'></meta>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
};

export default Layout;
