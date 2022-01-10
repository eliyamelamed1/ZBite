/* TODO 
test cant sign up with password different than re password 
*/

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Link from 'next/link';
import { RootState } from '../../redux/store';
import Router from 'next/router';
import { pageRoute } from '../../enums';
import { signupAction } from '../../redux/actions/userActions';
import styles from '../../styles/pages/signup.module.scss';
import { toast } from 'react-toastify';

const UserSignup = () => {
    const dispatch = useDispatch();
    const isUserAuthenticated = useSelector((state: RootState) => state.userReducer.isUserAuthenticated);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        re_password: '',
    });

    const { name, email, password, re_password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        if (password !== re_password) return toast.error('password do not match');
        try {
            dispatch(
                signupAction({
                    name,
                    email,
                    password,
                    re_password,
                })
            );
        } catch {}
    };

    if (isUserAuthenticated) {
        Router.push(pageRoute().home);
    }

    return (
        <div data-testid='userSignup'>
            <div className={styles.background_shape}>
                <span className={styles.welcome_title}>Welcome</span>
            </div>
            <section className={styles.content_section}>
                <h1 className={styles.create_account_title}>Create An Account</h1>
                <form onSubmit={onSubmit} className={styles.signup_form}>
                    <input
                        type='text'
                        placeholder='Full Name'
                        name='name'
                        value={name}
                        onChange={(e) => onChange(e)}
                        className={styles.name_input}
                        required
                    />
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
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={(e) => onChange(e)}
                        minLength={8}
                        className={styles.password_input}
                        required
                    />
                    <input
                        type='password'
                        placeholder='Confirm Password'
                        name='re_password'
                        value={re_password}
                        onChange={(e) => onChange(e)}
                        minLength={8}
                        className={styles.password_input}
                        required
                    />
                    <button type='submit' className={styles.signup_button}>
                        Register
                    </button>
                </form>
                <div className={styles.already_have_account_container}>
                    <p className={styles.already_have_account_text}>Already have an account?</p>
                    <Link href={pageRoute().login}>
                        <a className={styles.signin_link}>Sign In</a>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default UserSignup;
