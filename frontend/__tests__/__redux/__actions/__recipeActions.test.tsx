import '@testing-library/jest-dom/extend-expect';

import {
    loadFollowedRecipesAction,
    loadRecipeDetailsAction,
    loadSavedRecipesAction,
    loadTrendingRecipesAction,
    recipeCreateAction,
    recipeDeleteAction,
    recipeUpdateAction,
    reviewCreateAction,
    reviewDeleteAction,
    reviewsInRecipeAction,
    saveRecipeAction,
} from '../../../redux/actions/recipeActions';

import axios from 'axios';
import { cleanup } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { endpointRoute } from '../../../enums';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let initialState = {};
const store = mockStore(initialState);

localStorage.setItem('auth_token', 'tokenValue');

jest.mock('axios');

const parameters = {
    title: 'title',
    description: 'description',
    id: 'id',
    stars: 'stars',
    comment: 'comment',
    photoMain: new File(['photoMain'], 'photoMain.txt'),
    image: 'image',
    reviewId: 'reviewId',
    cookTime: 'cookTime',
    serving: 'serving',
    ingredientsTextList: ['firstIngredient'],
    instructionsTextList: ['firstIngredient'],
    instructionsImageList: [new File(['instructionImage'], 'instructionImage.txt')],
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
    beforeEach(() => {
        cleanup();
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
        const { photoMain, title, description, cookTime, serving, ingredientsTextList, instructionsTextList } =
            parameters;
        store.dispatch(
            recipeCreateAction({
                photoMain,
                title,
                description,
                cookTime,
                serving,
                ingredientsTextList,
                instructionsTextList,
            })
        );

        expect(axios.post.mock.calls.length).toBe(1);
        expect(axios.post.mock.calls[0][0]).toStrictEqual(endpointRoute().recipes.create);

        const formData = axios.post.mock.calls[0][1];
        expect(formData.get('photo_main')).toStrictEqual(photoMain);
        expect(formData.get('title')).toStrictEqual(title);
        expect(formData.get('description')).toStrictEqual(description);
        expect(formData.get('cook_time')).toStrictEqual(cookTime);
        expect(formData.get('serving')).toStrictEqual(serving);
        expect(formData.getAll('ingredients_text_list')).toEqual(ingredientsTextList);
        expect(formData.getAll('instructions_text_list')).toEqual(instructionsTextList);

        expect(axios.post.mock.calls[0][2]).toStrictEqual(configWithAuthToken);
    });
    test('recipeUpdateAction', () => {
        const { id, photoMain, title, description, cookTime, serving, ingredientsTextList, instructionsTextList } =
            parameters;
        const endpointUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/recipes/${id}/`;

        store.dispatch(
            recipeUpdateAction({
                id,
                photoMain,
                title,
                description,
                cookTime,
                serving,
                ingredientsTextList,
                instructionsTextList,
            })
        );

        expect(axios.patch.mock.calls.length).toBe(1);
        expect(axios.patch.mock.calls[0][0]).toStrictEqual(endpointUrl);

        const formData = axios.patch.mock.calls[0][1];
        expect(formData.get('photo_main')).toStrictEqual(photoMain);
        expect(formData.get('title')).toStrictEqual(title);
        expect(formData.get('description')).toStrictEqual(description);
        expect(formData.get('cook_time')).toStrictEqual(cookTime);
        expect(formData.get('serving')).toStrictEqual(serving);
        expect(formData.getAll('ingredients_text_list')).toEqual(ingredientsTextList);
        expect(formData.getAll('instructions_text_list')).toEqual(instructionsTextList);

        expect(axios.patch.mock.calls[0][2]).toStrictEqual(configWithAuthToken);
    });
    test('loadTrendingRecipesAction', () => {
        store.dispatch(loadTrendingRecipesAction());

        expect(axios.get.mock.calls.length).toBe(1);
        expect(axios.get.mock.calls[0][0]).toStrictEqual(endpointRoute().recipes.trending);
        expect(axios.get.mock.calls[0][1]).toStrictEqual(config);
    });
    test('loadFollowedRecipesAction', () => {
        store.dispatch(loadFollowedRecipesAction());

        expect(axios.get.mock.calls.length).toBe(1);
        expect(axios.get.mock.calls[0][0]).toStrictEqual(endpointRoute().recipes.followed);
        expect(axios.get.mock.calls[0][1]).toStrictEqual(configWithAuthToken);
    });
    test('loadSavedRecipesAction', () => {
        store.dispatch(loadSavedRecipesAction());

        expect(axios.get.mock.calls.length).toBe(1);
        expect(axios.get.mock.calls[0][0]).toStrictEqual(endpointRoute().recipes.saved_recipes);
        expect(axios.get.mock.calls[0][1]).toStrictEqual(configWithAuthToken);
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
    test('saveRecipeAction', () => {
        const recipeId = parameters.id;
        const endpointUrl = endpointRoute().recipes.save;
        const body = JSON.stringify({ recipe: recipeId });

        store.dispatch(saveRecipeAction({ recipeId }));

        expect(axios.post.mock.calls.length).toBe(1);
        expect(axios.post.mock.calls[0][0]).toBe(endpointUrl);
        expect(axios.post.mock.calls[0][1]).toBe(body);
        expect(axios.post.mock.calls[0][2]).toEqual(configWithAuthToken);
    });
});
