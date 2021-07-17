// TODO recipes crud to navbar
// test author and guest links

import { useDispatch, useSelector } from 'react-redux';

import Link from 'next/link';
import React from 'react';
import { logoutAction } from '../redux/actions/auth';

const Navbar = () => {
    const { isUserAuthenticated, loggedUserDetails } = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();

    const profileUrl = loggedUserDetails ? '/users/' + loggedUserDetails.id : null;
    const logoutHandler = () => {
        try {
            dispatch(logoutAction());
        } catch {
            // TODO - add err msg
        }
    };
    const authLinks = (
        <section data-testid='authLinks'>
            {loggedUserDetails ? (
                <div>
                    <div>you are currently logged in as {loggedUserDetails.email}</div>
                    <div>
                        <Link href={profileUrl}>profile</Link>
                        <br />
                        <Link href='/chats'>chats</Link>
                    </div>
                </div>
            ) : null}
            {isUserAuthenticated ? (
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
        <nav data-testid='navbar'>
            <Link href='/'>Auth System</Link>
            <div>
                <ul>
                    <li>
                        <Link href='/'>Home</Link>
                    </li>
                    <>{isUserAuthenticated ? authLinks : guestLinks}</>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
