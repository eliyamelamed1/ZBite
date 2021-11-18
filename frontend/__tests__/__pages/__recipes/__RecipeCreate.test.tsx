import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

import * as RecipeActions from '../../../redux/actions/recipeActions';

import { cleanup, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import React from 'react';
import RecipeCreate from '../../../pages/recipes/RecipeCreate';
import Router from 'next/router';
import { TEST_CASE_AUTH } from '../../../redux/types';
import { pageRoute } from '../../../globals';
import store from '../../../redux/store';
import userEvent from '@testing-library/user-event';

const recipeCreateActionSpy = jest.spyOn(RecipeActions, 'recipeCreateAction');
jest.mock('next/router');

describe('authenticated users', () => {
    beforeEach(() => {
        cleanup();
        jest.clearAllMocks();
        const initialState = { isUserAuthenticated: true };
        store.dispatch({ type: TEST_CASE_AUTH, payload: initialState });
        render(
            <Provider store={store}>
                <RecipeCreate />
            </Provider>
        );
    });
    describe('general', () => {
        test('renders without crashing', () => {});
        test('data-testid match recipeCreate', () => {
            const testid = screen.getByTestId('recipeCreate');
            expect(testid).toBeInTheDocument();
        });
    });

    describe('title input', () => {
        test('render title textbox', () => {
            const textbox = screen.getByPlaceholderText(/title/i);
            expect(textbox).toBeInTheDocument();
        });
        test('title attributes', () => {
            const textbox = screen.getByPlaceholderText(/title/i);
            expect(textbox.required).toBe(true);
            expect(textbox.type).toBe('text');
            expect(textbox.name).toBe('title');
        });
        test('title value change according to input (onchange)', () => {
            const textbox = screen.getByPlaceholderText(/title/i);
            userEvent.type(textbox, 'new title');
            expect(textbox.value).toBe('new title');
        });
    });

    describe('description input', () => {
        test('render description textbox', () => {
            const textbox = screen.getByPlaceholderText(/description/i);
            expect(textbox).toBeInTheDocument();
        });
        test('description attributes', () => {
            const textbox = screen.getByPlaceholderText(/description/i);
            expect(textbox.required).toBe(true);
            expect(textbox.type).toBe('text');
            expect(textbox.name).toBe('description');
        });
        test('description value change according to input (onchange)', () => {
            const textbox = screen.getByPlaceholderText(/description/i);
            userEvent.type(textbox, 'new description');
            expect(textbox.value).toBe('new description');
        });
    });

    describe('cook time input', () => {
        test('render cook time textbox', () => {
            const textbox = screen.getByPlaceholderText(/1hr 30min/i);
            expect(textbox).toBeInTheDocument();
        });
        test('cook time attributes', () => {
            const textbox = screen.getByPlaceholderText(/1hr 30min/i);
            expect(textbox.required).toBe(false);
            expect(textbox.type).toBe('text');
            expect(textbox.name).toBe('cookTime');
        });
        test('cook time value change according to input (onchange)', () => {
            const textbox = screen.getByPlaceholderText(/1hr 30min/i);
            userEvent.type(textbox, '2hr 30min');
            expect(textbox.value).toBe('2hr 30min');
        });
    });

    describe('serving input', () => {
        test('render serving textbox', () => {
            const textbox = screen.getByPlaceholderText(/2 people/i);
            expect(textbox).toBeInTheDocument();
        });
        test('serving attributes', () => {
            const textbox = screen.getByPlaceholderText(/2 people/i);
            expect(textbox.required).toBe(false);
            expect(textbox.type).toBe('text');
            expect(textbox.name).toBe('serving');
        });
        test('serving value change according to input (onchange)', () => {
            const textbox = screen.getByPlaceholderText(/2 people/i);
            userEvent.type(textbox, '5 people');
            expect(textbox.value).toBe('5 people');
        });
    });
    describe('instructions input', () => {
        test('render instructions title', () => {
            const title = screen.getByText('Instructions');
            expect(title).toBeInTheDocument();
        });
        test('render instructions textbox', () => {
            const textbox = screen.getByPlaceholderText(/add onions to the mixture/i);
            expect(textbox).toBeInTheDocument();
        });
        test('instructions attributes', () => {
            const textbox = screen.getByPlaceholderText(/add onions to the mixture/i);
            expect(textbox.required).toBe(false);
            expect(textbox.type).toBe('text');
            expect(textbox.name).toBe('instruction');
        });
        test('instructions value change according to input (onchange)', () => {
            const textbox = screen.getByPlaceholderText(/add onions to the mixture/i);
            userEvent.type(textbox, 'add rotten tomatoes');
            expect(textbox.value).toBe('add rotten tomatoes');
        });

        describe('add instruction button', () => {
            test('render add instructions button', () => {
                const button = screen.getByPlaceholderText(/add instruction/i);
                expect(button).toBeInTheDocument();
            });
            test('button should not save the instruction if its empty', () => {
                const button = screen.getByPlaceholderText(/add instruction/i);
                userEvent.click(button);
                const savedInstruction = screen.queryByPlaceholderText('savedInstruction');
                expect(savedInstruction).not.toBeInTheDocument();
            });

            test('button should save the instructions and display it if its contains text', async () => {
                const textbox = screen.getByPlaceholderText(/add onions to the mixture/i);
                const button = screen.getByPlaceholderText(/add instruction/i);

                userEvent.type(textbox, '1. add rotten tomatoes');
                userEvent.click(button);

                userEvent.type(textbox, '2. add rotten cucumbers');
                userEvent.click(button);

                const firstSavedInstruction = await screen.findByText('1. add rotten tomatoes');
                const secondSavedInstruction = await screen.findByText('2. add rotten cucumbers');
                expect(firstSavedInstruction).toBeInTheDocument();
                expect(secondSavedInstruction).toBeInTheDocument();
            });
            test('clicking the delete button should remove the chosen instruction', async () => {
                // setup
                const textbox = screen.getByPlaceholderText(/add onions to the mixture/i);
                const button = screen.getByPlaceholderText(/add instruction/i);

                userEvent.type(textbox, '1. add rotten tomatoes');
                userEvent.click(button);

                userEvent.type(textbox, '2. add rotten cucumbers');
                userEvent.click(button);

                const firstSavedInstruction = await screen.findByText('1. add rotten tomatoes');
                const secondSavedInstruction = await screen.findByText('2. add rotten cucumbers');

                // test
                const deleteButtons = await screen.findAllByPlaceholderText('delete');
                const [firstDeleteButton] = deleteButtons;
                userEvent.click(firstDeleteButton);

                expect(firstSavedInstruction).not.toBeInTheDocument();
                expect(secondSavedInstruction).toBeInTheDocument();
            });
            test('editing and saving saved instruction should work', async () => {
                // setup
                const textbox = screen.getByPlaceholderText(/add onions to the mixture/i);
                const button = screen.getByPlaceholderText(/add instruction/i);

                userEvent.type(textbox, '1. add rotten tomatoes');
                userEvent.click(button);

                userEvent.type(textbox, '2. add rotten cucumbers');
                userEvent.click(button);

                const firstSavedInstruction = await screen.findByText('1. add rotten tomatoes');
                const secondSavedInstruction = await screen.findByText('2. add rotten cucumbers');

                // test
                const editButtons = await screen.findAllByPlaceholderText('edit');
                const [firstEditButton] = editButtons;

                userEvent.click(firstEditButton);
                const editInstructionTextbox = await screen.findByPlaceholderText('modify the instruction');

                userEvent.type(editInstructionTextbox, 'updated instruction');

                const saveButton = await screen.findByPlaceholderText('save');
                userEvent.click(saveButton);
                const updatedFirstInstruction = await screen.findByText('updated instruction');

                expect(firstSavedInstruction).not.toBeInTheDocument();
                expect(updatedFirstInstruction).toBeInTheDocument();
                expect(secondSavedInstruction).toBeInTheDocument();
            });
        });
    });

    describe('submit button', () => {
        test('should render submit button', () => {
            const button = screen.getByRole('button', { name: /create recipe/i });
            expect(button).toBeInTheDocument();
        });
        test('button type should be type submit', () => {
            const button = screen.getByRole('button', { name: /create recipe/i });
            expect(button.type).toBe('submit');
        });
        test('clicking the submit button should call dispatch recipeCreateAction', () => {
            const titleTextbox = screen.getByPlaceholderText(/title/i);
            const descriptionTextbox = screen.getByPlaceholderText(/description/i);
            const button = screen.getByRole('button', { name: /create recipe/i });

            userEvent.type(titleTextbox, 'new title');
            userEvent.type(descriptionTextbox, 'new description');
            userEvent.click(button);

            const timesActionDispatched = recipeCreateActionSpy.mock.calls.length;
            expect(timesActionDispatched).toBe(1);
            expect(recipeCreateActionSpy.mock.calls[0][0].title).toBe('new title');
            expect(recipeCreateActionSpy.mock.calls[0][0].description).toBe('new description');
            expect(recipeCreateActionSpy.mock.calls[0][0].flavor_type).toBe('Sour');
        });
        test('should redirect to home page after recipe is created', () => {
            const titleTextbox = screen.getByPlaceholderText(/title/i);
            const descriptionTextbox = screen.getByPlaceholderText(/description/i);
            const button = screen.getByRole('button', { name: /create recipe/i });

            userEvent.type(titleTextbox, 'new title');
            userEvent.type(descriptionTextbox, 'new description');
            userEvent.click(button);

            expect(Router.push.mock.calls.length).toBe(1);
            expect(Router.push.mock.calls[0][0]).toBe(pageRoute().home);
        });
        test('should not redirect after recipe creation fail', () => {
            recipeCreateActionSpy.mockReturnValueOnce(() => {
                throw new Error();
            });
            const titleTextbox = screen.getByPlaceholderText(/title/i);
            const descriptionTextbox = screen.getByPlaceholderText(/description/i);
            const button = screen.getByRole('button', { name: /create recipe/i });

            userEvent.type(titleTextbox, 'new title');
            userEvent.type(descriptionTextbox, 'new description');
            userEvent.click(button);

            expect(Router.push.mock.calls.length).toBe(0);
        });
    });
});

describe('guest users', () => {
    beforeEach(() => {
        cleanup();
        jest.clearAllMocks();
        const initialState = { isUserAuthenticated: false };
        store.dispatch({ type: TEST_CASE_AUTH, payload: initialState });
        render(
            <Provider store={store}>
                <RecipeCreate />
            </Provider>
        );
    });
    test('should redirect guest users to home page', () => {
        expect(Router.push.mock.calls.length).toBe(1);
        expect(Router.push.mock.calls[0][0]).toBe(pageRoute().home);
    });
});
