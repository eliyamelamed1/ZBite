// this page currently is not used (cause we disabled activate email on the backend)
// Test redirect after successful dispatch

import Router, { useRouter } from 'next/router';
import { connect, useDispatch, useSelector } from 'react-redux';

import React from 'react';
import { verify } from '../../redux/actions/auth';

const userActivate = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { isAuthenticatedData } = useSelector((state) => state.authReducer);

    const onSubmit = () => {
        const { UserActivateParams } = router.query;
        const uid = UserActivateParams?.[0];
        const token = UserActivateParams?.[1];
        try {
            dispatch(verify({ uid, token }));
            Router.push('/');
        } catch {
            // TODO - add err msg
        }
    };
    if (isAuthenticatedData === false) Router.push('/');
    return (
        <div data-testid='userActivate'>
            <div>
                <h1>Verify your Account</h1>
                <button onClick={onSubmit} type='button'>
                    Verify
                </button>
            </div>
        </div>
    );
};

export default connect()(userActivate);
