import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetPasswordConfirmAction } from '../actions/auth';

const resetPasswordConfirmPage = (props) => {
    const [requestSent, setRequestSent] = useState(false);

    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: '',
    });

    const { new_password, re_new_password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();

        const { uid } = props.match.params;
        const { token } = props.match.params;

        props.resetPasswordConfirmAction(uid, token, new_password, re_new_password);
        setRequestSent(true);
    };

    if (requestSent) return <Redirect to='/' />;
    return (
        <div data-testid='resetPasswordConfirmPage'>
            <form onSubmit={(e) => onSubmit(e)}>
                <div>
                    <input
                        type='password'
                        placeholder='New password'
                        name='new_password'
                        value={new_password}
                        onChange={(e) => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <div>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Confirm New Password'
                        name='re_new_password'
                        value={re_new_password}
                        onChange={(e) => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <button className='btn btn-primary' type='submit'>
                    Reset Password
                </button>
            </form>
        </div>
    );
};

export default connect(null, { resetPasswordConfirmAction })(resetPasswordConfirmPage);
