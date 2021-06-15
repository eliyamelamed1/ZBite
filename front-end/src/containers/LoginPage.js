import { Link, Redirect } from 'react-router-dom';
import React, { useState } from 'react';

import { connect } from 'react-redux';
import { loginAction } from '../redux/actions/auth';

const loginPage = ({ loginAction, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        // TODO - check about this command
        e.preventDefault();

        loginAction(email, password);
    };

    if (isAuthenticated) return <Redirect exact to='/' />;

    return (
        <div data-testid='loginPage'>
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
                <button type='Submit'>Login</button>
            </form>
            <p>
                Do not have an account? <Link to='/signup'>Sign Up</Link>
            </p>
            <p>
                Forgot your password? <Link to='/reset_password'>Reset your password</Link>
            </p>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, { loginAction })(loginPage);
