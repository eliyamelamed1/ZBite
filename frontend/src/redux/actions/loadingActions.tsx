import { SET_LOADING } from '../types';

export const setLoadingAction = (value) => (dispatch) => {
    dispatch({ type: SET_LOADING, payload: value });
};
