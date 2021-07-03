import {
    LOAD_RECIPE_DETAILS_FAIL,
    LOAD_RECIPE_DETAILS_SUCCESS,
    LOAD_RECIPE_LIST_FAIL,
    LOAD_RECIPE_LIST_SUCCESS,
    RECIPE_CREATED_FAIL,
    RECIPE_CREATED_SUCCESS,
    RECIPE_DELETED_FAIL,
    RECIPE_DELETED_SUCCESS,
    RECIPE_SEARCH_FAIL,
    RECIPE_SEARCH_SUCCESS,
    RECIPE_UPDATED_FAIL,
    RECIPE_UPDATED_SUCCESS,
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
            dispatch({ type: RECIPE_DELETED_SUCCESS });
            window.scrollTo(0, 0);
        } catch {
            dispatch({ type: RECIPE_DELETED_FAIL });
            window.scrollTo(0, 0);
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
            dispatch({ type: RECIPE_CREATED_SUCCESS });
            window.scrollTo(0, 0);
        } catch {
            dispatch({ type: RECIPE_CREATED_FAIL });
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
            dispatch({ type: RECIPE_UPDATED_SUCCESS, payload: res.data });
            window.scrollTo(0, 0);
        } catch {
            dispatch({ type: RECIPE_UPDATED_FAIL });
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
        dispatch({ type: LOAD_RECIPE_LIST_SUCCESS, payload: res.data });
    } catch {
        dispatch({ type: LOAD_RECIPE_LIST_FAIL });
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
            dispatch({ type: RECIPE_SEARCH_SUCCESS, payload: res.data });
            window.scrollTo(0, 0);
        } catch {
            dispatch({ type: RECIPE_SEARCH_FAIL });
            window.scrollTo(0, 0);
        }
    };

export const loadRecipeDetailsAction = (id) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/recipes/${id}/`, config);
        dispatch({ type: LOAD_RECIPE_DETAILS_SUCCESS, payload: res.data });
    } catch {
        dispatch({ type: LOAD_RECIPE_DETAILS_FAIL });
    }
};
