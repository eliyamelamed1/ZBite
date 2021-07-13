// test useEffect dispatch action
// test renders children

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Navbar from './Navbar';
import NewMessage from './notifications/NewMessage';
import { connect } from 'react-redux';
import { loadLoggedUserDetailsAction } from '../redux/actions/auth';

const layout = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        try {
            dispatch(loadLoggedUserDetailsAction());
        } catch {
            // TODO - add err msg
        }
    }, [dispatch]);

    return (
        <div data-testid='layout'>
            <meta name='csrf_token' content='{{ csrf_token }}'></meta>
            <Navbar />

            {children}
        </div>
    );
};

export default connect()(layout);
