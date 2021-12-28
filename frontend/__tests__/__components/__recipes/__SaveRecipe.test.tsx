import '@testing-library/jest-dom/extend-expect';

import * as recipeActions from '../../../redux/actions/recipeActions';

import { cleanup, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import Router from 'next/router';
import SaveRecipe from '../../../components/recipes/SaveRecipe';
import { TEST_CASE_AUTH } from '../../../redux/types';
import axios from 'axios';
import { pageRoute } from '../../../globals';
import store from '../../../redux/store';
import userEvent from '@testing-library/user-event';

const saveRecipeActionSpy = jest.spyOn(recipeActions, 'saveRecipeAction');

const recipeData = {
    id: 'id',
};

describe('Authenticated user', () => {
    describe('recipe not saved', () => {
        const userInitialState = {
            loggedUserData: { id: 'loggedUserId', saved_recipes: [] },
            isUserAuthenticated: true,
        };

        const loggedUserData = {
            id: 'loggedUserId',
            saved_recipes: [recipeData.id],
        };
        beforeEach(() => {
            axios.post.mockReturnValueOnce(() => {});
            axios.get.mockReturnValue({ data: loggedUserData }); // loadLoggedUserDataAction()

            store.dispatch({ type: TEST_CASE_AUTH, payload: userInitialState });

            render(
                <Provider store={store}>
                    <SaveRecipe recipeId={recipeData.id} />
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
        test('save button should dispatch saveRecipeAction', () => {
            const saveButton = screen.getByRole('button');
            userEvent.click(saveButton);

            const timesActionHaveDispatched = saveRecipeActionSpy.mock.calls.length;
            expect(timesActionHaveDispatched).toBe(1);
            expect(saveRecipeActionSpy.mock.calls[0][0].recipeId).toBe('id');
        });
        test('saving recipe successfully should switch button text to unsave', async () => {
            const saveButton = screen.getByRole('button', { name: 'save' });
            userEvent.click(saveButton);

            const unSaveButton = await screen.findByRole('button', { name: 'unsave' });
            expect(unSaveButton).toBeInTheDocument();
        });
        test('saving recipe failure should not change button text', async () => {
            saveRecipeActionSpy.mockReturnValueOnce(() => {
                throw new Error();
            });
            const saveButton = screen.getByRole('button', { name: 'save' });
            userEvent.click(saveButton);

            const unSaveButton = await screen.queryByRole('button', { name: 'unsave' });
            expect(unSaveButton).not.toBeInTheDocument();
        });
    });

    describe('recipe is already saved', () => {
        const loggedUserData = {
            id: 'loggedUserId',
            saved_recipes: [],
        };
        const userInitialState = {
            loggedUserData: { id: 'loggedUserId', saved_recipes: [recipeData.id] },
            isUserAuthenticated: true,
        };
        beforeEach(() => {
            axios.post.mockReturnValueOnce(() => {});
            axios.get.mockReturnValue({ data: loggedUserData }); // loadLoggedUserDataAction()

            store.dispatch({ type: TEST_CASE_AUTH, payload: userInitialState });
            render(
                <Provider store={store}>
                    <SaveRecipe recipeId={recipeData.id} />
                </Provider>
            );
        });
        afterEach(() => {
            cleanup();
            jest.clearAllMocks();
        });
        test('should render without crashing', () => {});
        test('should render unsave button', () => {
            const unSaveButton = screen.getByRole('button', { name: 'unsave' });
            expect(unSaveButton).toBeInTheDocument();
        });
        test('follow button should dispatch saveRecipeAction', () => {
            const unSaveButton = screen.getByRole('button', { name: 'unsave' });
            userEvent.click(unSaveButton);

            const timesActionHaveDispatched = saveRecipeActionSpy.mock.calls.length;
            expect(timesActionHaveDispatched).toBe(1);
            expect(saveRecipeActionSpy.mock.calls[0][0].recipeId).toBe('id');
        });
        test('unSaving recipe successfully should switch button text to save', async () => {
            const unSaveButton = screen.getByRole('button', { name: 'unsave' });
            userEvent.click(unSaveButton);

            const saveButton = await screen.findByRole('button', { name: 'save' });
            expect(saveButton).toBeInTheDocument();
        });
        test('saving recipe failure should not change button text', async () => {
            saveRecipeActionSpy.mockReturnValue(() => {
                throw new Error();
            });
            const unSaveButton = screen.getByRole('button', { name: 'unsave' });
            userEvent.click(unSaveButton);

            const saveButton = await screen.queryByRole('button', { name: 'save' });
            expect(saveButton).not.toBeInTheDocument();
        });
    });
});

describe('Guest user', () => {
    const userInitialState = {
        isUserAuthenticated: false,
    };
    beforeEach(() => {
        store.dispatch({ type: TEST_CASE_AUTH, payload: userInitialState });
        render(
            <Provider store={store}>
                <SaveRecipe recipeId={recipeData.id} />
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
    test('save button should not dispatch saveRecipeAction', () => {
        const saveButton = screen.getByRole('button');
        userEvent.click(saveButton);
        const timesActionHaveDispatched = saveRecipeActionSpy.mock.calls.length;
        expect(timesActionHaveDispatched).toBe(0);
    });
    test('save button should redirect to login page', async () => {
        const saveButton = screen.getByRole('button', { name: 'save' });
        userEvent.click(saveButton);

        expect(Router.push.mock.calls.length).toBe(1);
        expect(Router.push.mock.calls[0][0]).toBe(pageRoute().login);
    });
});
