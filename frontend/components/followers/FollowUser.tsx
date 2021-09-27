import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { followUserAction } from '../../redux/actions/userActions';

const FollowUser = ({ userToFollow }) => {
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
            dispatch(followUserAction({ user_to_follow: userToFollow }));
        } catch {}
    };

    const authLinks = (
        <form onSubmit={(e) => onSubmit(e)}>
            <button>{button}</button>
        </form>
    );
    return <div data-testid='followUser'>{isUserAuthenticated ? <div>{authLinks}</div> : null}</div>;
    // raise error when isUserAuthenticated is true on the client because he is null at the server and true !== null
};

export default FollowUser;
