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
} from '../actions/types';

import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
    recipeListData: null,
    recipeSearchedListData: null,
    recipeDetailData: null,
};

const TEST_CASE_RECIPE = 'TEST_CASE_RECIPE';

export default function recipeReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case HYDRATE:
            return { ...state, ...action.payload };
        case TEST_CASE_RECIPE:
            return {
                ...state,
                recipeListData: payload.recipeListData,
                recipeSearchedListData: payload.recipeSearchedListData,
                recipeDetailData: payload.recipeDetailData,
            };
        case GET_RECIPE_LIST_SUCCESS: //
            return { ...state, recipeListData: payload };
        case SEARCH_RECIPE_SUCCESS:
            return { ...state, recipeSearchedListData: payload };
        case UPDATE_RECIPE_SUCCESS: //
        case GET_RECIPE_DETAILS_SUCCESS: //
            return { ...state, recipeDetailData: payload };
        case DELETE_RECIPE_SUCCESS: //
        case DELETE_RECIPE_FAIL:
        case CREATE_RECIPE_SUCCESS:
        case CREATE_RECIPE_FAIL:
        case UPDATE_RECIPE_FAIL:
        case GET_RECIPE_DETAILS_FAIL:
        case GET_RECIPE_LIST_FAIL:
        case SEARCH_RECIPE_FAIL:
            return { ...state };
        default:
            return state;
    }
}
