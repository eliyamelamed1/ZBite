import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Link from 'next/link';
import { RootState } from '../../redux/store';
import Router from 'next/router';
import { loginAction } from '../../redux/actions/userActions';
import { pageRoute } from '../../enums';
import styles from '../../styles/pages/login.module.scss';

const UserLogin = () => {
    const dispatch = useDispatch();
    const { isUserAuthenticated } = useSelector((state: RootState) => state.userReducer);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        try {
            dispatch(loginAction({ email, password }));
        } catch {}
    };

    if (isUserAuthenticated) {
        Router.push(pageRoute().home);
    }

    return (
        <div data-testid='userLogin'>
            <div className={styles.background_shape}>
                <h1 className={styles.welcome_title}>Welcome Back</h1>
            </div>
            <section className={styles.content_section}>
                <h1 className={styles.log_in_to_your_account_title}>Log in to your account</h1>
                <form onSubmit={(e) => onSubmit(e)} className={styles.login_form}>
                    <input
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={(e) => onChange(e)}
                        className={styles.email_input}
                        required
                    />
                    <input
                        type='password'
                        placeholder='password'
                        name='password'
                        value={password}
                        onChange={(e) => onChange(e)}
                        className={styles.password_input}
                        required
                    />
                    <div className={styles.forgot_password_container}>
                        <Link href={pageRoute().reset_password}>
                            <a className={styles.forgot_password_text}>Forgot password ?</a>
                        </Link>
                    </div>
                    <button type='submit' className={styles.login_button}>
                        Login
                    </button>
                </form>
                <span className={styles.dont_have_an_account_container}>
                    <span className={styles.dont_have_an_account_text}>Do not have an account?</span>
                    <Link href={pageRoute().signup}>
                        <a className={styles.signup_link}>Sign Up</a>
                    </Link>
                </span>
            </section>
        </div>
    );
};

export default UserLogin;
