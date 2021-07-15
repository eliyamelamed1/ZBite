import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import { Redirect } from 'react-router-dom';
import { resetPasswordAction } from '../../redux/actions/auth';

const userResetPassword = () => {
    const dispatch = useDispatch();
    const [requestSent, setRequestSent] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
    });

    const { email } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        try {
            dispatch(resetPasswordAction({ email }));
            setRequestSent(true);
        } catch {
            // TODO - add err msg
        }
    };

    if (requestSent) return <Redirect to='/' />;

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

export default connect()(userResetPassword);
