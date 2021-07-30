import { FOLLOW_UNFOLLOW_USER_FAIL, FOLLOW_UNFOLLOW_USER_SUCCESS } from '../types';

import axios from 'axios';
import { loadUserDetailsAction } from './auth';

export const followUnFollowAction =
    ({ user_followed }) =>
    async (dispatch) => {
        try {
            const config = {
                headers: {
                    'content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Token ${localStorage.getItem('auth_token')}`,
                },
            };
            const body = JSON.stringify({ user_followed });
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/followers/follow/`, body, config);
            dispatch({ type: FOLLOW_UNFOLLOW_USER_SUCCESS, payload: res.data });
            dispatch(loadUserDetailsAction({ id: user_followed }));
        } catch {
            dispatch({ type: FOLLOW_UNFOLLOW_USER_FAIL });
        }
    };
