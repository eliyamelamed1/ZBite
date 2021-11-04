// TODO - improve this tests
// TODO - after each test reset initiaLState

import '@testing-library/jest-dom/extend-expect';

import {
    CREATE_RECIPE_FAIL,
    CREATE_RECIPE_SUCCESS,
    DELETE_RECIPE_FAIL,
    DELETE_RECIPE_SUCCESS,
    GET_FOLLOWED_RECIPE_LIST_FAIL,
    GET_FOLLOWED_RECIPE_LIST_SUCCESS,
    GET_RECIPE_DETAILS_FAIL,
    GET_RECIPE_DETAILS_SUCCESS,
    GET_RECIPE_LIST_FAIL,
    GET_RECIPE_LIST_SUCCESS,
    GET_TRENDING_RECIPE_LIST_FAIL,
    GET_TRENDING_RECIPE_LIST_SUCCESS,
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
} from '../../../redux/types';

import { cleanup } from '@testing-library/react';
import store from '../../../redux/store';

const updatedState = {
    listOfRecipes: 'updatedState',
    listOfSearchedRecipes: 'updatedState',
    requestedRecipeData: 'updatedState',
    listOfFilteredReviews: 'updatedState',
    listOfTrendingRecipes: 'updatedState',
    listOfFollowedRecipes: 'updatedState',
};

describe('recipeReducers - cases that modify the state', () => {
    let initialState;
    beforeEach(() => {
        cleanup();
        jest.clearAllMocks();
        initialState = {
            listOfRecipes: null,
            listOfSearchedRecipes: null,
            requestedRecipeData: null,
            listOfFilteredReviews: null,
            listOfTrendingRecipes: null,
            listOfFollowedRecipes: null,
        };
        store.dispatch({ type: 'TEST_CASE_RECIPE', payload: initialState });
        return initialState;
    });

    test('case SEARCH_RECIPE_SUCCESS', () => {
        store.dispatch({ type: SEARCH_RECIPE_SUCCESS, payload: updatedState.listOfSearchedRecipes });
        const storeState = store.getState();

        expect(storeState.recipeReducer.listOfRecipes).toBeNull();
        expect(storeState.recipeReducer.listOfSearchedRecipes).toStrictEqual(updatedState.listOfSearchedRecipes);
        expect(storeState.recipeReducer.requestedRecipeData).toBeNull();
        expect(storeState.recipeReducer.listOfFilteredReviews).toBeNull();
    });
    test('case GET_RECIPE_DETAILS_SUCCESS', () => {
        store.dispatch({ type: GET_RECIPE_DETAILS_SUCCESS, payload: updatedState.requestedRecipeData });
        const storeState = store.getState();

        expect(storeState.recipeReducer.listOfRecipes).toBeNull();
        expect(storeState.recipeReducer.requestedRecipeData).toStrictEqual(updatedState.requestedRecipeData);
        expect(storeState.recipeReducer.listOfSearchedRecipes).toBeNull();
        expect(storeState.recipeReducer.listOfFilteredReviews).toBeNull();
    });
    test('case UPDATE_RECIPE_SUCCESS', () => {
        store.dispatch({ type: UPDATE_RECIPE_SUCCESS, payload: updatedState.requestedRecipeData });
        const storeState = store.getState();

        expect(storeState.recipeReducer.listOfRecipes).toBeNull();
        expect(storeState.recipeReducer.listOfSearchedRecipes).toBeNull();
        expect(storeState.recipeReducer.requestedRecipeData).toStrictEqual(updatedState.requestedRecipeData);
        expect(storeState.recipeReducer.listOfFilteredReviews).toBeNull();
    });
    test('case REVIEWS_IN_RECIPE_SUCCESS', () => {
        store.dispatch({ type: REVIEWS_IN_RECIPE_SUCCESS, payload: updatedState.listOfFilteredReviews });
        const storeState = store.getState();

        expect(storeState.recipeReducer.listOfRecipes).toBeNull();
        expect(storeState.recipeReducer.listOfSearchedRecipes).toBeNull();
        expect(storeState.recipeReducer.requestedRecipeData).toBeNull();
        expect(storeState.recipeReducer.listOfFilteredReviews).toStrictEqual(updatedState.listOfFilteredReviews);
    });
    test('case GET_RECIPE_LIST_SUCCESS', () => {
        store.dispatch({ type: GET_RECIPE_LIST_SUCCESS, payload: updatedState.listOfRecipes });
        const storeState = store.getState();

        expect(storeState.recipeReducer.listOfRecipes).toStrictEqual(updatedState.listOfRecipes);
        expect(storeState.recipeReducer.listOfSearchedRecipes).toBeNull();
        expect(storeState.recipeReducer.requestedRecipeData).toBeNull();
        expect(storeState.recipeReducer.listOfFilteredReviews).toBeNull();
    });
    test('case GET_TRENDING_RECIPE_LIST_SUCCESS', () => {
        store.dispatch({ type: GET_TRENDING_RECIPE_LIST_SUCCESS, payload: updatedState.listOfTrendingRecipes });
        const storeState = store.getState();

        expect(storeState.recipeReducer.listOfRecipes).toBeNull();
        expect(storeState.recipeReducer.listOfSearchedRecipes).toBeNull();
        expect(storeState.recipeReducer.requestedRecipeData).toBeNull();
        expect(storeState.recipeReducer.listOfFilteredReviews).toBeNull();
        expect(storeState.recipeReducer.listOfFollowedRecipes).toBeNull();
        expect(storeState.recipeReducer.listOfTrendingRecipes).toStrictEqual(updatedState.listOfTrendingRecipes);
    });
    test('case GET_FOLLOWED_RECIPE_LIST_SUCCESS', () => {
        store.dispatch({ type: GET_FOLLOWED_RECIPE_LIST_SUCCESS, payload: updatedState.listOfFollowedRecipes });
        const storeState = store.getState();

        expect(storeState.recipeReducer.listOfRecipes).toBeNull();
        expect(storeState.recipeReducer.listOfSearchedRecipes).toBeNull();
        expect(storeState.recipeReducer.requestedRecipeData).toBeNull();
        expect(storeState.recipeReducer.listOfFilteredReviews).toBeNull();
        expect(storeState.recipeReducer.listOfTrendingRecipes).toBeNull();
        expect(storeState.recipeReducer.listOfFollowedRecipes).toStrictEqual(updatedState.listOfFollowedRecipes);
    });
});

