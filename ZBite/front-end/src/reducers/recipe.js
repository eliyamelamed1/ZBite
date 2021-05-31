import {
    LOAD_RECIPE_LIST_SUCCESS,
    LOAD_RECIPE_LIST_FAIL,
    RECIPE_SEARCH_SUCCESS,
    RECIPE_SEARCH_FAIL,
    LOAD_RECIPE_DETAILS_SUCCESS,
    LOAD_RECIPE_DETAILS_FAIL,
    RECIPE_UPDATED_SUCCESS,
    RECIPE_UPDATED_FAIL,
    RECIPE_CREATED_SUCCESS,
    RECIPE_CREATED_FAIL,
    RECIPE_DELETED_SUCCESS,
    RECIPE_DELETED_FAIL,
} from '../actions/types';

const initialState = {
    recipeListData: null,
    recipeSearchedListData: null,
    recipeDetailState: null,
};

const TEST_CASE_RECIPE = 'TEST_CASE_RECIPE';

export default function recipeReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case TEST_CASE_RECIPE:
            return {
                ...state,
                recipeListData: payload.recipeListData,
                recipeSearchedListData: payload.recipeSearchedListData,
                recipeDetailState: payload.recipeDetailState,
            };
        case LOAD_RECIPE_LIST_SUCCESS: //
            return { ...state, recipeListData: payload };
        case RECIPE_SEARCH_SUCCESS:
            return { ...state, recipeSearchedListData: payload };
        case RECIPE_UPDATED_SUCCESS: //
        case LOAD_RECIPE_DETAILS_SUCCESS: //
            return { ...state, recipeDetailState: payload };
        case RECIPE_DELETED_SUCCESS: //
        case RECIPE_DELETED_FAIL:
        case RECIPE_CREATED_SUCCESS:
        case RECIPE_CREATED_FAIL:
        case RECIPE_UPDATED_FAIL:
        case LOAD_RECIPE_DETAILS_FAIL:
        case LOAD_RECIPE_LIST_FAIL:
        case RECIPE_SEARCH_FAIL:
            return { ...state };
        default:
            return state;
    }
}
