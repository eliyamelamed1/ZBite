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
    GET_USER_OWN_RECIPES_LIST_FAIL,
    GET_USER_OWN_RECIPES_LIST_SUCCESS,
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
} from '../constants';

import axiosInstance from '../../utils/axiosInstance';
import { endpointRoute } from '../../enums';
import { loadLoggedUserDataAction } from './userActions';
import { toast } from 'react-toastify';

// recipes
export const recipeDeleteAction =
    ({ id }) =>
    async (dispatch) => {
        try {
            await axiosInstance.delete(endpointRoute(id).recipes.details);
            toast.success('recipe deleted successfully');
            dispatch({ type: DELETE_RECIPE_SUCCESS });
        } catch (err) {
            dispatch({ type: DELETE_RECIPE_FAIL });
        }
    };

export const recipeCreateAction =
    ({
        photoMain = undefined,
        title,
        description,
        cookTime,
        serving,
        ingredientsTextList,
        instructionsTextList,
    }: {
        photoMain: File | undefined;
        title: string;
        description: string;
        cookTime: string;
        serving: string;
        ingredientsTextList: string[];
        instructionsTextList: string[];
    }) =>
    async (dispatch) => {
        try {
            const formData = new FormData();

            photoMain && formData.append('photo_main', photoMain);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('cook_time', cookTime);
            formData.append('serving', serving);
            ingredientsTextList?.forEach((item) => formData.append('ingredients_text_list', item));
            instructionsTextList?.forEach((item) => formData.append('instructions_text_list', item));

            await axiosInstance.post(endpointRoute().recipes.create, formData);
            toast.success('recipe created successfully');
            dispatch({ type: CREATE_RECIPE_SUCCESS });
        } catch (err) {
            dispatch({ type: CREATE_RECIPE_FAIL });
        }
    };

export const recipeUpdateAction =
    ({ id, title, description, serving, cookTime, ingredientsTextList, instructionsTextList, photoMain = undefined }) =>
    async (dispatch) => {
        try {
            const formData = new FormData();

            photoMain && formData.append('photo_main', photoMain);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('cook_time', cookTime);
            formData.append('serving', serving);
            ingredientsTextList?.forEach((item) => formData.append('ingredients_text_list', item));
            instructionsTextList?.forEach((item) => formData.append('instructions_text_list', item));
            const res = await axiosInstance.patch(endpointRoute(id).recipes.details, formData);

            toast.success('recipe updated successfully');
            dispatch({ type: UPDATE_RECIPE_SUCCESS, payload: res.data });
        } catch (err) {
            dispatch({ type: UPDATE_RECIPE_FAIL });
        }
    };

export const loadTrendingRecipesAction = () => async (dispatch) => {
    try {
        const res = await axiosInstance.get(endpointRoute().recipes.trending);
        dispatch({ type: GET_TRENDING_RECIPE_LIST_SUCCESS, payload: res.data });
    } catch (err) {
        dispatch({ type: GET_TRENDING_RECIPE_LIST_FAIL });
    }
};
export const loadFollowedRecipesAction = () => async (dispatch) => {
    try {
        const res = await axiosInstance.get(endpointRoute().recipes.followed);
        dispatch({ type: GET_FOLLOWED_RECIPE_LIST_SUCCESS, payload: res.data });
    } catch (err) {
        dispatch({ type: GET_FOLLOWED_RECIPE_LIST_FAIL });
    }
};
export const loadSavedRecipesAction = () => async (dispatch) => {
    try {
        const res = await axiosInstance.get(endpointRoute().recipes.saved_recipes);
        dispatch({ type: GET_SAVED_RECIPE_LIST_SUCCESS, payload: res.data });
    } catch (err) {
        dispatch({ type: GET_SAVED_RECIPE_LIST_FAIL });
    }
};

export const loadUserOwnRecipesAction =
    ({ user_id }) =>
    async (dispatch) => {
        try {
            const res = await axiosInstance.get(endpointRoute(user_id).recipes.userOwnRecipes);
            dispatch({ type: GET_USER_OWN_RECIPES_LIST_SUCCESS, payload: res.data });
        } catch (err) {
            dispatch({ type: GET_USER_OWN_RECIPES_LIST_FAIL });
        }
    };

export const loadRecipeDetailsAction =
    ({ id }) =>
    async (dispatch) => {
        try {
            const res = await axiosInstance.get(endpointRoute(id).recipes.details);
            dispatch({ type: GET_RECIPE_DETAILS_SUCCESS, payload: res.data });
        } catch (err) {
            dispatch({ type: GET_RECIPE_DETAILS_FAIL });
        }
    };

export const reviewCreateAction =
    ({ recipeId, stars, comment = '' }) =>
    async (dispatch) => {
        try {
            const body = JSON.stringify({
                recipe: recipeId,
                stars,
                comment,
            });
            await axiosInstance.post(endpointRoute().reviews.create, body);
            toast.success('review created successfully');
            dispatch({ type: REVIEW_CREATE_SUCCESS });
            dispatch(reviewsInRecipeAction({ recipeId }));
            dispatch(loadLoggedUserDataAction());
        } catch (err) {
            dispatch({ type: REVIEW_CREATE_FAIL });
        }
    };

export const reviewDeleteAction =
    ({ reviewId, recipeId }) =>
    async (dispatch) => {
        try {
            await axiosInstance.delete(endpointRoute(reviewId).reviews.delete);
            toast.success('review deleted successfully');
            dispatch({ type: REVIEW_DELETE_SUCCESS });
            dispatch(reviewsInRecipeAction({ recipeId }));
            dispatch(loadLoggedUserDataAction());
        } catch (err) {
            dispatch({ type: REVIEW_DELETE_FAIL });
        }
    };

export const reviewsInRecipeAction =
    ({ recipeId }) =>
    async (dispatch) => {
        try {
            const body = JSON.stringify({
                recipe: recipeId,
            });
            const res = await axiosInstance.post(endpointRoute().reviews.reviews_in_recipe, body);
            dispatch({ type: REVIEWS_IN_RECIPE_SUCCESS, payload: res.data });
            await dispatch(loadRecipeDetailsAction({ id: recipeId }));
        } catch (err) {
            dispatch({ type: REVIEWS_IN_RECIPE_FAIL });
        }
    };

// saves
export const saveRecipeAction =
    ({ recipeId }) =>
    async (dispatch) => {
        try {
            const body = JSON.stringify({ recipe: recipeId });
            await axiosInstance.post(endpointRoute().recipes.save, body);
            toast.success('updated saved recipes successfully');
            await dispatch({ type: SAVE_UNSAVE_ACTION_SUCCESS });
            await dispatch(loadRecipeDetailsAction({ id: recipeId }));
            await dispatch(loadLoggedUserDataAction());
        } catch (err) {
            dispatch({ type: SAVE_UNSAVE_ACTION_FAIL });
        }
    };

export const searchRecipeAction = (value) => async (dispatch) => {
    try {
        console.log('dispatched');

        const res = await axiosInstance.get(endpointRoute(value).recipes.search);
        await dispatch({ type: SEARCH_RECIPE_SUCCESS, payload: res.data });
    } catch (err) {
        dispatch({ type: SEARCH_RECIPE_FAIL });
    }
};
