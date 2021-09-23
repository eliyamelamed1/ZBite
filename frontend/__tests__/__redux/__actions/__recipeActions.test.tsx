import '@testing-library/jest-dom/extend-expect';

import {
    loadRecipeDetailsAction,
    loadRecipeListAction,
    recipeCreateAction,
    recipeDeleteAction,
    recipeSearchAction,
    recipeUpdateAction,
    reviewCreateAction,
    reviewDeleteAction,
    reviewsInRecipeAction,
    saveUnSaveAction,
} from '../../../redux/actions/recipeActions';

import axios from 'axios';
import configureStore from 'redux-mock-store';
import { endpointRoute } from '../../../globals';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let initialState = {};
const store = mockStore(initialState);

localStorage.setItem('auth_token', 'tokenValue');

const parameters = {
    title: 'title',
    description: 'description',
    id: 'id',
    flavor_type: 'flavor_type',
    stars: 'stars',
    comment: 'comment',
    image: 'image',
    reviewId: 'reviewId',
};

const config = {
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
};

const configWithAuthToken = {
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Token ${localStorage.getItem('auth_token')}`,
    },
};

describe('axios request should match url endpoint, and parameters', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('recipeDeleteAction', () => {
        const { id } = parameters;
        const endpointUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/recipes/${id}/`;

        store.dispatch(recipeDeleteAction({ id }));

        expect(axios.delete.mock.calls.length).toBe(1);
        expect(axios.delete.mock.calls[0][0]).toStrictEqual(endpointUrl);
        expect(axios.delete.mock.calls[0][1]).toStrictEqual(configWithAuthToken);
    });
    test('recipeCreateAction', () => {
        const { title, description, flavor_type } = parameters;
        const body = JSON.stringify({ title, description, flavor_type });

        store.dispatch(recipeCreateAction({ title, description, flavor_type }));

        expect(axios.post.mock.calls.length).toBe(1);
        expect(axios.post.mock.calls[0][0]).toStrictEqual(endpointRoute().recipes.create);
        expect(axios.post.mock.calls[0][1]).toStrictEqual(body);
        expect(axios.post.mock.calls[0][2]).toStrictEqual(configWithAuthToken);
    });
    test('recipeUpdateAction', () => {
        const { id, title, description, flavor_type } = parameters;
        const endpointUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/recipes/${id}/`;
        const body = JSON.stringify({ title, description, flavor_type });

        store.dispatch(recipeUpdateAction({ id, title, description, flavor_type }));

        expect(axios.patch.mock.calls.length).toBe(1);
        expect(axios.patch.mock.calls[0][0]).toStrictEqual(endpointUrl);
        expect(axios.patch.mock.calls[0][1]).toStrictEqual(body);
        expect(axios.patch.mock.calls[0][2]).toStrictEqual(configWithAuthToken);
    });
    test('loadRecipeListAction', () => {
        store.dispatch(loadRecipeListAction());

        expect(axios.get.mock.calls.length).toBe(1);
        expect(axios.get.mock.calls[0][0]).toStrictEqual(endpointRoute().recipes.list);
        expect(axios.get.mock.calls[0][1]).toStrictEqual(config);
    });
    test('recipeSearchAction', () => {
        const { flavor_type } = parameters;

        store.dispatch(recipeSearchAction({ flavor_type }));

        expect(axios.post.mock.calls.length).toBe(1);
        expect(axios.post.mock.calls[0][0]).toStrictEqual(endpointRoute().recipes.search);
        expect(axios.post.mock.calls[0][1]).toStrictEqual({ flavor_type });
        expect(axios.post.mock.calls[0][2]).toStrictEqual(config);
    });
    test('loadRecipeDetailsAction', () => {
        const { id } = parameters;
        const endpointUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/recipes/${id}/`;
        store.dispatch(loadRecipeDetailsAction({ id }));

        expect(axios.get.mock.calls.length).toBe(1);
        expect(axios.get.mock.calls[0][0]).toStrictEqual(endpointUrl);
        expect(axios.get.mock.calls[0][1]).toStrictEqual(config);
    });
    test('reviewCreateAction', () => {
        const { id, stars, comment, image } = parameters;
        const endpointUrl = endpointRoute().reviews.create;
        const body = JSON.stringify({ recipe: id, stars, comment, image });

        store.dispatch(reviewCreateAction({ recipeId: id, stars, comment, image }));

        expect(axios.post.mock.calls.length).toBe(1);
        expect(axios.post.mock.calls[0][0]).toBe(endpointUrl);
        expect(axios.post.mock.calls[0][1]).toBe(body);
        expect(axios.post.mock.calls[0][2]).toStrictEqual(configWithAuthToken);
        // test dispatch reviewsInRecipeAction({recipeId})
    });
    test('reviewDeleteAction', () => {
        const { id, reviewId } = parameters;
        const endpointUrl = endpointRoute(reviewId).reviews.delete;

        store.dispatch(reviewDeleteAction({ reviewId, recipeId: id }));

        expect(axios.delete.mock.calls.length).toBe(1);
        expect(axios.delete.mock.calls[0][0]).toBe(endpointUrl);
        expect(axios.delete.mock.calls[0][1]).toStrictEqual(configWithAuthToken);
        // test dispatch reviewsInRecipeAction({recipeId})
    });
    test('reviewsInRecipeAction', () => {
        const { id } = parameters;
        const endpointUrl = endpointRoute().reviews.reviews_in_recipe;
        const body = JSON.stringify({ recipe: id });

        store.dispatch(reviewsInRecipeAction({ recipeId: id }));

        expect(axios.post.mock.calls.length).toBe(1);
        expect(axios.post.mock.calls[0][0]).toBe(endpointUrl);
        expect(axios.post.mock.calls[0][1]).toStrictEqual(body);
        expect(axios.post.mock.calls[0][2]).toStrictEqual(config);
    });
    test('saveUnSaveAction', () => {
        const recipeId = parameters.id;
        const endpointUrl = endpointRoute().recipes.save;
        const body = JSON.stringify({ recipe: recipeId });

        store.dispatch(saveUnSaveAction({ recipeId }));

        expect(axios.post.mock.calls.length).toBe(1);
        expect(axios.post.mock.calls[0][0]).toBe(endpointUrl);
        expect(axios.post.mock.calls[0][1]).toBe(body);
        expect(axios.post.mock.calls[0][2]).toEqual(configWithAuthToken);
    });
});
