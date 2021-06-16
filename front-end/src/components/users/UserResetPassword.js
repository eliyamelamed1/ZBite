import React, { useState } from 'react';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetPasswordAction } from '../../redux/actions/auth';

const resetPasswordPage = (props) => {
    const [requestSent, setRequestSent] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
    });

    const { email } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();

        props.resetPasswordAction(email);
        setRequestSent(true);
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

export default connect(null, { resetPasswordAction })(resetPasswordPage);
