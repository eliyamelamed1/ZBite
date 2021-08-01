import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { followUnFollowAction } from '../../redux/actions/follower';

const FollowUnFollow = ({ user_to_follow }) => {
    const dispatch = useDispatch();
    const [button, setButton] = useState('follow');
    const { loggedUserData, isUserAuthenticated } = useSelector((state) => state.userReducer);
    console.log(loggedUserData);
    useEffect(() => {
        try {
            const isUserAlreadyFollowed = loggedUserData?.following.includes(user_to_follow);
            if (isUserAlreadyFollowed) {
                setButton('unfollow');
            } else {
                setButton('follow');
            }
        } catch {}
    }, [dispatch, loggedUserData, user_to_follow]);
    const onSubmit = (e) => {
        e.preventDefault();
        try {
            dispatch(followUnFollowAction({ user_to_follow }));
        } catch {}
    };

    const authLinks = (
        <form onSubmit={(e) => onSubmit(e)}>
            <button>{button}</button>
        </form>
    );

    return <div data-testid='followUnFollow'>{isUserAuthenticated ? <div>{authLinks}</div> : null}</div>;
};

export default FollowUnFollow;
