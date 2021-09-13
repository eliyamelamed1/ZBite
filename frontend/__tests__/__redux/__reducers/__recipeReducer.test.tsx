// TODO - improve this tests
// TODO - after each test reset initiaLState

import '@testing-library/jest-dom/extend-expect';

import { cleanup } from '@testing-library/react';
import store from '../../../redux/store';

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
        initialState['listOfSearchedRecipes'] = {
            firstRecipe: { title: 'testTitle' },
            secondRecipe: { title: 'testTitle2' },
        };
        store.dispatch({ type: 'SEARCH_RECIPE_SUCCESS', payload: initialState.listOfSearchedRecipes });
        const storeState = store.getState();

        expect(storeState.recipeReducer.listOfRecipes).toBeNull();
        expect(storeState.recipeReducer.listOfSearchedRecipes).toStrictEqual(initialState.listOfSearchedRecipes);
        expect(storeState.recipeReducer.requestedRecipeData).toBeNull();
        expect(storeState.recipeReducer.listOfFilteredReviews).toBeNull();
    });
    test('case GET_RECIPE_DETAILS_SUCCESS', () => {
        initialState['requestedRecipeData'] = {
            firstRecipe: { title: 'testTitle' },
            secondRecipe: { title: 'testTitle2' },
        };
        store.dispatch({ type: 'GET_RECIPE_DETAILS_SUCCESS', payload: initialState.requestedRecipeData });
        const storeState = store.getState();

        expect(storeState.recipeReducer.listOfRecipes).toBeNull();
        expect(storeState.recipeReducer.requestedRecipeData).toStrictEqual(initialState.requestedRecipeData);
        expect(storeState.recipeReducer.listOfSearchedRecipes).toBeNull();
        expect(storeState.recipeReducer.listOfFilteredReviews).toBeNull();
    });
    test('case UPDATE_RECIPE_SUCCESS', () => {
        initialState['requestedRecipeData'] = {
            firstRecipe: { title: 'testTitle' },
            secondRecipe: { title: 'testTitle2' },
        };
        store.dispatch({ type: 'UPDATE_RECIPE_SUCCESS', payload: initialState.requestedRecipeData });
        const storeState = store.getState();

        expect(storeState.recipeReducer.listOfRecipes).toBeNull();
        expect(storeState.recipeReducer.listOfSearchedRecipes).toBeNull();
        expect(storeState.recipeReducer.requestedRecipeData).toStrictEqual(initialState.requestedRecipeData);
        expect(storeState.recipeReducer.listOfFilteredReviews).toBeNull();
    });
    test('case REVIEWS_IN_RECIPE_SUCCESS', () => {
        initialState['listOfFilteredReviews'] = [{ id: 'firstReviewId' }, { id: 'secondReviewId' }];
        store.dispatch({ type: 'REVIEWS_IN_RECIPE_SUCCESS', payload: initialState.listOfFilteredReviews });
        const storeState = store.getState();

        expect(storeState.recipeReducer.listOfRecipes).toBeNull();
        expect(storeState.recipeReducer.listOfSearchedRecipes).toBeNull();
        expect(storeState.recipeReducer.requestedRecipeData).toBeNull();
        expect(storeState.recipeReducer.listOfFilteredReviews).toStrictEqual(initialState.listOfFilteredReviews);
    });
    test('case GET_RECIPE_LIST_SUCCESS', () => {
        initialState['listOfRecipes'] = {
            firstRecipe: { title: 'testTitle' },
            secondRecipe: { title: 'testTitle2' },
        };
        store.dispatch({ type: 'GET_RECIPE_LIST_SUCCESS', payload: initialState.listOfRecipes });
        const storeState = store.getState();

        expect(storeState.recipeReducer.listOfRecipes).toStrictEqual(initialState.listOfRecipes);
        expect(storeState.recipeReducer.listOfSearchedRecipes).toBeNull();
        expect(storeState.recipeReducer.requestedRecipeData).toBeNull();
        expect(storeState.recipeReducer.listOfFilteredReviews).toBeNull();
    });
});

describe('recipeReducers - : cases that return ...state', () => {
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
        store.dispatch({ type: 'DELETE_RECIPE_SUCCESS', payload: initialState });
    });

    test('case DELETE_RECIPE_FAIL ', () => {
        store.dispatch({ type: 'DELETE_RECIPE_FAIL', payload: initialState });
    });
    test('case CREATE_RECIPE_SUCCESS ', () => {
        store.dispatch({ type: 'CREATE_RECIPE_SUCCESS', payload: initialState });
    });
    test('case CREATE_RECIPE_FAIL ', () => {
        store.dispatch({ type: 'CREATE_RECIPE_FAIL', payload: initialState });
    });
    test('case UPDATE_RECIPE_FAIL ', () => {
        store.dispatch({ type: 'UPDATE_RECIPE_FAIL', payload: initialState });
    });
    test('case GET_RECIPE_DETAILS_FAIL ', () => {
        store.dispatch({ type: 'GET_RECIPE_DETAILS_FAIL', payload: initialState });
    });
    test('case GET_RECIPE_LIST_FAIL ', () => {
        store.dispatch({ type: 'GET_RECIPE_LIST_FAIL', payload: initialState });
    });
    test('case SEARCH_RECIPE_FAIL ', () => {
        store.dispatch({ type: 'SEARCH_RECIPE_FAIL', payload: initialState });
    });
    test('case REVIEW_CREATE_SUCCESS ', () => {
        store.dispatch({ type: 'REVIEW_CREATE_SUCCESS', payload: initialState });
    });
    test('case REVIEW_CREATE_FAIL ', () => {
        store.dispatch({ type: 'REVIEW_CREATE_FAIL', payload: initialState });
    });
    test('case REVIEW_DELETE_SUCCESS ', () => {
        store.dispatch({ type: 'REVIEW_DELETE_SUCCESS', payload: initialState });
    });
    test('case REVIEW_DELETE_FAIL ', () => {
        store.dispatch({ type: 'REVIEW_DELETE_FAIL', payload: initialState });
    });
    test('case REVIEWS_IN_RECIPE_FAIL ', () => {
        store.dispatch({ type: 'REVIEWS_IN_RECIPE_FAIL', payload: initialState });
    });
    test('case - default', () => {
        store.dispatch({ type: 'default', payload: initialState });
    });
});
