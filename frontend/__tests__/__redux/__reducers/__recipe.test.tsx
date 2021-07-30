// TODO - improve this tests
// TODO - after each test reset initiaLState

import '@testing-library/jest-dom/extend-expect';

import { cleanup } from '@testing-library/react';
import store from '../../../redux/store';

describe('reducers - auth ', () => {
    afterEach(() => {
        cleanup();
    });
    let initialState;
    beforeEach(() => {
        initialState = {
            listOfRecipes: 'initialValue',
            listOfSearchedRecipes: 'initialValue',
            searchedRecipeData: 'initialValue',
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
        initialState = store.getState();

        expect(initialState.recipeReducer.listOfRecipes).toBe('initialValue');
        expect(initialState.recipeReducer.listOfSearchedRecipes).toStrictEqual({
            firstRecipe: { title: 'testTitle' },
            secondRecipe: { title: 'testTitle2' },
        });
        expect(initialState.recipeReducer.searchedRecipeData).toBe('initialValue');
    });
    test('case GET_RECIPE_DETAILS_SUCCESS', () => {
        initialState['searchedRecipeData'] = {
            firstRecipe: { title: 'testTitle' },
            secondRecipe: { title: 'testTitle2' },
        };
        store.dispatch({ type: 'GET_RECIPE_DETAILS_SUCCESS', payload: initialState.searchedRecipeData });
        initialState = store.getState();

        expect(initialState.recipeReducer.listOfRecipes).toBe('initialValue');
        expect(initialState.recipeReducer.listOfSearchedRecipes).toBe('initialValue');
        expect(initialState.recipeReducer.searchedRecipeData).toStrictEqual({
            firstRecipe: { title: 'testTitle' },
            secondRecipe: { title: 'testTitle2' },
        });
    });
    test('case UPDATE_RECIPE_SUCCESS', () => {
        initialState['searchedRecipeData'] = {
            firstRecipe: { title: 'testTitle' },
            secondRecipe: { title: 'testTitle2' },
        };
        store.dispatch({ type: 'UPDATE_RECIPE_SUCCESS', payload: initialState.searchedRecipeData });
        initialState = store.getState();

        expect(initialState.recipeReducer.listOfRecipes).toBe('initialValue');
        expect(initialState.recipeReducer.listOfSearchedRecipes).toBe('initialValue');
        expect(initialState.recipeReducer.searchedRecipeData).toStrictEqual({
            firstRecipe: { title: 'testTitle' },
            secondRecipe: { title: 'testTitle2' },
        });
    });
    test('case GET_RECIPE_LIST_SUCCESS', () => {
        initialState['listOfRecipes'] = {
            firstRecipe: { title: 'testTitle' },
            secondRecipe: { title: 'testTitle2' },
        };
        store.dispatch({ type: 'GET_RECIPE_LIST_SUCCESS', payload: initialState.listOfRecipes });
        initialState = store.getState();

        expect(initialState.recipeReducer.listOfRecipes).toStrictEqual({
            firstRecipe: { title: 'testTitle' },
            secondRecipe: { title: 'testTitle2' },
        });
        expect(initialState.recipeReducer.listOfSearchedRecipes).toBe('initialValue');
        expect(initialState.recipeReducer.searchedRecipeData).toBe('initialValue');
    });
});

describe('reducers - recipe : cases that return ...state', () => {
    afterEach(() => {
        cleanup();
    });
    let initialState;
    beforeEach(() => {
        initialState = {
            listOfRecipes: 'initialValue',
            listOfSearchedRecipes: 'initialValue',
            searchedRecipeData: 'initialValue',
        };
        store.dispatch({ type: 'TEST_CASE_RECIPE', payload: initialState });
        return initialState;
    });

    test('case DELETE_RECIPE_SUCCESS ', () => {
        store.dispatch({ type: 'DELETE_RECIPE_SUCCESS', payload: initialState });
        initialState = store.getState();
        expect(initialState.recipeReducer.listOfRecipes).toBe('initialValue');
        expect(initialState.recipeReducer.listOfSearchedRecipes).toBe('initialValue');
        expect(initialState.recipeReducer.searchedRecipeData).toBe('initialValue');
    });

    test('case DELETE_RECIPE_FAIL ', () => {
        store.dispatch({ type: 'DELETE_RECIPE_FAIL', payload: initialState });
        initialState = store.getState();
        expect(initialState.recipeReducer.listOfRecipes).toBe('initialValue');
        expect(initialState.recipeReducer.listOfSearchedRecipes).toBe('initialValue');
        expect(initialState.recipeReducer.searchedRecipeData).toBe('initialValue');
    });
    test('case CREATE_RECIPE_SUCCESS ', () => {
        store.dispatch({ type: 'CREATE_RECIPE_SUCCESS', payload: initialState });
        initialState = store.getState();
        expect(initialState.recipeReducer.listOfRecipes).toBe('initialValue');
        expect(initialState.recipeReducer.listOfSearchedRecipes).toBe('initialValue');
        expect(initialState.recipeReducer.searchedRecipeData).toBe('initialValue');
    });
    test('case CREATE_RECIPE_FAIL ', () => {
        store.dispatch({ type: 'CREATE_RECIPE_FAIL', payload: initialState });
        initialState = store.getState();
        expect(initialState.recipeReducer.listOfRecipes).toBe('initialValue');
        expect(initialState.recipeReducer.listOfSearchedRecipes).toBe('initialValue');
        expect(initialState.recipeReducer.searchedRecipeData).toBe('initialValue');
    });
    test('case UPDATE_RECIPE_FAIL ', () => {
        store.dispatch({ type: 'UPDATE_RECIPE_FAIL', payload: initialState });
        initialState = store.getState();
        expect(initialState.recipeReducer.listOfRecipes).toBe('initialValue');
        expect(initialState.recipeReducer.listOfSearchedRecipes).toBe('initialValue');
        expect(initialState.recipeReducer.searchedRecipeData).toBe('initialValue');
    });
    test('case GET_RECIPE_DETAILS_FAIL ', () => {
        store.dispatch({ type: 'GET_RECIPE_DETAILS_FAIL', payload: initialState });
        initialState = store.getState();
        expect(initialState.recipeReducer.listOfRecipes).toBe('initialValue');
        expect(initialState.recipeReducer.listOfSearchedRecipes).toBe('initialValue');
        expect(initialState.recipeReducer.searchedRecipeData).toBe('initialValue');
    });
    test('case GET_RECIPE_LIST_FAIL ', () => {
        store.dispatch({ type: 'GET_RECIPE_LIST_FAIL', payload: initialState });
        initialState = store.getState();
        expect(initialState.recipeReducer.listOfRecipes).toBe('initialValue');
        expect(initialState.recipeReducer.listOfSearchedRecipes).toBe('initialValue');
        expect(initialState.recipeReducer.searchedRecipeData).toBe('initialValue');
    });
    test('case SEARCH_RECIPE_FAIL ', () => {
        store.dispatch({ type: 'SEARCH_RECIPE_FAIL', payload: initialState });
        initialState = store.getState();
        expect(initialState.recipeReducer.listOfRecipes).toBe('initialValue');
        expect(initialState.recipeReducer.listOfSearchedRecipes).toBe('initialValue');
        expect(initialState.recipeReducer.searchedRecipeData).toBe('initialValue');
    });
    test('case - default', () => {
        store.dispatch({ type: 'default', payload: initialState });
        initialState = store.getState();
        expect(initialState.recipeReducer.listOfRecipes).toBe('initialValue');
        expect(initialState.recipeReducer.listOfSearchedRecipes).toBe('initialValue');
        expect(initialState.recipeReducer.searchedRecipeData).toBe('initialValue');
    });
});
