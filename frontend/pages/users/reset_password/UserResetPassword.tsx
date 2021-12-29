import React, { useState } from 'react';

import Router from 'next/router';
import { pageRoute } from '../../../enums';
import { resetPasswordAction } from '../../../redux/actions/userActions';
import styles from '../../../styles/pages/resetPassword.module.scss';
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
        } catch {
            // TODO - add err msg
        }
    };

    return (
        <div data-testid='userResetPassword'>
            <div className={styles.background_shape}>
                <span className={styles.welcome_title}>Welcome Back</span>
            </div>
            <section className={styles.content_section}>
                <h1 className={styles.reset_your_password_title}>Request Password Reset:</h1>
                <form onSubmit={(e) => onSubmit(e)} className={styles.reset_password_form}>
                    <input
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={(e) => onChange(e)}
                        className={styles.email_input}
                        required
                    />
                    <button type='submit' className={styles.reset_button}>
                        Send Email Reset
                    </button>
                </form>
            </section>
        </div>
    );
};

export default UserResetPassword;
