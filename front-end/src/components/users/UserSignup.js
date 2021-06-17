import { Link, Redirect } from 'react-router-dom';
import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

import { signupAction } from '../../redux/actions/auth';

const userSignup = () => {
    const dispatch = useDispatch();
    const isAuthenticatedData = useSelector((state) => state.authReducer.isAuthenticatedData);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        re_password: '',
    });

    const [accountCreated, setAccountCreated] = useState(false);

    const { name, email, password, re_password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();

        if (password === re_password) {
            try {
                dispatch(
                    signupAction({
                        name,
                        email,
                        password,
                        re_password,
                    })
                );
                setAccountCreated(true);
            } catch {
                window.scrollTo(0, 0);
            }
        }
    };

    if (isAuthenticatedData) return <Redirect to='/' />;
    if (accountCreated) return <Redirect to='/login' />;

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
                Already have an account? <Link to='/login'>Sign In</Link>
            </p>
        </div>
    );
};

export default connect()(userSignup);
