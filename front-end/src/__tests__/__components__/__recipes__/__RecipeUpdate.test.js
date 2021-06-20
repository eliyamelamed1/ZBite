// TODO - add test to reload page after recipe have been updated
// TODO - add tests to verify onSubmit function is working properly

import '@testing-library/jest-dom/extend-expect';

import { cleanup, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import React from 'react';
import RecipeUpdate from '../../../components/recipes/RecipeUpdate';
import store from '../../../redux/store';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
    const id = '1';
    render(
        <Provider store={store}>
            <RecipeUpdate id={id} />
        </Provider>
    );
});

afterEach(() => {
    cleanup();
});
describe('RecipeUpdate - general ', () => {
    test('should render without crashing', () => {});
    test('data-testid match recipeUpdate', () => {
        const testid = screen.getByTestId('recipeUpdate');
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

describe('RecipeUpdate - update button', () => {
    test('should render update button', () => {
        const updateButton = screen.getByRole('button', { name: /update/i });
        expect(updateButton).toBeInTheDocument();
    });
    test('button type should be type submit', () => {
        const updateButton = screen.getByRole('button', { name: /update/i });
        expect(updateButton.type).toBe('submit');
    });
    test('update button should call onSubmit function', () => {
        const updateButton = screen.getByRole('button', { name: /update/i });
        userEvent.click(updateButton);
        const onSubmitHaveBeenCalled = screen.getByTestId('onSubmitHaveBeenCalled');
        expect(onSubmitHaveBeenCalled).toBeInTheDocument();
    });
});
