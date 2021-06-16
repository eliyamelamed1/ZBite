// add recipes option in navbar

import { Link, NavLink } from 'react-router-dom';

import React from 'react';
import { connect } from 'react-redux';
import { logoutAction } from '../redux/actions/auth';

const navbar = ({ isAuthenticatedData, logoutAction, loggedUserData }) => {
    const profileUrl = loggedUserData ? '/users/' + loggedUserData.id : null;
    const authLinks = (
        <section data-testid='authLinks'>
            {loggedUserData ? (
                <div>
                    <div>you are currently logged in as {loggedUserData.email}</div>
                    <div>
                        <NavLink exact to={profileUrl}>
                            Profile
                        </NavLink>
                        <br />
                        <NavLink to='/chats'>chats</NavLink>
                    </div>
                </div>
            ) : null}
            {isAuthenticatedData ? (
                <li>
                    <button onClick={logoutAction}>Logout</button>
                </li>
            ) : null}
        </section>
    );

    const guestLinks = (
        <div data-testid='guestLinks'>
            <li>
                <NavLink exact to='/login'>
                    Login
                </NavLink>
            </li>
            <li>
                <NavLink exact to='/signup'>
                    Sign Up
                </NavLink>
            </li>
        </div>
    );
    return (
        <nav data-testid='navbar'>
            <Link to='/'>Auth System</Link>
            <div>
                <ul>
                    <li>
                        <NavLink exact to='/'>
                            Home
                        </NavLink>
                    </li>
                    <>{isAuthenticatedData ? authLinks : guestLinks}</>
                </ul>
            </div>
        </nav>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticatedData: state.authReducer.isAuthenticatedData,
    loggedUserData: state.authReducer.loggedUserData,
});

export default connect(mapStateToProps, { logoutAction })(navbar);
