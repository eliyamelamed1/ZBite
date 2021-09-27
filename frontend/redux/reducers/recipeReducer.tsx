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
    TEST_CASE_RECIPE,
    UPDATE_RECIPE_FAIL,
    UPDATE_RECIPE_SUCCESS,
} from '../types';

const initialState = {
    listOfRecipes: null,
    listOfSearchedRecipes: null,
    requestedRecipeData: null,
    listOfFilteredReviews: null,
};

export default function recipeReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case TEST_CASE_RECIPE:
            return {
                ...state,
                listOfRecipes: payload.listOfRecipes,
                listOfSearchedRecipes: payload.listOfSearchedRecipes,
                requestedRecipeData: payload.requestedRecipeData,
                listOfFilteredReviews: payload.listOfFilteredReviews,
            };
        case GET_RECIPE_LIST_SUCCESS: //
            return { ...state, listOfRecipes: payload };
        case SEARCH_RECIPE_SUCCESS:
            return { ...state, listOfSearchedRecipes: payload };
        case UPDATE_RECIPE_SUCCESS: //
        case GET_RECIPE_DETAILS_SUCCESS: //
            return { ...state, requestedRecipeData: payload };
        case REVIEWS_IN_RECIPE_SUCCESS:
            return { ...state, listOfFilteredReviews: payload };
        case REVIEWS_IN_RECIPE_FAIL:
        case REVIEW_DELETE_SUCCESS:
        case REVIEW_DELETE_FAIL:
        case REVIEW_CREATE_SUCCESS:
        case REVIEW_CREATE_FAIL:
        case DELETE_RECIPE_SUCCESS: //
        case DELETE_RECIPE_FAIL:
        case CREATE_RECIPE_SUCCESS:
        case CREATE_RECIPE_FAIL:
        case UPDATE_RECIPE_FAIL:
        case GET_RECIPE_DETAILS_FAIL:
        case GET_RECIPE_LIST_FAIL:
        case SEARCH_RECIPE_FAIL:
        case SAVE_UNSAVE_ACTION_FAIL:
        case SAVE_UNSAVE_ACTION_SUCCESS:
            return { ...state };
        default:
            return state;
    }
}
