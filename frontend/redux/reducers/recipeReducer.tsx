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
    TEST_CASE_RECIPE,
    UPDATE_RECIPE_FAIL,
    UPDATE_RECIPE_SUCCESS,
} from '../types';

const initialState = {
    listOfSearchedRecipes: null,
    requestedRecipeData: null,
    listOfFilteredReviews: null,
    listOfTrendingRecipes: null,
    listOfFollowedRecipes: null,
    listOfSavedRecipes: null,
};

export default function recipeReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case TEST_CASE_RECIPE:
            return {
                ...state,
                listOfSearchedRecipes: payload.listOfSearchedRecipes,
                requestedRecipeData: payload.requestedRecipeData,
                listOfFilteredReviews: payload.listOfFilteredReviews,
                listOfTrendingRecipes: payload.listOfTrendingRecipes,
                listOfFollowedRecipes: payload.listOfFollowedRecipes,
                listOfSavedRecipes: payload.listOfSavedRecipes,
            };
        case UPDATE_RECIPE_SUCCESS: //
        case GET_RECIPE_DETAILS_SUCCESS: //
            return { ...state, requestedRecipeData: payload };
        case REVIEWS_IN_RECIPE_SUCCESS:
            return { ...state, listOfFilteredReviews: payload };
        case GET_TRENDING_RECIPE_LIST_SUCCESS:
            return { ...state, listOfTrendingRecipes: payload };
        case GET_FOLLOWED_RECIPE_LIST_SUCCESS:
            return { ...state, listOfFollowedRecipes: payload };
        case GET_SAVED_RECIPE_LIST_SUCCESS:
            return { ...state, listOfSavedRecipes: payload };
        case REVIEWS_IN_RECIPE_FAIL:
        case REVIEW_DELETE_SUCCESS:
        case REVIEW_DELETE_FAIL:
        case REVIEW_CREATE_SUCCESS:
        case REVIEW_CREATE_FAIL:
        case DELETE_RECIPE_SUCCESS:
        case DELETE_RECIPE_FAIL:
        case CREATE_RECIPE_SUCCESS:
        case CREATE_RECIPE_FAIL:
        case GET_SAVED_RECIPE_LIST_FAIL:
        case UPDATE_RECIPE_FAIL:
        case GET_RECIPE_DETAILS_FAIL:
        case GET_FOLLOWED_RECIPE_LIST_FAIL:
        case GET_TRENDING_RECIPE_LIST_FAIL:
        case SAVE_UNSAVE_ACTION_FAIL:
        case SAVE_UNSAVE_ACTION_SUCCESS:
        case INGREDIENT_CREATE_SUCCESS:
        case INGREDIENT_CREATE_FAIL:
        case INGREDIENT_UPDATE_SUCCESS:
        case INGREDIENT_UPDATE_FAIL:
        case INGREDIENT_DELETE_SUCCESS:
        case INGREDIENT_DELETE_FAIL:
        case INSTRUCTION_CREATE_SUCCESS:
        case INSTRUCTION_CREATE_FAIL:
        case INSTRUCTION_UPDATE_SUCCESS:
        case INSTRUCTION_UPDATE_FAIL:
        case INSTRUCTION_DELETE_SUCCESS:
        case INSTRUCTION_DELETE_FAIL:
            return { ...state };
        default:
            return state;
    }
}
