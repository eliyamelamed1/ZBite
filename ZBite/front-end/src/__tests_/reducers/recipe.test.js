// TODO - improve this tests
// TODO - after each test reset initiaLState

import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import store from '../../store';

describe('reducers - auth ', () => {
    afterEach(() => {
        cleanup();
    });
    let initialState;
    beforeEach(() => {
        initialState = {
            recipeListData: 'initialValue',
            recipeSearchedListData: 'initialValue',
            recipeDetailState: 'initialValue',
        };
        store.dispatch({ type: 'TEST_CASE_RECIPE', payload: initialState });
        return initialState;
    });

    test('case RECIPE_SEARCH_SUCCESS', () => {
        initialState['recipeSearchedListData'] = {
            firstRecipe: { title: 'testTitle' },
            secondRecipe: { title: 'testTitle2' },
        };
        store.dispatch({ type: 'RECIPE_SEARCH_SUCCESS', payload: initialState.recipeSearchedListData });
        initialState = store.getState();

        expect(initialState.recipeReducer.recipeListData).toBe('initialValue');
        expect(initialState.recipeReducer.recipeSearchedListData).toStrictEqual({
            firstRecipe: { title: 'testTitle' },
            secondRecipe: { title: 'testTitle2' },
        });
        expect(initialState.recipeReducer.recipeDetailState).toBe('initialValue');
    });
    test('case LOAD_RECIPE_DETAILS_SUCCESS', () => {
        initialState['recipeDetailState'] = {
            firstRecipe: { title: 'testTitle' },
            secondRecipe: { title: 'testTitle2' },
        };
        store.dispatch({ type: 'LOAD_RECIPE_DETAILS_SUCCESS', payload: initialState.recipeDetailState });
        initialState = store.getState();

        expect(initialState.recipeReducer.recipeListData).toBe('initialValue');
        expect(initialState.recipeReducer.recipeSearchedListData).toBe('initialValue');
        expect(initialState.recipeReducer.recipeDetailState).toStrictEqual({
            firstRecipe: { title: 'testTitle' },
            secondRecipe: { title: 'testTitle2' },
        });
    });
    test('case RECIPE_UPDATED_SUCCESS', () => {
        initialState['recipeDetailState'] = {
            firstRecipe: { title: 'testTitle' },
            secondRecipe: { title: 'testTitle2' },
        };
        store.dispatch({ type: 'RECIPE_UPDATED_SUCCESS', payload: initialState.recipeDetailState });
        initialState = store.getState();

        expect(initialState.recipeReducer.recipeListData).toBe('initialValue');
        expect(initialState.recipeReducer.recipeSearchedListData).toBe('initialValue');
        expect(initialState.recipeReducer.recipeDetailState).toStrictEqual({
            firstRecipe: { title: 'testTitle' },
            secondRecipe: { title: 'testTitle2' },
        });
    });
    test('case LOAD_RECIPE_LIST_SUCCESS', () => {
        initialState['recipeListData'] = {
            firstRecipe: { title: 'testTitle' },
            secondRecipe: { title: 'testTitle2' },
        };
        store.dispatch({ type: 'LOAD_RECIPE_LIST_SUCCESS', payload: initialState.recipeListData });
        initialState = store.getState();

        expect(initialState.recipeReducer.recipeListData).toStrictEqual({
            firstRecipe: { title: 'testTitle' },
            secondRecipe: { title: 'testTitle2' },
        });
        expect(initialState.recipeReducer.recipeSearchedListData).toBe('initialValue');
        expect(initialState.recipeReducer.recipeDetailState).toBe('initialValue');
    });
});

