import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import { Redirect } from 'react-router-dom';
import { resetPasswordConfirmAction } from '../../redux/actions/auth';

const userResetPasswordConfirm = (props) => {
    const dispatch = useDispatch();
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: '',
    });
    const { uid } = props.match;
    console.log(uid);
    const { new_password, re_new_password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        try {
            if (new_password == re_new_password) {
                const { uid } = props.match.params;
                const { token } = props.match.params;
                dispatch(resetPasswordConfirmAction({ uid, token, new_password }));
                setRequestSent(true);
            }
        } catch {
            console.log('err');
            // TODO - add err msg
        }
    };

    if (requestSent) return <Redirect to='/' />;
    return (
        <div data-testid='userResetPasswordConfirm'>
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
                <button type='submit'>Reset Password</button>
            </form>
        </div>
    );
};

export default connect()(userResetPasswordConfirm);
