import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { followUnFollowAction } from '../../redux/actions/follower';

const FollowUnFollow = ({ user_followed }) => {
    const dispatch = useDispatch();
    const [button, setButton] = useState('follow');
    const { loggedUserData } = useSelector((state) => state.userReducer);

    useEffect(() => {
        if (loggedUserData?.following.includes(user_followed)) {
            setButton('unfollow');
        } else {
            setButton('follow');
        }
    }, [dispatch, loggedUserData, user_followed]);

    const onSubmit = (e) => {
        e.preventDefault();
        try {
            dispatch(followUnFollowAction({ user_followed }));
        } catch {}
    };
    return (
        <div data-testid='followUnFollow'>
            <form onSubmit={(e) => onSubmit(e)}>
                <button>{button}</button>
            </form>
        </div>
    );
};

export default FollowUnFollow;
