import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { followUnFollowAction } from '../../redux/actions/follower';

const FollowUnFollow = ({ userToFollow }) => {
    const dispatch = useDispatch();
    const [button, setButton] = useState('follow');
    const { loggedUserData, isUserAuthenticated } = useSelector((state) => state.userReducer);
    useEffect(() => {
        try {
            const isUserAlreadyFollowed = loggedUserData?.following.includes(userToFollow);
            if (isUserAlreadyFollowed) {
                setButton('unfollow');
            } else {
                setButton('follow');
            }
        } catch {}
    }, [dispatch, loggedUserData, userToFollow]);
    const onSubmit = (e) => {
        e.preventDefault();
        try {
            dispatch(followUnFollowAction({ user_to_follow: userToFollow }));
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
