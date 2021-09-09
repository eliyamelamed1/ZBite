import {
    REVIEWS_IN_RECIPE_FAIL,
    REVIEWS_IN_RECIPE_SUCCESS,
    REVIEW_CREATE_FAIL,
    REVIEW_CREATE_SUCCESS,
    REVIEW_DELETE_FAIL,
    REVIEW_DELETE_SUCCESS,
} from '../types';

import axios from 'axios';
import { endpointRoute } from '../../globals';

export const reviewCreateAction =
    ({ recipe, stars, comment = '', image = '' }) =>
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
                recipe,
                stars,
                comment,
                image,
            });
            await axios.post(endpointRoute().reviews.create, body, config);
            dispatch({ type: REVIEW_CREATE_SUCCESS });
        } catch {
            dispatch({ type: REVIEW_CREATE_FAIL });
        }
    };

export const reviewDeleteAction =
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
            await axios.post(endpointRoute(id).reviews.delete, config);
            dispatch({ type: REVIEW_DELETE_SUCCESS });
        } catch {
            dispatch({ type: REVIEW_DELETE_FAIL });
        }
    };

export const reviewsInRecipeAction =
    ({ recipe }) =>
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
                recipe,
            });
            const res = await axios.post(endpointRoute().reviews.reviews_in_recipe, body, config);
            dispatch({ type: REVIEWS_IN_RECIPE_SUCCESS, payload: res.data });
        } catch {
            dispatch({ type: REVIEWS_IN_RECIPE_FAIL });
        }
    };
