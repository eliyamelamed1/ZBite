import { SET_LOADING } from '../constants';

export const setLoadingAction = (value) => (dispatch) => {
    dispatch({ type: SET_LOADING, payload: value });
};
