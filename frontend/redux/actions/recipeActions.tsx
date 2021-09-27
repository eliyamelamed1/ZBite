import {
    CREATE_RECIPE_FAIL,
    CREATE_RECIPE_SUCCESS,
    DELETE_RECIPE_FAIL,
    DELETE_RECIPE_SUCCESS,
    GET_RECIPE_DETAILS_FAIL,
    GET_RECIPE_DETAILS_SUCCESS,
    GET_RECIPE_LIST_FAIL,
    GET_RECIPE_LIST_SUCCESS,
    REVIEWS_IN_RECIPE_FAIL,
    REVIEWS_IN_RECIPE_SUCCESS,
    REVIEW_CREATE_FAIL,
    REVIEW_CREATE_SUCCESS,
    REVIEW_DELETE_FAIL,
    REVIEW_DELETE_SUCCESS,
    SAVE_UNSAVE_ACTION_FAIL,
    SAVE_UNSAVE_ACTION_SUCCESS,
    SEARCH_RECIPE_FAIL,
    SEARCH_RECIPE_SUCCESS,
    UPDATE_RECIPE_FAIL,
    UPDATE_RECIPE_SUCCESS,
} from '../types';

import axios from 'axios';
import { endpointRoute } from '../../globals';
import { loadLoggedUserDataAction } from './userActions';

export const saveRecipeAction =
    ({ recipeId }) =>
    async (dispatch) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Token ${localStorage.getItem('auth_token')}`,
                },
            };
            const body = JSON.stringify({ recipe: recipeId });
            await axios.post(endpointRoute().recipes.save, body, config);
            await dispatch(loadRecipeDetailsAction({ id: recipeId }));
            await dispatch(loadLoggedUserDataAction());
            await dispatch({ type: SAVE_UNSAVE_ACTION_SUCCESS });
        } catch {
            dispatch({ type: SAVE_UNSAVE_ACTION_FAIL });
        }
    };

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

export const reviewCreateAction =
    ({ recipeId, stars, comment = '', image = '' }) =>
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
                recipe: recipeId,
                stars,
                comment,
                image,
            });
            await axios.post(endpointRoute().reviews.create, body, config);
            dispatch({ type: REVIEW_CREATE_SUCCESS });
            await dispatch(reviewsInRecipeAction({ recipeId }));
        } catch {
            dispatch({ type: REVIEW_CREATE_FAIL });
        }
    };

export const reviewDeleteAction =
    ({ reviewId, recipeId }) =>
    async (dispatch) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Token ${localStorage.getItem('auth_token')}`,
                },
            };
            await axios.delete(endpointRoute(reviewId).reviews.delete, config);
            dispatch({ type: REVIEW_DELETE_SUCCESS });
            dispatch(reviewsInRecipeAction({ recipeId }));
        } catch {
            dispatch({ type: REVIEW_DELETE_FAIL });
        }
    };

export const reviewsInRecipeAction =
    ({ recipeId }) =>
    async (dispatch) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            };
            const body = JSON.stringify({
                recipe: recipeId,
            });
            const res = await axios.post(endpointRoute().reviews.reviews_in_recipe, body, config);
            dispatch({ type: REVIEWS_IN_RECIPE_SUCCESS, payload: res.data });
        } catch {
            dispatch({ type: REVIEWS_IN_RECIPE_FAIL });
        }
    };
