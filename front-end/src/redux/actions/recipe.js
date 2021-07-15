import {
    CREATE_RECIPE_FAIL,
    CREATE_RECIPE_SUCCESS,
    DELETE_RECIPE_FAIL,
    DELETE_RECIPE_SUCCESS,
    GET_RECIPE_DETAILS_FAIL,
    GET_RECIPE_DETAILS_SUCCESS,
    GET_RECIPE_LIST_FAIL,
    GET_RECIPE_LIST_SUCCESS,
    SEARCH_RECIPE_FAIL,
    SEARCH_RECIPE_SUCCESS,
    UPDATE_RECIPE_FAIL,
    UPDATE_RECIPE_SUCCESS,
} from './types.js';

import axios from 'axios';

export const recipeDeleteAction =
    ({ id }) =>
    async (dispatch) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${localStorage.getItem('auth_token')}`,
                },
            };

            await axios.delete(`${process.env.REACT_APP_API_URL}/api/recipes/${id}/`, config);
            dispatch({ type: DELETE_RECIPE_SUCCESS });
        } catch {
            dispatch({ type: DELETE_RECIPE_FAIL });
        }
    };

export const recipeCreateAction =
    ({ title, description, flavor_type }) =>
    async (dispatch) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${localStorage.getItem('auth_token')}`,
                },
            };

            const body = JSON.stringify({
                title,
                description,
                flavor_type,
            });
            await axios.post(`${process.env.REACT_APP_API_URL}/api/recipes/create/`, body, config);
            dispatch({ type: CREATE_RECIPE_SUCCESS });
        } catch {
            dispatch({ type: CREATE_RECIPE_FAIL });
        }
    };

export const recipeUpdateAction =
    ({ id, title, description, flavor_type }) =>
    async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('auth_token')}`,
            },
        };

        try {
            const body = JSON.stringify({
                title,
                description,
                flavor_type,
            });
            const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/recipes/${id}/`, body, config);
            dispatch({ type: UPDATE_RECIPE_SUCCESS, payload: res.data });
        } catch {
            dispatch({ type: UPDATE_RECIPE_FAIL });
        }
    };

export const loadRecipeListAction = () => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/recipes/list/`, config);
        dispatch({ type: GET_RECIPE_LIST_SUCCESS, payload: res.data });
    } catch {
        dispatch({ type: GET_RECIPE_LIST_FAIL });
    }
};

export const recipeSearchAction =
    ({ flavor_type }) =>
    async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/recipes/search/`,
                { flavor_type },
                config
            );
            dispatch({ type: SEARCH_RECIPE_SUCCESS, payload: res.data });
        } catch {
            dispatch({ type: SEARCH_RECIPE_FAIL });
        }
    };

export const loadRecipeDetailsAction =
    ({ id }) =>
    async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/recipes/${id}/`, config);
            dispatch({ type: GET_RECIPE_DETAILS_SUCCESS, payload: res.data });
        } catch {
            dispatch({ type: GET_RECIPE_DETAILS_FAIL });
        }
    };
