import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

import * as RecipeActions from '../../../redux/actions/recipeActions';

import { cleanup, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import React from 'react';
import RecipeCreate from '../../../pages/recipes/RecipeCreate';
import Router from 'next/router';
import { TEST_CASE_AUTH } from '../../../redux/types';
import configureStore from 'redux-mock-store';
import { pageRoute } from '../../../globals';
import store from '../../../redux/store';
import thunk from 'redux-thunk';
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

    describe('flavor type input', () => {
        test('should render flavor type input', () => {
            const combobox = screen.getByRole('combobox');
            expect(combobox).toBeInTheDocument();
        });
        test('should match flavor type attributes', () => {
            const combobox = screen.getByRole('combobox');
            expect(combobox.required).toBe(true);
            expect(combobox.type).toBe('select-one');
            expect(combobox.name).toBe('flavor_type');
        });
        test('flavor type value should change according to input (onchange)', () => {
            const combobox = screen.getByRole('combobox');
            userEvent.selectOptions(combobox, 'Sour');
            expect(combobox.value).toBe('Sour');
        });
        test('should have 3 accessible flavor types options', () => {
            const sourFlavor = screen.getByRole('option', { name: 'Sour' });
            const sweetFlavor = screen.getByRole('option', { name: 'Sweet' });
            const saltyFlavor = screen.getByRole('option', { name: 'Salty' });

            expect(sourFlavor).toBeInTheDocument();
            expect(sweetFlavor).toBeInTheDocument();
            expect(saltyFlavor).toBeInTheDocument();
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
            const combobox = screen.getByRole('combobox');
            const button = screen.getByRole('button', { name: /create recipe/i });

            userEvent.type(titleTextbox, 'new title');
            userEvent.type(descriptionTextbox, 'new description');
            userEvent.selectOptions(combobox, 'Sour');
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
            const combobox = screen.getByRole('combobox');
            const button = screen.getByRole('button', { name: /create recipe/i });

            userEvent.type(titleTextbox, 'new title');
            userEvent.type(descriptionTextbox, 'new description');
            userEvent.selectOptions(combobox, 'Sour');
            userEvent.click(button);

            expect(Router.push.mock.calls.length).toBe(1);
            expect(Router.push.mock.calls[0][0]).toBe(pageRoute.home);
        });
        test('should not redirect after recipe creation fail', () => {
            recipeCreateActionSpy.mockReturnValueOnce(() => {
                throw new Error();
            });
            const titleTextbox = screen.getByPlaceholderText(/title/i);
            const descriptionTextbox = screen.getByPlaceholderText(/description/i);
            const combobox = screen.getByRole('combobox');
            const button = screen.getByRole('button', { name: /create recipe/i });

            userEvent.type(titleTextbox, 'new title');
            userEvent.type(descriptionTextbox, 'new description');
            userEvent.selectOptions(combobox, 'Sour');
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
        expect(Router.push.mock.calls[0][0]).toBe(pageRoute.home);
    });
});
