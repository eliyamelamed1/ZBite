// TODO - improve this tests
// TODO - after each test reset initiaLState

import '@testing-library/jest-dom/extend-expect';

import { cleanup } from '@testing-library/react';
import store from '../../../redux/store';

const updatedState = {
    listOfRecipes: 'updatedState',
    listOfSearchedRecipes: 'updatedState',
    requestedRecipeData: 'updatedState',
    listOfFilteredReviews: 'updatedState',
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
        };
        store.dispatch({ type: 'TEST_CASE_RECIPE', payload: initialState });
        return initialState;
    });

    test('case SEARCH_RECIPE_SUCCESS', () => {
        store.dispatch({ type: 'SEARCH_RECIPE_SUCCESS', payload: updatedState.listOfSearchedRecipes });
        const storeState = store.getState();

        expect(storeState.recipeReducer.listOfRecipes).toBeNull();
        expect(storeState.recipeReducer.listOfSearchedRecipes).toStrictEqual(updatedState.listOfSearchedRecipes);
        expect(storeState.recipeReducer.requestedRecipeData).toBeNull();
        expect(storeState.recipeReducer.listOfFilteredReviews).toBeNull();
    });
    test('case GET_RECIPE_DETAILS_SUCCESS', () => {
        store.dispatch({ type: 'GET_RECIPE_DETAILS_SUCCESS', payload: updatedState.requestedRecipeData });
        const storeState = store.getState();

        expect(storeState.recipeReducer.listOfRecipes).toBeNull();
        expect(storeState.recipeReducer.requestedRecipeData).toStrictEqual(updatedState.requestedRecipeData);
        expect(storeState.recipeReducer.listOfSearchedRecipes).toBeNull();
        expect(storeState.recipeReducer.listOfFilteredReviews).toBeNull();
    });
    test('case UPDATE_RECIPE_SUCCESS', () => {
        store.dispatch({ type: 'UPDATE_RECIPE_SUCCESS', payload: updatedState.requestedRecipeData });
        const storeState = store.getState();

        expect(storeState.recipeReducer.listOfRecipes).toBeNull();
        expect(storeState.recipeReducer.listOfSearchedRecipes).toBeNull();
        expect(storeState.recipeReducer.requestedRecipeData).toStrictEqual(updatedState.requestedRecipeData);
        expect(storeState.recipeReducer.listOfFilteredReviews).toBeNull();
    });
    test('case REVIEWS_IN_RECIPE_SUCCESS', () => {
        store.dispatch({ type: 'REVIEWS_IN_RECIPE_SUCCESS', payload: updatedState.listOfFilteredReviews });
        const storeState = store.getState();

        expect(storeState.recipeReducer.listOfRecipes).toBeNull();
        expect(storeState.recipeReducer.listOfSearchedRecipes).toBeNull();
        expect(storeState.recipeReducer.requestedRecipeData).toBeNull();
        expect(storeState.recipeReducer.listOfFilteredReviews).toStrictEqual(updatedState.listOfFilteredReviews);
    });
    test('case GET_RECIPE_LIST_SUCCESS', () => {
        store.dispatch({ type: 'GET_RECIPE_LIST_SUCCESS', payload: updatedState.listOfRecipes });
        const storeState = store.getState();

        expect(storeState.recipeReducer.listOfRecipes).toStrictEqual(updatedState.listOfRecipes);
        expect(storeState.recipeReducer.listOfSearchedRecipes).toBeNull();
        expect(storeState.recipeReducer.requestedRecipeData).toBeNull();
        expect(storeState.recipeReducer.listOfFilteredReviews).toBeNull();
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
        store.dispatch({ type: 'DELETE_RECIPE_SUCCESS', payload: updatedState });
    });

    test('case DELETE_RECIPE_FAIL ', () => {
        store.dispatch({ type: 'DELETE_RECIPE_FAIL', payload: updatedState });
    });
    test('case CREATE_RECIPE_SUCCESS ', () => {
        store.dispatch({ type: 'CREATE_RECIPE_SUCCESS', payload: updatedState });
    });
    test('case CREATE_RECIPE_FAIL ', () => {
        store.dispatch({ type: 'CREATE_RECIPE_FAIL', payload: updatedState });
    });
    test('case UPDATE_RECIPE_FAIL ', () => {
        store.dispatch({ type: 'UPDATE_RECIPE_FAIL', payload: updatedState });
    });
    test('case GET_RECIPE_DETAILS_FAIL ', () => {
        store.dispatch({ type: 'GET_RECIPE_DETAILS_FAIL', payload: updatedState });
    });
    test('case GET_RECIPE_LIST_FAIL ', () => {
        store.dispatch({ type: 'GET_RECIPE_LIST_FAIL', payload: updatedState });
    });
    test('case SEARCH_RECIPE_FAIL ', () => {
        store.dispatch({ type: 'SEARCH_RECIPE_FAIL', payload: updatedState });
    });
    test('case REVIEW_CREATE_SUCCESS ', () => {
        store.dispatch({ type: 'REVIEW_CREATE_SUCCESS', payload: updatedState });
    });
    test('case REVIEW_CREATE_FAIL ', () => {
        store.dispatch({ type: 'REVIEW_CREATE_FAIL', payload: updatedState });
    });
    test('case REVIEW_DELETE_SUCCESS ', () => {
        store.dispatch({ type: 'REVIEW_DELETE_SUCCESS', payload: updatedState });
    });
    test('case REVIEW_DELETE_FAIL ', () => {
        store.dispatch({ type: 'REVIEW_DELETE_FAIL', payload: updatedState });
    });
    test('case REVIEWS_IN_RECIPE_FAIL ', () => {
        store.dispatch({ type: 'REVIEWS_IN_RECIPE_FAIL', payload: updatedState });
    });
    test('case - default', () => {
        store.dispatch({ type: 'default', payload: updatedState });
    });
});
