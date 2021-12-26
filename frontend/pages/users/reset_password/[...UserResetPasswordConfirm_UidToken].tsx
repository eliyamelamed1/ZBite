import React, { useState } from 'react';
import Router, { useRouter } from 'next/router';

import { pageRoute } from '../../../globals';
import { resetPasswordConfirmAction } from '../../../redux/actions/userActions';
import styles from '../../../styles/pages/resetPasswordConfirm.module.scss';
import { useDispatch } from 'react-redux';

const UserResetPasswordConfirm = () => {
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
            }
        } catch {
            // TODO - add err msg
        }
    };

    return (
        <div data-testid='userResetPasswordConfirm'>
            <div className={styles.background_shape}>
                <h1 className={styles.welcome_title}>Welcome Back</h1>
            </div>
            <section className={styles.content_section}>
                <h1 className={styles.reset_your_password_title}>Reset Your Password</h1>
                <form onSubmit={(e) => onSubmit(e)} className={styles.reset_password_form}>
                    <input
                        type='password'
                        placeholder='New password'
                        name='new_password'
                        value={new_password}
                        onChange={(e) => onChange(e)}
                        minLength='6'
                        className={styles.password_input}
                        required
                    />
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Confirm New Password'
                        name='re_new_password'
                        value={re_new_password}
                        onChange={(e) => onChange(e)}
                        minLength='6'
                        className={styles.password_input}
                        required
                    />
                    <button type='submit' className={styles.reset_button}>
                        Reset Password
                    </button>
                </form>
            </section>
        </div>
    );
};

export default UserResetPasswordConfirm;
