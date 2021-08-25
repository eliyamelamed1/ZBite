/* TODO 
test cant sign up with password different than re password 
*/

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Link from 'next/link';
import Router from 'next/router';
import { pageRoute } from '../../globals';
import { signupAction } from '../../redux/actions/userActions';

const UserSignup = () => {
    const dispatch = useDispatch();
    const isUserAuthenticated = useSelector((state) => state.userReducer.isUserAuthenticated);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        re_password: '',
    });

    const { name, email, password, re_password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();

        if (password === re_password) {
            try {
                await dispatch(
                    signupAction({
                        name,
                        email,
                        password,
                        re_password,
                    })
                );
                Router.push(pageRoute.login);
            } catch {}
        }
    };

    if (isUserAuthenticated) {
        Router.push(pageRoute.home);
    }

    return (
        <div data-testid='userSignup'>
            <h1>Sign Up</h1>
            <p>Create your Account</p>
            <form onSubmit={(e) => onSubmit(e)}>
                <div>
                    <input
                        type='text'
                        placeholder='Name*'
                        name='name'
                        value={name}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div>
                    <input
                        type='email'
                        placeholder='Email*'
                        name='email'
                        value={email}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div>
                    <input
                        type='password'
                        placeholder='Password*'
                        name='password'
                        value={password}
                        onChange={(e) => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <div>
                    <input
                        type='password'
                        placeholder='Confirm Password*'
                        name='re_password'
                        value={re_password}
                        onChange={(e) => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <button type='submit'>Register</button>
            </form>
            <p>
                Already have an account? <Link href='/UserLogin'>Sign In</Link>
            </p>
        </div>
    );
};

export default UserSignup;
