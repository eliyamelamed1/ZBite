import React, { useState } from 'react';
import Router, { useRouter } from 'next/router';
import { connect, useDispatch } from 'react-redux';

import { resetPasswordConfirmAction } from '../../redux/actions/auth';

const userResetPasswordConfirm = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: '',
    });
    const { new_password, re_new_password } = formData;
    const router = useRouter();

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        try {
            if (new_password == re_new_password) {
                const params = router.query.UserResetPasswordConfirm_UidToken;
                const uid = params?.[0];
                const token = params?.[1];
                dispatch(resetPasswordConfirmAction({ uid, token, new_password }));
                Router.push('/');
            }
        } catch {
            // TODO - add err msg
        }
    };

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
