import { FOLLOW_UNFOLLOW_USER_FAIL, FOLLOW_UNFOLLOW_USER_SUCCESS } from '../types';
import { loadUserDetailsAction, loadloggedUserDataAction } from './user';

import axios from 'axios';

export const followUnFollowAction =
    ({ user_to_follow }) =>
    async (dispatch) => {
        try {
            const config = {
                headers: {
                    'content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Token ${localStorage.getItem('auth_token')}`,
                },
            };
            const body = JSON.stringify({ user_to_follow });
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/followers/follow/`, body, config);
            // if (res.data === 'followed')
            // dispatch type FOLLOW_USER_SUCCESS => (add user to loggedUserData.following)
            // else
            // dispatch type UNFOLLOW_USER_SUCCESS => (remove user from loggedUserData.following)
            dispatch({ type: FOLLOW_UNFOLLOW_USER_SUCCESS, payload: res.data });
            dispatch(loadUserDetailsAction({ id: user_to_follow }));
            dispatch(loadloggedUserDataAction());
        } catch {
            dispatch({ type: FOLLOW_UNFOLLOW_USER_FAIL });
        }
    };
