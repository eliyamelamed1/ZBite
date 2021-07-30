import React from 'react';
import { followUnFollowAction } from '../../redux/actions/follower';
import { useDispatch } from 'react-redux';

const FollowUnFollow = ({ user_followed }) => {
    const dispatch = useDispatch();
    const onSubmit = (e) => {
        e.preventDefault();
        try {
            dispatch(followUnFollowAction({ user_followed }));
        } catch {}
    };
    return (
        <div data-testid='followUnFollow'>
            <form onSubmit={(e) => onSubmit(e)}>
                <button>follow</button>
            </form>
        </div>
    );
};

export default FollowUnFollow;
