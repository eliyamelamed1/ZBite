import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HomeIcon from '../styles/icons/home.svg';
import Image from 'next/image';
import LeaderboardIcon from '../styles/icons/leaderboard.svg';
import Link from 'next/link';
import LogoIcon from '../styles/icons/logo.svg';
import NavBurgerIcon from '../styles/icons/navBurger.svg';
import PlusIcon from '../styles/icons/plus.svg';
import ProfileIcon from '../styles/icons/profile.svg';
import SavedIcon from '../styles/icons/heart.svg';
import SearchIcon from '../styles/icons/search.svg';
import classes from '../styles/layout/_navbar.module.scss';
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

    const profileUrl = loggedUserData ? '/users/' + loggedUserData?.id : '/users/UserLogin/';

    const logoutHandler = () => {
        try {
            dispatch(logoutAction());
        } catch {
            // TODO - add err msg
        }
    };

    const NavbarLinks = (
        <nav data-testid='NavbarLinks' className={classes.nav}>
            <ul className={classes.nav__list}>
                <li>
                    <Link href={`${pageRoute().home}`}>
                        <a className={classes.nav__link}>
                            <i className={classes.nav__link__icon}>
                                {HomeIcon.src && <Image src={HomeIcon} alt='as' height={50} width={60} />}
                            </i>
                            <p className={classes.nav__link__text}>Home</p>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href='/'>
                        <a className={classes.nav__link}>
                            <i className={classes.nav__link__icon}>
                                {SavedIcon.src && <Image src={SavedIcon} alt='as' height={50} width={60} />}
                            </i>
                            <p className={classes.nav__link__text}>Saved</p>
                        </a>
                    </Link>
                </li>
                <li className={`${classes.nav__item} ${classes.create__recipe}`}>
                    <Link href='/'>
                        <a className={`${classes.nav__link} ${classes.create__recipe}`}>
                            <i className={`${classes.nav__link__icon} ${classes.create__recipe}`}>
                                {PlusIcon.src && <Image src={PlusIcon} alt='as' height={50} width={60} />}
                            </i>
                            <p className={`${classes.nav__link__text} ${classes.create__recipe}`}>Create Recipe</p>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href='/'>
                        <a>
                            <i className={classes.nav__link__icon}>
                                {LeaderboardIcon.src && <Image src={LeaderboardIcon} alt='as' height={50} width={60} />}
                            </i>

                            <p className={classes.nav__link__text}>Leaderboard</p>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href={profileUrl}>
                        <a>
                            <i className={classes.nav__link__icon}>
                                {ProfileIcon.src && <Image src={ProfileIcon} alt='as' height={50} width={60} />}
                            </i>
                            <p className={classes.nav__link__text}>Profile</p>
                        </a>
                    </Link>
                </li>
            </ul>
        </nav>
    );
    const authenitcationLinks = (
        <section className={classes.auth__links}>
            {isUserAuthenticated ? (
                <ul className={classes.auth__links__list}>
                    <button onClick={logoutHandler}>Logout</button>
                </ul>
            ) : (
                <ul className={classes.auth__links__list}>
                    <li>
                        <Link href='/users/UserLogin'>Login</Link>
                    </li>
                    <br />
                    <li>
                        <Link href='/users/UserSignup'>Sign Up</Link>
                    </li>
                </ul>
            )}
        </section>
    );

    return (
        <div data-testid='navbar' className={classes.container}>
            <header className={classes.header}>
                <i className={classes.logo__icon}>
                    {LogoIcon.src && <Image src={LogoIcon} alt='logo icon' height={100} width={100} />}
                </i>
                <div className={classes.search__box}>
                    <input type='text' className={classes.search__txt} placeholder='Search' />
                    <button className={classes.search__btn}>
                        <i>{SearchIcon.src && <Image src={SearchIcon} alt='search icon' height={100} width={100} />}</i>
                    </button>
                </div>
                {authenitcationLinks}
            </header>
            {NavbarLinks}
        </div>
    );
};

export default Navbar;
