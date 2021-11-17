import React, { ReactEventHandler, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HomeIcon from '../styles/icons/home.svg';
import Image from 'next/image';
import LeaderboardIcon from '../styles/icons/leaderboard.svg';
import Link from 'next/link';
import LogoIcon from '../styles/icons/logo.svg';
import PlusIcon from '../styles/icons/plus.svg';
import ProfileIcon from '../styles/icons/profile.svg';
import SavedIcon from '../styles/icons/heart.svg';
import SearchIcon from '../styles/icons/search.svg';
import { logoutAction } from '../redux/actions/userActions';
import { pageRoute } from '../globals';
import styles from '../styles/layout/_navbar.module.scss';
import { useRouter } from 'next/router';

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

    const handleLogout = () => {
        try {
            dispatch(logoutAction());
        } catch {
            // TODO - add err msg
        }
    };

    const NavbarLinks = () => {
        const router = useRouter();
        const { pathname, asPath } = router;
        return (
            <nav data-testid='NavbarLinks' className={styles.nav}>
                <ul className={styles.nav__list}>
                    <li>
                        <Link href={`${pageRoute().home}`}>
                            <a className={styles.nav__link}>
                                <i
                                    className={`${styles.nav__link__icon} ${
                                        pathname === pageRoute().home && styles.active
                                    }`}
                                >
                                    {HomeIcon.src && <Image src={HomeIcon} alt='as' height={50} width={60} />}
                                </i>
                                <p
                                    className={`${styles.nav__link__text} ${
                                        pathname === pageRoute().home && styles.active
                                    }`}
                                >
                                    Home
                                </p>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={pageRoute().savedRecipes}>
                            <a className={styles.nav__link}>
                                <i
                                    className={`${styles.nav__link__icon} ${
                                        pathname === pageRoute().savedRecipes && styles.active
                                    }`}
                                >
                                    {SavedIcon.src && <Image src={SavedIcon} alt='as' height={50} width={60} />}
                                </i>
                                <p
                                    className={`${styles.nav__link__text} ${
                                        pathname === pageRoute().savedRecipes && styles.active
                                    }`}
                                >
                                    Saved
                                </p>
                            </a>
                        </Link>
                    </li>
                    <li className={`${styles.nav__item} ${styles.create__recipe}`}>
                        <Link href={pageRoute().createRecipe}>
                            <a className={`${styles.nav__link} ${styles.create__recipe}`}>
                                <i
                                    className={`${styles.nav__link__icon} ${styles.create__recipe} ${
                                        pathname === pageRoute().createRecipe && styles.active
                                    }`}
                                >
                                    {PlusIcon.src && <Image src={PlusIcon} alt='as' height={50} width={60} />}
                                </i>
                                <p
                                    className={`${styles.nav__link__text} ${styles.create__recipe} ${
                                        pathname === pageRoute().createRecipe && styles.active
                                    }`}
                                >
                                    Create
                                </p>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={pageRoute().leaderboard}>
                            <a>
                                <i
                                    className={`${styles.nav__link__icon} ${
                                        pathname === pageRoute().leaderboard && styles.active
                                    }`}
                                >
                                    {LeaderboardIcon.src && (
                                        <Image src={LeaderboardIcon} alt='as' height={50} width={60} />
                                    )}
                                </i>

                                <p
                                    className={`${styles.nav__link__text} ${
                                        pathname === pageRoute().leaderboard && styles.active
                                    }`}
                                >
                                    Leaderboard
                                </p>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={profileUrl}>
                            <a>
                                <i className={`${styles.nav__link__icon} ${asPath === profileUrl && styles.active}`}>
                                    {ProfileIcon.src && <Image src={ProfileIcon} alt='as' height={50} width={60} />}
                                </i>
                                <p className={`${styles.nav__link__text} ${asPath === profileUrl && styles.active}`}>
                                    Profile
                                </p>
                            </a>
                        </Link>
                    </li>
                </ul>
            </nav>
        );
    };

    const authenitcationLinks = (
        <section className={styles.auth__links}>
            {isUserAuthenticated ? (
                <ul className={`${styles.auth__links__list} ${styles.auth__links__list__authenticated}`}>
                    <li>
                        <button onClick={handleLogout} className={styles.logout_btn}>
                            Logout
                        </button>
                    </li>
                </ul>
            ) : (
                <ul className={`${styles.auth__links__list} ${styles.auth__links__list__guest}`}>
                    <li className={styles.login_btn}>
                        <Link href='/users/UserLogin'>Login</Link>
                    </li>
                    <br />
                    <li className={styles.signup_btn}>
                        <Link href='/users/UserSignup'>Sign Up</Link>
                    </li>
                </ul>
            )}
        </section>
    );

    return (
        <div data-testid='navbar' className={styles.container}>
            <header className={styles.header}>
                <i className={styles.logo__icon}>
                    {LogoIcon.src && <Image src={LogoIcon} alt='logo icon' height={100} width={100} />}
                </i>
                <div className={styles.search__box}>
                    <input type='text' className={styles.search__txt} placeholder='Search' />
                    <button className={styles.search__btn}>
                        <i>{SearchIcon.src && <Image src={SearchIcon} alt='search icon' height={100} width={100} />}</i>
                    </button>
                </div>
                {authenitcationLinks}
            </header>
            {NavbarLinks()}
        </div>
    );
};

export default Navbar;
