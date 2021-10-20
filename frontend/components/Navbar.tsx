import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HomeIcon from '../styles/icons/home.svg';
import Image from 'next/image';
import LeaderboardIcon from '../styles/icons/leaderboard.svg';
import Link from 'next/link';
import PlusIcon from '../styles/icons/plus.svg';
import ProfileIcon from '../styles/icons/profile.svg';
import SavedIcon from '../styles/icons/heart.svg';
import { logoutAction } from '../redux/actions/userActions';
import { pageRoute } from '../globals';

const Navbar = () => {
    const dispatch = useDispatch();

    const updatedIsUserAuthenticated = useSelector((state) => state.userReducer.isUserAuthenticated);
    const updatedloggedUserData = useSelector((state) => state.userReducer.loggedUserData);

    const [isUserAuthenticated, setIsUserAuthenticated] = useState();
    const [loggedUserData, setloggedUserData] = useState();
    useEffect(() => {
        setIsUserAuthenticated(updatedIsUserAuthenticated);
        setloggedUserData(updatedloggedUserData);
    }, [dispatch, updatedIsUserAuthenticated, updatedloggedUserData]);

    const profileUrl = '/users/' + loggedUserData?.id;

    const logoutHandler = () => {
        try {
            dispatch(logoutAction());
        } catch {
            // TODO - add err msg
        }
    };

    const authNavbar = (
        <nav data-testid='authLinks'>
            <ul>
                <li>
                    <Link href={`${pageRoute().home}`}>
                        <a>
                            <i> {HomeIcon.src && <Image src={HomeIcon} alt='as' height={50} width={60} />}</i>
                            <p>Home</p>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href='/'>
                        <a>
                            <i> {SavedIcon.src && <Image src={SavedIcon} alt='as' height={50} width={60} />}</i>
                            <p>Saved</p>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href='/'>
                        <a>
                            <i> {PlusIcon.src && <Image src={PlusIcon} alt='as' height={50} width={60} />}</i>
                            <p>Create</p>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href='/'>
                        <a>
                            <i>
                                {LeaderboardIcon.src && <Image src={LeaderboardIcon} alt='as' height={50} width={60} />}
                            </i>
                            <p>Leaderboard</p>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href={profileUrl}>
                        <a>
                            <i>{ProfileIcon.src && <Image src={ProfileIcon} alt='as' height={50} width={60} />}</i>
                            <p>Profile</p>
                        </a>
                    </Link>
                </li>
            </ul>
        </nav>
    );

    const guestNavbar = (
        <nav data-testid='guestLinks'>
            <ul>
                <li>
                    <Link href={`${pageRoute().home}`}>
                        <a>
                            <i> {HomeIcon.src && <Image src={HomeIcon} alt='as' height={50} width={60} />}</i>
                            <p>Home</p>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href='/'>
                        <a>
                            <i>
                                {LeaderboardIcon.src && <Image src={LeaderboardIcon} alt='as' height={50} width={60} />}
                            </i>
                            <p>Leaderboard</p>
                        </a>
                    </Link>
                </li>
            </ul>
        </nav>
    );

    const authenitcationLinks = (
        <section>
            {isUserAuthenticated ? (
                <button onClick={logoutHandler}>Logout</button>
            ) : (
                <ul>
                    <Link href='/users/UserLogin'>Login</Link>
                    <Link href='/users/UserSignup'>Sign Up</Link>
                </ul>
            )}
        </section>
    );

    return (
        <section data-testid='navbar'>
            <header>
                <input type='text' />
                {authenitcationLinks}
            </header>
            {isUserAuthenticated ? authNavbar : guestNavbar}
        </section>
    );
};

export default Navbar;
