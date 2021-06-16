import { Helmet, HelmetProvider } from 'react-helmet-async';
import React, { useEffect, useState } from 'react';

import NotFound from '../NotFound';
import UserDelete from './UserDelete';
import UserUpdate from './UserUpdate';
import { connect } from 'react-redux';
import { loadUserDetailsAction } from '../../redux/actions/auth';

const userDetailPage = (props) => {
    const [isAuthor, setIsAuthor] = useState(false);
    const [userExist, setUserExist] = useState(false);

    useEffect(() => {
        props.loadUserDetailsAction(props.match.params.id);
    }, [props.match.params.id]);

    useEffect(() => {
        if (props.userDetailsData) {
            if (Object.prototype.hasOwnProperty.call(props.userDetailsData, 'name')) {
                setUserExist(true);
            }
        }
    }, [props.userDetailsData]);

    useEffect(() => {
        if (props.loggedUserData != null) {
            if (props.loggedUserData.id == props.match.params.id) {
                setIsAuthor(true);
            }
        }
    }, [props.match.params.id, props.loggedUserData]);

    const guestLinks = (
        <main>
            {userExist ? (
                <div>
                    <p>user name: {props.userDetailsData.name}</p>
                    <p>user email: {props.userDetailsData.email}</p>
                </div>
            ) : (
                <NotFound />
            )}
        </main>
    );

    const authorLinks = (
        <div>
            <UserDelete id={props.match.params.id} />
            <UserUpdate id={props.match.params.id} />
            {props.loggedUserData ? (
                <div>
                    <div>user name: {props.loggedUserData.name}</div>
                    <div>user email: {props.loggedUserData.email}</div>
                </div>
            ) : (
                { guestLinks }
            )}
        </div>
    );

    return (
        <div data-testid='userDetailPage'>
            <HelmetProvider>
                <Helmet>
                    <title>ZBite - User Details Page </title>
                    <meta name='description' content='recipes detail' />
                </Helmet>
            </HelmetProvider>
            <div>
                <div>{isAuthor == true ? <p>{authorLinks}</p> : <p>{guestLinks}</p>}</div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    loggedUserData: state.authReducer.loggedUserData,
    userDetailsData: state.authReducer.userDetailsData,
});

export default connect(mapStateToProps, { loadUserDetailsAction })(userDetailPage);
