import '@testing-library/jest-dom/extend-expect';

import * as recipeActions from '../../../redux/actions/recipeActions';

import { TEST_CASE_AUTH, TEST_CASE_RECIPE } from '../../../redux/types';
import { cleanup, render, screen, waitForElementToBeRemoved } from '@testing-library/react';

import { Provider } from 'react-redux';
import SaveUnSave from '../../../components/recipes/saveUnSave';
import axios from 'axios';
import store from '../../../redux/store';
import userEvent from '@testing-library/user-event';

const saveUnSaveActionSpy = jest.spyOn(recipeActions, 'saveUnSaveAction');

const recipeToSave = 'recipeToSave';

describe('SaveUnSave', () => {
    const userInitialState = {
        loggedUserData: { id: 'loggedUserId' },
    };
    beforeEach(() => {
        store.dispatch({ type: TEST_CASE_AUTH, payload: userInitialState });
    });
    describe('isRecipeAlreadySaved === false', () => {
        beforeEach(() => {
            const recipeData = {
                id: 'id',
                saves: ['loggedUserId'],
            };
            axios.post.mockReturnValueOnce(() => {});
            axios.get.mockReturnValueOnce({ data: recipeData });

            const recipeInitialState = {
                requestedRecipeData: {
                    id: 'id',
                    saves: [],
                },
            };

            store.dispatch({ type: TEST_CASE_RECIPE, payload: recipeInitialState });
            render(
                <Provider store={store}>
                    <SaveUnSave recipeId={recipeToSave} />
                </Provider>
            );
        });
        afterEach(() => {
            cleanup();
            jest.clearAllMocks();
        });
        test('should render without crashing', () => {});
        test('should render save button', () => {
            const saveButton = screen.getByRole('button');
            expect(saveButton).toBeInTheDocument();
        });
        test('follow button should dispatch followUnFollowAction', () => {
            const saveButton = screen.getByRole('button');
            userEvent.click(saveButton);

            const timesActionHaveDispatched = saveUnSaveActionSpy.mock.calls.length;
            expect(timesActionHaveDispatched).toBe(1);
            expect(saveUnSaveActionSpy.mock.calls[0][0].recipeId).toBe(recipeToSave);
        });
        test('saving recipe successfully should switch button text to unsave', async () => {
            const saveButton = await screen.findByRole('button', { name: 'save' });
            userEvent.click(saveButton);

            const unSaveButton = await screen.findByRole('button', { name: 'unsave' });
            expect(unSaveButton).toBeInTheDocument();
        });
        test.todo('saving recipe failure should not change button text');
    });

    describe('isRecipeAlreadySaved === true', () => {
        beforeEach(() => {
            const recipeData = {
                id: 'id',
                saves: [],
            };
            axios.post.mockReturnValueOnce(() => {});
            axios.get.mockReturnValueOnce({ data: recipeData });

            const recipeInitialState = {
                requestedRecipeData: {
                    id: 'id',
                    saves: ['loggedUserId'],
                },
            };
            store.dispatch({ type: TEST_CASE_RECIPE, payload: recipeInitialState });
            render(
                <Provider store={store}>
                    <SaveUnSave recipeId={recipeToSave} />
                </Provider>
            );
        });
        afterEach(() => {
            cleanup();
            jest.clearAllMocks();
        });
        test('should render without crashing', () => {});
        test('should render save button', () => {
            const saveButton = screen.getByRole('button');
            expect(saveButton).toBeInTheDocument();
        });
        test('follow button should dispatch followUnFollowAction', () => {
            const saveButton = screen.getByRole('button');
            userEvent.click(saveButton);
            const timesActionHaveDispatched = saveUnSaveActionSpy.mock.calls.length;
            expect(timesActionHaveDispatched).toBe(1);
            expect(saveUnSaveActionSpy.mock.calls[0][0].recipeId).toBe(recipeToSave);
        });
        // test('unSaving recipe successfully should switch button text to save', async () => {
        //     const unSaveButton = await screen.findByRole('button', { name: 'unsave' });
        //     userEvent.click(unSaveButton);

        //     const saveButton = await screen.findByRole('button', { name: 'save' });
        //     expect(saveButton).toBeInTheDocument();
        // });
        test.todo('saving recipe failure should not change button text');
    });
});
