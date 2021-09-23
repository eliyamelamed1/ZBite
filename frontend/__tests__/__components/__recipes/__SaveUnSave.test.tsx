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

const recipeData = {
    id: 'id',
};
describe('isRecipeAlreadySaved === false', () => {
    beforeEach(() => {
        const userInitialState = {
            loggedUserData: { id: 'loggedUserId', wishlist: [] },
        };

        store.dispatch({ type: TEST_CASE_AUTH, payload: userInitialState });

        const loggedUserData = {
            id: 'loggedUserId',
            wishlist: [recipeData.id],
        };
        axios.post.mockReturnValueOnce(() => {});
        axios.get.mockReturnValueOnce({ data: null }); // loadRequestedRecipeDataAction()
        axios.get.mockReturnValueOnce({ data: loggedUserData }); // loadLoggedUserDataAction()

        render(
            <Provider store={store}>
                <SaveUnSave recipeId={recipeData.id} />
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
    test('save button should dispatch saveUnSaveAction', () => {
        const saveButton = screen.getByRole('button');
        userEvent.click(saveButton);

        const timesActionHaveDispatched = saveUnSaveActionSpy.mock.calls.length;
        expect(timesActionHaveDispatched).toBe(1);
        expect(saveUnSaveActionSpy.mock.calls[0][0].recipeId).toBe('id');
    });
    test('saving recipe successfully should switch button text to unsave', async () => {
        const saveButton = screen.getByRole('button', { name: 'save' });
        userEvent.click(saveButton);

        const unSaveButton = await screen.findByRole('button', { name: 'unsave' });
        expect(unSaveButton).toBeInTheDocument();
    });
    test.todo('saving recipe failure should not change button text');
});

describe('isRecipeAlreadySaved === true', () => {
    beforeEach(() => {
        const userInitialState = {
            loggedUserData: { id: 'loggedUserId', wishlist: [recipeData.id] },
        };

        store.dispatch({ type: TEST_CASE_AUTH, payload: userInitialState });

        const loggedUserData = {
            id: 'loggedUserId',
            wishlist: [],
        };
        axios.post.mockReturnValueOnce(() => {});
        axios.get.mockReturnValueOnce({ data: null }); // loadRequestedRecipeDataAction()
        axios.get.mockReturnValueOnce({ data: loggedUserData }); // loadLoggedUserDataAction()

        render(
            <Provider store={store}>
                <SaveUnSave recipeId={recipeData.id} />
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
    test('follow button should dispatch saveUnSaveAction', () => {
        const unSaveButton = screen.getByRole('button', { name: 'unsave' });
        userEvent.click(unSaveButton);

        const timesActionHaveDispatched = saveUnSaveActionSpy.mock.calls.length;
        expect(timesActionHaveDispatched).toBe(1);
        expect(saveUnSaveActionSpy.mock.calls[0][0].recipeId).toBe('id');
    });
    // test('unSaving recipe successfully should switch button text to save', async () => {
    // const unSaveButton = screen.getByRole('button', { name: 'unsave' });
    // userEvent.click(unSaveButton);

    // const saveButton = await screen.findByRole('button', { name: 'save' });
    //     expect(saveButton).toBeInTheDocument();
    // });
    test.todo('saving recipe failure should not change button text');
});
