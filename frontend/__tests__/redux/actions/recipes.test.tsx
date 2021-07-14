import '@testing-library/jest-dom/extend-expect';

import {
    loadRecipeDetailsAction,
    loadRecipeListAction,
    recipeCreateAction,
    recipeDeleteAction,
    recipeSearchAction,
    recipeUpdateAction,
} from '../../../redux/actions/recipe';

import axios from 'axios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let initialState = {};
const store = mockStore(initialState);

jest.mock('axios');
localStorage.setItem('auth_token', 'tokenValue');

const title = 'title';
const description = 'description';
const id = 'id';
const flavor_type = 'flavor_type';

const config = {
    headers: {
        'Content-Type': 'application/json',
    },
};

const config2 = {
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('auth_token')}`,
    },
};

describe('axios request should match url endpoint, and parameters', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('recipeDeleteAction', () => {
        const endpointUrl = `${process.env.REACT_APP_API_URL}/api/recipes/${id}/`;

        store.dispatch(recipeDeleteAction({ id }));

        expect(axios.delete.mock.calls.length).toBe(1);
        expect(axios.delete.mock.calls[0][0]).toStrictEqual(endpointUrl);
        expect(axios.delete.mock.calls[0][1]).toStrictEqual(config2);
    });
    test('recipeCreateAction', () => {
        const endpointUrl = `${process.env.REACT_APP_API_URL}/api/recipes/create/`;
        const body = JSON.stringify({ title, description, flavor_type });

        store.dispatch(recipeCreateAction({ title, description, flavor_type }));

        expect(axios.post.mock.calls.length).toBe(1);
        expect(axios.post.mock.calls[0][0]).toStrictEqual(endpointUrl);
        expect(axios.post.mock.calls[0][1]).toStrictEqual(body);
        expect(axios.post.mock.calls[0][2]).toStrictEqual(config2);
    });
    test('recipeUpdateAction', () => {
        const endpointUrl = `${process.env.REACT_APP_API_URL}/api/recipes/${id}/`;
        const body = JSON.stringify({ title, description, flavor_type });

        store.dispatch(recipeUpdateAction({ id, title, description, flavor_type }));

        expect(axios.patch.mock.calls.length).toBe(1);
        expect(axios.patch.mock.calls[0][0]).toStrictEqual(endpointUrl);
        expect(axios.patch.mock.calls[0][1]).toStrictEqual(body);
        expect(axios.patch.mock.calls[0][2]).toStrictEqual(config2);
    });
    test('loadRecipeListAction', () => {
        const endpointUrl = `${process.env.REACT_APP_API_URL}/api/recipes/list/`;

        store.dispatch(loadRecipeListAction());

        expect(axios.get.mock.calls.length).toBe(1);
        expect(axios.get.mock.calls[0][0]).toStrictEqual(endpointUrl);
        expect(axios.get.mock.calls[0][1]).toStrictEqual(config);
    });
    test('recipeSearchAction', () => {
        const endpointUrl = `${process.env.REACT_APP_API_URL}/api/recipes/search/`;

        store.dispatch(recipeSearchAction({ flavor_type }));

        expect(axios.post.mock.calls.length).toBe(1);
        expect(axios.post.mock.calls[0][0]).toStrictEqual(endpointUrl);
        expect(axios.post.mock.calls[0][1]).toStrictEqual({ flavor_type });
        expect(axios.post.mock.calls[0][2]).toStrictEqual(config);
    });
    test('loadRecipeDetailsAction', () => {
        const endpointUrl = `${process.env.REACT_APP_API_URL}/api/recipes/${id}/`;

        store.dispatch(loadRecipeDetailsAction({ id }));

        expect(axios.get.mock.calls.length).toBe(1);
        expect(axios.get.mock.calls[0][0]).toStrictEqual(endpointUrl);
        expect(axios.get.mock.calls[0][1]).toStrictEqual(config);
    });
});
