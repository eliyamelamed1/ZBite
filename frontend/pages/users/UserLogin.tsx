import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Link from 'next/link';
import Router from 'next/router';
import { loginAction } from '../../redux/actions/user';

const UserLogin = () => {
    const dispatch = useDispatch();
    const { isUserAuthenticated } = useSelector((state) => state.userReducer);
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
        Router.push('/');
    }

    return (
        <div data-testid='userLogin'>
            <h1>Log In</h1>
            <p>Log into your account</p>
            <form onSubmit={(e) => onSubmit(e)}>
                <div>
                    <input
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div>
                    <input
                        type='password'
                        placeholder='password'
                        name='password'
                        value={password}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <button type='submit'>Login</button>
            </form>
            <p>
                Do not have an account? <Link href='/UserSignup'>Sign Up</Link>
            </p>
            <p>
                Forgot your password? <Link href='/reset_password'>Reset your password</Link>
            </p>
        </div>
    );
};

export default UserLogin;
