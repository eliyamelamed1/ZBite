import {
    LOAD_RECIPE_DETAILS_FAIL,
    LOAD_RECIPE_DETAILS_SUCCESS,
    LOAD_RECIPE_LIST_FAIL,
    LOAD_RECIPE_LIST_SUCCESS,
    RECIPE_CREATED_FAIL,
    RECIPE_CREATED_SUCCESS,
    RECIPE_DELETED_FAIL,
    RECIPE_DELETED_SUCCESS,
    RECIPE_SEARCH_FAIL,
    RECIPE_SEARCH_SUCCESS,
    RECIPE_UPDATED_FAIL,
    RECIPE_UPDATED_SUCCESS,
} from '../actions/types';

const initialState = {
    recipeListData: null,
    recipeSearchedListData: null,
    recipeDetailData: null,
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
                recipeDetailData: payload.recipeDetailData,
            };
        case LOAD_RECIPE_LIST_SUCCESS: //
            return { ...state, recipeListData: payload };
        case RECIPE_SEARCH_SUCCESS:
            return { ...state, recipeSearchedListData: payload };
        case RECIPE_UPDATED_SUCCESS: //
        case LOAD_RECIPE_DETAILS_SUCCESS: //
            return { ...state, recipeDetailData: payload };
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