describe('recipeReducers - cases that return ...state => state should not be modified', () => {
    let initialState;
    beforeEach(() => {
        cleanup();
        jest.clearAllMocks();
        initialState = {
            listOfRecipes: null,
            listOfSearchedRecipes: null,
            requestedRecipeData: null,
            listOfFilteredReviews: null,
        };
        store.dispatch({ type: 'TEST_CASE_RECIPE', payload: initialState });
        return initialState;
    });
    afterEach(() => {
        const storeState = store.getState();
        expect(storeState.recipeReducer).toEqual(initialState);
    });
    test('case DELETE_RECIPE_SUCCESS ', () => {
        store.dispatch({ type: DELETE_RECIPE_SUCCESS, payload: updatedState });
    });

    test('case DELETE_RECIPE_FAIL ', () => {
        store.dispatch({ type: DELETE_RECIPE_FAIL, payload: updatedState });
    });
    test('case CREATE_RECIPE_SUCCESS ', () => {
        store.dispatch({ type: CREATE_RECIPE_SUCCESS, payload: updatedState });
    });
    test('case CREATE_RECIPE_FAIL ', () => {
        store.dispatch({ type: CREATE_RECIPE_FAIL, payload: updatedState });
    });
    test('case UPDATE_RECIPE_FAIL ', () => {
        store.dispatch({ type: UPDATE_RECIPE_FAIL, payload: updatedState });
    });
    test('case GET_RECIPE_DETAILS_FAIL ', () => {
        store.dispatch({ type: GET_RECIPE_DETAILS_FAIL, payload: updatedState });
    });
    test('case GET_RECIPE_LIST_FAIL ', () => {
        store.dispatch({ type: GET_RECIPE_LIST_FAIL, payload: updatedState });
    });
    test('case SEARCH_RECIPE_FAIL ', () => {
        store.dispatch({ type: SEARCH_RECIPE_FAIL, payload: updatedState });
    });
    test('case REVIEW_CREATE_SUCCESS ', () => {
        store.dispatch({ type: REVIEW_CREATE_SUCCESS, payload: updatedState });
    });
    test('case REVIEW_CREATE_FAIL ', () => {
        store.dispatch({ type: REVIEW_CREATE_FAIL, payload: updatedState });
    });
    test('case REVIEW_DELETE_SUCCESS ', () => {
        store.dispatch({ type: REVIEW_DELETE_SUCCESS, payload: updatedState });
    });
    test('case REVIEW_DELETE_FAIL ', () => {
        store.dispatch({ type: REVIEW_DELETE_FAIL, payload: updatedState });
    });
    test('case REVIEWS_IN_RECIPE_FAIL ', () => {
        store.dispatch({ type: REVIEWS_IN_RECIPE_FAIL, payload: updatedState });
    });
    test('case SAVE_UNSAVE_ACTION_FAIL ', () => {
        store.dispatch({ type: SAVE_UNSAVE_ACTION_FAIL, payload: updatedState });
    });
    test('case GET_FOLLOWED_RECIPE_LIST_FAIL ', () => {
        store.dispatch({ type: GET_FOLLOWED_RECIPE_LIST_FAIL, payload: updatedState });
    });
    test('case GET_TRENDING_RECIPE_LIST_FAIL ', () => {
        store.dispatch({ type: GET_TRENDING_RECIPE_LIST_FAIL, payload: updatedState });
    });
    test('case - default', () => {
        store.dispatch({ type: 'default', payload: updatedState });
    });
});
