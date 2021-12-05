import {
    CREATE_RECIPE_FAIL,
    CREATE_RECIPE_SUCCESS,
    DELETE_RECIPE_FAIL,
    DELETE_RECIPE_SUCCESS,
    GET_FOLLOWED_RECIPE_LIST_FAIL,
    GET_FOLLOWED_RECIPE_LIST_SUCCESS,
    GET_RECIPE_DETAILS_FAIL,
    GET_RECIPE_DETAILS_SUCCESS,
    GET_SAVED_RECIPE_LIST_FAIL,
    GET_SAVED_RECIPE_LIST_SUCCESS,
    GET_TRENDING_RECIPE_LIST_FAIL,
    GET_TRENDING_RECIPE_LIST_SUCCESS,
    INGREDIENT_CREATE_FAIL,
    INGREDIENT_CREATE_SUCCESS,
    INGREDIENT_DELETE_FAIL,
    INGREDIENT_DELETE_SUCCESS,
    INGREDIENT_UPDATE_FAIL,
    INGREDIENT_UPDATE_SUCCESS,
    INSTRUCTION_CREATE_FAIL,
    INSTRUCTION_CREATE_SUCCESS,
    INSTRUCTION_DELETE_FAIL,
    INSTRUCTION_DELETE_SUCCESS,
    INSTRUCTION_UPDATE_FAIL,
    INSTRUCTION_UPDATE_SUCCESS,
    REVIEWS_IN_RECIPE_FAIL,
    REVIEWS_IN_RECIPE_SUCCESS,
    REVIEW_CREATE_FAIL,
    REVIEW_CREATE_SUCCESS,
    REVIEW_DELETE_FAIL,
    REVIEW_DELETE_SUCCESS,
    SAVE_UNSAVE_ACTION_FAIL,
    SAVE_UNSAVE_ACTION_SUCCESS,
    UPDATE_RECIPE_FAIL,
    UPDATE_RECIPE_SUCCESS,
} from '../types';

import axios from 'axios';
import { endpointRoute } from '../../globals';
import { loadLoggedUserDataAction } from './userActions';

// recipes
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
    ({ photoMain, title, description, cookTime, serving }) =>
    async (dispatch) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Token ${localStorage.getItem('auth_token')}`,
                },
            };

            const formData = new FormData();

            formData.append('photo_main', photoMain);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('cook_time', cookTime);
            formData.append('serving', serving);

            const { data } = await axios.post(endpointRoute().recipes.create, formData, config);
            dispatch({ type: CREATE_RECIPE_SUCCESS });

            const recipeId = data.id;
            return recipeId;
        } catch {
            dispatch({ type: CREATE_RECIPE_FAIL });
        }
    };

export const recipeUpdateAction =
    ({ id, title, description }) =>
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
            });
            const res = await axios.patch(endpointRoute(id).recipes.details, body, config);
            dispatch({ type: UPDATE_RECIPE_SUCCESS, payload: res.data });
        } catch {
            dispatch({ type: UPDATE_RECIPE_FAIL });
        }
    };

export const loadTrendingRecipesAction = () => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    };
    try {
        const res = await axios.get(endpointRoute().recipes.trending, config);
        dispatch({ type: GET_TRENDING_RECIPE_LIST_SUCCESS, payload: res.data });
    } catch {
        dispatch({ type: GET_TRENDING_RECIPE_LIST_FAIL });
    }
};
export const loadFollowedRecipesAction = () => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Token ${localStorage.getItem('auth_token')}`,
        },
    };
    try {
        const res = await axios.get(endpointRoute().recipes.followed, config);
        dispatch({ type: GET_FOLLOWED_RECIPE_LIST_SUCCESS, payload: res.data });
    } catch {
        dispatch({ type: GET_FOLLOWED_RECIPE_LIST_FAIL });
    }
};
export const loadSavedRecipesAction = () => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Token ${localStorage.getItem('auth_token')}`,
        },
    };
    try {
        const res = await axios.get(endpointRoute().recipes.saved_recipes, config);
        dispatch({ type: GET_SAVED_RECIPE_LIST_SUCCESS, payload: res.data });
    } catch {
        dispatch({ type: GET_SAVED_RECIPE_LIST_FAIL });
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

// saves
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

// ingredients
export const ingredientCreateAction =
    ({ recipeId, textList }) =>
    async (dispatch) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Token ${localStorage.getItem('auth_token')}`,
                },
            };
            const body = JSON.stringify({ recipe: recipeId, text_list: textList });
            await axios.post(endpointRoute().ingredients.create, body, config);
            await dispatch({ type: INGREDIENT_CREATE_SUCCESS });
        } catch {
            dispatch({ type: INGREDIENT_CREATE_FAIL });
        }
    };

export const ingredientUpdateAction =
    ({ recipeId, textList }) =>
    async (dispatch) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Token ${localStorage.getItem('auth_token')}`,
                },
            };
            const body = JSON.stringify({ recipe: recipeId, text_list: textList });
            await axios.patch(endpointRoute().ingredients.detail, body, config);
            await dispatch({ type: INGREDIENT_UPDATE_SUCCESS });
        } catch {
            dispatch({ type: INGREDIENT_UPDATE_FAIL });
        }
    };

export const ingredientDeleteAction = () => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Token ${localStorage.getItem('auth_token')}`,
            },
        };
        await axios.delete(endpointRoute().ingredients.detail, config);
        await dispatch({ type: INGREDIENT_DELETE_SUCCESS });
    } catch {
        dispatch({ type: INGREDIENT_DELETE_FAIL });
    }
};

// instructions
export const instructionCreateAction =
    ({ recipeId, textList, imageList = [''] }) =>
    async (dispatch) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Token ${localStorage.getItem('auth_token')}`,
                },
            };
            const body = JSON.stringify({ recipe: recipeId, text_list: textList, image_list: imageList });
            await axios.post(endpointRoute().instructions.create, body, config);
            await dispatch({ type: INSTRUCTION_CREATE_SUCCESS });
        } catch {
            dispatch({ type: INSTRUCTION_CREATE_FAIL });
        }
    };
export const instructionUpdateAction =
    ({ recipeId, textList, imageList = '' }) =>
    async (dispatch) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Token ${localStorage.getItem('auth_token')}`,
                },
            };
            const body = JSON.stringify({ recipe: recipeId, text_list: textList, image_list: imageList });
            await axios.patch(endpointRoute().instructions.detail, body, config);
            await dispatch({ type: INSTRUCTION_UPDATE_SUCCESS });
        } catch {
            dispatch({ type: INSTRUCTION_UPDATE_FAIL });
        }
    };
export const instructionDeleteAction = () => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Token ${localStorage.getItem('auth_token')}`,
            },
        };
        await axios.delete(endpointRoute().instructions.detail, config);
        await dispatch({ type: INSTRUCTION_DELETE_SUCCESS });
    } catch {
        dispatch({ type: INSTRUCTION_DELETE_FAIL });
    }
};
