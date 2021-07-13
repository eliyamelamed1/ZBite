// test useEffect dispatch action
// test renders children

import React, { useEffect } from 'react';

import Navbar from './Navbar';
import { connect } from 'react-redux';
import { loadLoggedUserDetailsAction } from '../redux/actions/auth';
import { useDispatch } from 'react-redux';

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
