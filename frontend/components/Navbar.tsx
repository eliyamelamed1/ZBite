// TODO recipes crud to navbar
// test author and guest links

import { useDispatch, useSelector } from 'react-redux';

import Link from 'next/link';
import React from 'react';
import { logoutAction } from '../redux/actions/auth';

const Navbar = () => {
    const isAuthenticatedData = useSelector((state) => state.authReducer.isAuthenticatedData);
    const loggedUserData = useSelector((state) => state.authReducer.loggedUserData);
    const dispatch = useDispatch();

    const profileUrl = loggedUserData ? '/users/' + loggedUserData.id : null;
    const logoutHandler = () => {
        try {
            dispatch(logoutAction());
        } catch {
            // TODO - add err msg
        }
    };
    const authLinks = (
        <section data-testid='authLinks'>
            {loggedUserData ? (
                <div>
                    <div>you are currently logged in as {loggedUserData.email}</div>
                    <div>
                        <Link href={profileUrl}>Profile</Link>
                        <br />
                        <Link href='/chats'>chats</Link>
                    </div>
                </div>
            ) : null}
            {isAuthenticatedData ? (
                <li>
                    <button onClick={logoutHandler}>Logout</button>
                </li>
            ) : null}
        </section>
    );

    const guestLinks = (
        <div data-testid='guestLinks'>
            <li>
                <Link href='/users/login'>Login</Link>
            </li>
            <li>
                <Link href='/users/signup'>Sign Up</Link>
            </li>
        </div>
    );
    return (
        <div data-testid='navbar'>
            <Link href='/'>Auth System</Link>
            <div>
                <ul>
                    <li>
                        <Link href='/'>Home</Link>
                    </li>
                    <li>{isAuthenticatedData ? authLinks : guestLinks}</li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
