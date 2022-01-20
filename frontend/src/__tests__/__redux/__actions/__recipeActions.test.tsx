import '@testing-library/jest-dom/extend-expect';

import { BASE_URL, endpointRoute } from '../../../enums';
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
import mockAxios from '../../../__mocks__/axios';
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

describe('axios request should match url endpoint, and parameters', () => {
    beforeEach(() => {
        cleanup();
        jest.clearAllMocks();
    });
    test('recipeDeleteAction', () => {
        const { id } = parameters;
        const endpointUrl = `${BASE_URL}/api/recipes/${id}/`;
        store.dispatch(recipeDeleteAction({ id }));

        expect(mockAxios.delete.mock.calls.length).toBe(1);
        expect(mockAxios.delete.mock.calls[0][0]).toStrictEqual(endpointUrl);
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

        expect(mockAxios.post.mock.calls.length).toBe(1);
        expect(mockAxios.post.mock.calls[0][0]).toStrictEqual(endpointRoute().recipes.create);

        const formData = mockAxios.post.mock.calls[0][1];
        expect(formData.get('photo_main')).toStrictEqual(photoMain);
        expect(formData.get('title')).toStrictEqual(title);
        expect(formData.get('description')).toStrictEqual(description);
        expect(formData.get('cook_time')).toStrictEqual(cookTime);
        expect(formData.get('serving')).toStrictEqual(serving);
        expect(formData.getAll('ingredients_text_list')).toEqual(ingredientsTextList);
        expect(formData.getAll('instructions_text_list')).toEqual(instructionsTextList);
    });
    test('recipeUpdateAction', () => {
        const { id, photoMain, title, description, cookTime, serving, ingredientsTextList, instructionsTextList } =
            parameters;
        const endpointUrl = `${BASE_URL}/api/recipes/${id}/`;

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

        expect(mockAxios.patch.mock.calls.length).toBe(1);
        expect(mockAxios.patch.mock.calls[0][0]).toStrictEqual(endpointUrl);

        const formData = mockAxios.patch.mock.calls[0][1];
        expect(formData.get('photo_main')).toStrictEqual(photoMain);
        expect(formData.get('title')).toStrictEqual(title);
        expect(formData.get('description')).toStrictEqual(description);
        expect(formData.get('cook_time')).toStrictEqual(cookTime);
        expect(formData.get('serving')).toStrictEqual(serving);
        expect(formData.getAll('ingredients_text_list')).toEqual(ingredientsTextList);
        expect(formData.getAll('instructions_text_list')).toEqual(instructionsTextList);
    });
    test('loadTrendingRecipesAction', () => {
        store.dispatch(loadTrendingRecipesAction());

        expect(mockAxios.get.mock.calls.length).toBe(1);
        expect(mockAxios.get.mock.calls[0][0]).toStrictEqual(endpointRoute().recipes.trending);
    });
    test('loadFollowedRecipesAction', () => {
        store.dispatch(loadFollowedRecipesAction());

        expect(mockAxios.get.mock.calls.length).toBe(1);
        expect(mockAxios.get.mock.calls[0][0]).toStrictEqual(endpointRoute().recipes.followed);
    });
    test('loadSavedRecipesAction', () => {
        store.dispatch(loadSavedRecipesAction());

        expect(mockAxios.get.mock.calls.length).toBe(1);
        expect(mockAxios.get.mock.calls[0][0]).toStrictEqual(endpointRoute().recipes.saved_recipes);
    });

    test('loadRecipeDetailsAction', () => {
        const { id } = parameters;
        const endpointUrl = `${BASE_URL}/api/recipes/${id}/`;
        store.dispatch(loadRecipeDetailsAction({ id }));

        expect(mockAxios.get.mock.calls.length).toBe(1);
        expect(mockAxios.get.mock.calls[0][0]).toStrictEqual(endpointUrl);
    });
    test('reviewCreateAction', () => {
        const { id, stars, comment } = parameters;
        const endpointUrl = endpointRoute().reviews.create;
        const body = JSON.stringify({ recipe: id, stars, comment });

        store.dispatch(reviewCreateAction({ recipeId: id, stars, comment }));

        expect(mockAxios.post.mock.calls.length).toBe(1);
        expect(mockAxios.post.mock.calls[0][0]).toBe(endpointUrl);
        expect(mockAxios.post.mock.calls[0][1]).toBe(body);
        // test dispatch reviewsInRecipeAction({recipeId})
    });
    test('reviewDeleteAction', () => {
        const { id, reviewId } = parameters;
        const endpointUrl = endpointRoute(reviewId).reviews.delete;

        store.dispatch(reviewDeleteAction({ reviewId, recipeId: id }));

        expect(mockAxios.delete.mock.calls.length).toBe(1);
        expect(mockAxios.delete.mock.calls[0][0]).toBe(endpointUrl);

        // test dispatch reviewsInRecipeAction({recipeId})
    });
    test('reviewsInRecipeAction', () => {
        const { id } = parameters;
        const endpointUrl = endpointRoute().reviews.reviews_in_recipe;
        const body = JSON.stringify({ recipe: id });

        store.dispatch(reviewsInRecipeAction({ recipeId: id }));

        expect(mockAxios.post.mock.calls.length).toBe(1);
        expect(mockAxios.post.mock.calls[0][0]).toBe(endpointUrl);
        expect(mockAxios.post.mock.calls[0][1]).toStrictEqual(body);
    });
    test('saveRecipeAction', () => {
        const recipeId = parameters.id;
        const endpointUrl = endpointRoute().recipes.save;
        const body = JSON.stringify({ recipe: recipeId });

        store.dispatch(saveRecipeAction({ recipeId }));

        expect(mockAxios.post.mock.calls.length).toBe(1);
        expect(mockAxios.post.mock.calls[0][0]).toBe(endpointUrl);
        expect(mockAxios.post.mock.calls[0][1]).toBe(body);
    });
});
