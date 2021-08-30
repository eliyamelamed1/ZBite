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
} from '../types';

import axios from 'axios';
import { endpointRoute } from '../../globals';

export const recipeDeleteAction =
    ({ id }) =>
    async (dispatch) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Token ${localStorage.getItem('auth_token')}`,
                },
            };

            await axios.delete(endpointRoute(id).recipes.details, config);
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
                    Accept: 'application/json',
                    Authorization: `Token ${localStorage.getItem('auth_token')}`,
                },
            };

            const body = JSON.stringify({
                title,
                description,
                flavor_type,
            });
            await axios.post(endpointRoute().recipes.create, body, config);
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
                Accept: 'application/json',

                Authorization: `Token ${localStorage.getItem('auth_token')}`,
            },
        };

        try {
            const body = JSON.stringify({
                title,
                description,
                flavor_type,
            });
            const res = await axios.patch(endpointRoute(id).recipes.details, body, config);
            dispatch({ type: UPDATE_RECIPE_SUCCESS, payload: res.data });
        } catch {
            dispatch({ type: UPDATE_RECIPE_FAIL });
        }
    };

export const loadRecipeListAction = () => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    };
    try {
        const res = await axios.get(endpointRoute().recipes.list, config);
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
                Accept: 'application/json',
            },
        };

        try {
            const res = await axios.post(endpointRoute().recipes.search, { flavor_type }, config);
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
                Accept: 'application/json',
            },
        };

        try {
            const res = await axios.get(endpointRoute(id).recipes.details, config);
            dispatch({ type: GET_RECIPE_DETAILS_SUCCESS, payload: res.data });
        } catch {
            dispatch({ type: GET_RECIPE_DETAILS_FAIL });
        }
    };
