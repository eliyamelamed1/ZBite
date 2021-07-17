import React, { useState } from 'react';

import Router from 'next/router';
import { resetPasswordAction } from '../../../redux/actions/auth';
import { useDispatch } from 'react-redux';

const UserResetPassword = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
    });

    const { email } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        try {
            dispatch(resetPasswordAction({ email }));
            Router.push('/');
        } catch {
            // TODO - add err msg
        }
    };

    return (
        <div data-testid='userResetPassword'>
            <h1>Request Password Reset:</h1>
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
                <button type='submit'>Send Password Reset</button>
            </form>
        </div>
    );
};

export default UserResetPassword;
