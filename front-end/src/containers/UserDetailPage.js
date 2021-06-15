import { Helmet, HelmetProvider } from 'react-helmet-async';
import React, { useEffect, useState } from 'react';

import NotFound from '../components/NotFound';
import UserDelete from '../components/users/UserDelete';
import UserUpdate from '../components/users/UserUpdate';
import { connect } from 'react-redux';
import { loadUserDetailsAction } from '../redux/actions/auth';

const userDetailPage = (props) => {
    const [isAuthor, setIsAuthor] = useState(false);
    const [userExist, setUserExist] = useState(false);

    useEffect(() => {
        props.loadUserDetailsAction(props.match.params.id);
    }, [props.match.params.id]);

    useEffect(() => {
        if (props.userDetails) {
            if (Object.prototype.hasOwnProperty.call(props.userDetails, 'name')) {
                setUserExist(true);
            }
        }
    }, [props.userDetails]);

    useEffect(() => {
        if (props.loggedUser != null) {
            if (props.loggedUser.id == props.match.params.id) {
                setIsAuthor(true);
            }
        }
    }, [props.match.params.id, props.loggedUser]);

    const guestLinks = (
        <main>
            {userExist ? (
                <div>
                    <p>user name: {props.userDetails.name}</p>
                    <p>user email: {props.userDetails.email}</p>
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
            {props.loggedUser ? (
                <div>
                    <div>user name: {props.loggedUser.name}</div>
                    <div>user email: {props.loggedUser.email}</div>
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
    loggedUser: state.authReducer.loggedUser,
    userDetails: state.authReducer.userDetails,
});

export default connect(mapStateToProps, { loadUserDetailsAction })(userDetailPage);
