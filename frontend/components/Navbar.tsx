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
            <Link href='/users/login'>Login</Link>
            <br />
            <Link href='/users/signup'>Sign Up</Link>
        </div>
    );

    const mutualLinks = (
        <div>
            <li>
                <br />
                <Link href='/users'>user list</Link>
                <br />
                <Link href='/recipes/RecipeList'>recipe list</Link>
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
                    <div>{isUserAuthenticated ? authLinks : guestLinks}</div>
                    <br />
                    <div>{mutualLinks}</div>
                    <>{isUserAuthenticated ? <div>true</div> : <div>false</div>}</>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
