import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { followUnFollowAction } from '../../redux/actions/userActions';

const FollowUnFollow = ({ userToFollow, setUserData }) => {
    const dispatch = useDispatch();
    const [button, setButton] = useState('follow');
    const { requestedUserData, loggedUserData, isUserAuthenticated } = useSelector((state) => state.userReducer);

    useEffect(() => {
        // TODO - need to be tested
        if (requestedUserData?.id == userToFollow) {
            setUserData(requestedUserData);
        }
    }, [requestedUserData, userToFollow, setUserData]);

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
    // raise error when isUserAuthenticated is true on the client because he is null at the server and true !== null
};

export default FollowUnFollow;
