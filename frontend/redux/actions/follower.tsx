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
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/followers/follow/`, body, config);
            dispatch({ type: FOLLOW_UNFOLLOW_USER_SUCCESS });
            dispatch(loadUserDetailsAction({ id: user_to_follow }));
            dispatch(loadloggedUserDataAction());
        } catch {
            dispatch({ type: FOLLOW_UNFOLLOW_USER_FAIL });
        }
    };
