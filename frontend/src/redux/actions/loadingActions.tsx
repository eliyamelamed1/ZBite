import { SET_LOADING } from '../types';

export const setLoadingAction = (value: boolean) => async (dispatch) => {
    try {
        await console.log(123);
        dispatch({ type: SET_LOADING, payload: value });
    } catch {}
};