describe('reducers - recipe : cases that return ...state', () => {
    afterEach(() => {
        cleanup();
    });
    let initialState;
    beforeEach(() => {
        initialState = {
            recipeListData: 'initialValue',
            recipeSearchedListData: 'initialValue',
            recipeDetailState: 'initialValue',
        };
        store.dispatch({ type: 'TEST_CASE_RECIPE', payload: initialState });
        return initialState;
    });

    test('case RECIPE_DELETED_SUCCESS ', () => {
        store.dispatch({ type: 'RECIPE_DELETED_SUCCESS', payload: initialState });
        initialState = store.getState();
        expect(initialState.recipeReducer.recipeListData).toBe('initialValue');
        expect(initialState.recipeReducer.recipeSearchedListData).toBe('initialValue');
        expect(initialState.recipeReducer.recipeDetailState).toBe('initialValue');
    });

    test('case RECIPE_DELETED_FAIL ', () => {
        store.dispatch({ type: 'RECIPE_DELETED_FAIL', payload: initialState });
        initialState = store.getState();
        expect(initialState.recipeReducer.recipeListData).toBe('initialValue');
        expect(initialState.recipeReducer.recipeSearchedListData).toBe('initialValue');
        expect(initialState.recipeReducer.recipeDetailState).toBe('initialValue');
    });
    test('case RECIPE_CREATED_SUCCESS ', () => {
        store.dispatch({ type: 'RECIPE_CREATED_SUCCESS', payload: initialState });
        initialState = store.getState();
        expect(initialState.recipeReducer.recipeListData).toBe('initialValue');
        expect(initialState.recipeReducer.recipeSearchedListData).toBe('initialValue');
        expect(initialState.recipeReducer.recipeDetailState).toBe('initialValue');
    });
    test('case RECIPE_CREATED_FAIL ', () => {
        store.dispatch({ type: 'RECIPE_CREATED_FAIL', payload: initialState });
        initialState = store.getState();
        expect(initialState.recipeReducer.recipeListData).toBe('initialValue');
        expect(initialState.recipeReducer.recipeSearchedListData).toBe('initialValue');
        expect(initialState.recipeReducer.recipeDetailState).toBe('initialValue');
    });
    test('case RECIPE_UPDATED_FAIL ', () => {
        store.dispatch({ type: 'RECIPE_UPDATED_FAIL', payload: initialState });
        initialState = store.getState();
        expect(initialState.recipeReducer.recipeListData).toBe('initialValue');
        expect(initialState.recipeReducer.recipeSearchedListData).toBe('initialValue');
        expect(initialState.recipeReducer.recipeDetailState).toBe('initialValue');
    });
    test('case LOAD_RECIPE_DETAILS_FAIL ', () => {
        store.dispatch({ type: 'LOAD_RECIPE_DETAILS_FAIL', payload: initialState });
        initialState = store.getState();
        expect(initialState.recipeReducer.recipeListData).toBe('initialValue');
        expect(initialState.recipeReducer.recipeSearchedListData).toBe('initialValue');
        expect(initialState.recipeReducer.recipeDetailState).toBe('initialValue');
    });
    test('case LOAD_RECIPE_LIST_FAIL ', () => {
        store.dispatch({ type: 'LOAD_RECIPE_LIST_FAIL', payload: initialState });
        initialState = store.getState();
        expect(initialState.recipeReducer.recipeListData).toBe('initialValue');
        expect(initialState.recipeReducer.recipeSearchedListData).toBe('initialValue');
        expect(initialState.recipeReducer.recipeDetailState).toBe('initialValue');
    });
    test('case RECIPE_SEARCH_FAIL ', () => {
        store.dispatch({ type: 'RECIPE_SEARCH_FAIL', payload: initialState });
        initialState = store.getState();
        expect(initialState.recipeReducer.recipeListData).toBe('initialValue');
        expect(initialState.recipeReducer.recipeSearchedListData).toBe('initialValue');
        expect(initialState.recipeReducer.recipeDetailState).toBe('initialValue');
    });
    test('case - default', () => {
        store.dispatch({ type: 'default', payload: initialState });
        initialState = store.getState();
        expect(initialState.recipeReducer.recipeListData).toBe('initialValue');
        expect(initialState.recipeReducer.recipeSearchedListData).toBe('initialValue');
        expect(initialState.recipeReducer.recipeDetailState).toBe('initialValue');
    });
});
