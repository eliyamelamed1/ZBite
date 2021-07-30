import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Link from 'next/link';
import { logoutAction } from '../redux/actions/auth';

const Navbar = () => {
    const dispatch = useDispatch();

    const updatedIsUserAuthenticated = useSelector((state) => state.authReducer.isUserAuthenticated);
    const updatedloggedUserData = useSelector((state) => state.authReducer.loggedUserData);

    const [isUserAuthenticated, setIsUserAuthenticated] = useState();
    const [loggedUserData, setloggedUserData] = useState();
    useEffect(() => {
        setIsUserAuthenticated(updatedIsUserAuthenticated);
        setloggedUserData(updatedloggedUserData);
    }, [dispatch, updatedIsUserAuthenticated, updatedloggedUserData]);

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
            <Link href='/users/UserLogin'>Login</Link>
            <br />
            <Link href='/users/UserSignup'>Sign Up</Link>
        </div>
    );

    const mutualLinks = (
        <div>
            <li>
                <br />
                <Link href='/users/UserList'>user list</Link>
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
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
