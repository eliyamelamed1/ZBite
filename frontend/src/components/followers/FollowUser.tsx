import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import UiButton from '../ui/UiButton';
import { followUserAction } from '../../redux/actions/userActions';

const FollowUser: React.FC<{ userToFollow: string }> = ({ userToFollow }) => {
    const dispatch = useDispatch();
    const [buttonText, setButtonText] = useState('follow');
    const { loggedUserData, isUserAuthenticated } = useSelector((state: RootState) => state.userReducer);
    useEffect(() => {
        try {
            const isUserAlreadyFollowed = loggedUserData?.following.includes(userToFollow);
            if (isUserAlreadyFollowed) {
                setButtonText('unfollow');
            } else {
                setButtonText('follow');
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
        <form onSubmit={onSubmit}>
            <UiButton reverse={false}>{buttonText}</UiButton>
        </form>
    );
    return <>{isUserAuthenticated && authLinks}</>;

    // raise error when isUserAuthenticated is true on the client because he is null at the server and true !== null
};

export default FollowUser;
