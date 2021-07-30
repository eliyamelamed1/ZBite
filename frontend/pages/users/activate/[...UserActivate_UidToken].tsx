// this page currently is not used (cause we disabled activate email on the backend)
// Test redirect after successful dispatch

import Router, { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import React from 'react';
import { userActivateAction } from '../../../redux/actions/user';

const UserActivate = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { isUserAuthenticated } = useSelector((state) => state.userReducer);

    const onSubmit = () => {
        const { UserActivate_UidToken } = router.query;
        const uid = UserActivate_UidToken?.[0];
        const token = UserActivate_UidToken?.[1];
        try {
            dispatch(userActivateAction({ uid, token }));
            Router.push('/');
        } catch {
            // TODO - add err msg
        }
    };
    if (isUserAuthenticated === false) Router.push('/');
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

export default UserActivate;
