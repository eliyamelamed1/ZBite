import React from 'react';
import { useSelector } from 'react-redux';

const HomePage = () => {
    const authReducer = useSelector((state) => state.authReducer);
    console.log(authReducer);
    return (
        <React.Fragment>
            <div>home page</div>
        </React.Fragment>
    );
};
// server side store update client side store
//  but client side store DOESNT update server side store
// or
// pages updates store
// but component doesnt update store
export default HomePage;
