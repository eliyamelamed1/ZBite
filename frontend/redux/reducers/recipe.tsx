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

const initialState = {
    listOfRecipes: null,
    listOfSearchedRecipes: null,
    searchedRecipeData: null,
};

const TEST_CASE_RECIPE = 'TEST_CASE_RECIPE';

export default function recipeReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case TEST_CASE_RECIPE:
            return {
                ...state,
                listOfRecipes: payload.listOfRecipes,
                listOfSearchedRecipes: payload.listOfSearchedRecipes,
                searchedRecipeData: payload.searchedRecipeData,
            };
        case GET_RECIPE_LIST_SUCCESS: //
            return { ...state, listOfRecipes: payload };
        case SEARCH_RECIPE_SUCCESS:
            return { ...state, listOfSearchedRecipes: payload };
        case UPDATE_RECIPE_SUCCESS: //
        case GET_RECIPE_DETAILS_SUCCESS: //
            return { ...state, searchedRecipeData: payload };
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
