import React from 'react';
import NotFound from '../../components/NotFound';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

beforeEach(() => {
    render(<NotFound />);
});
afterEach(() => {
    cleanup();
});

describe('NotFound', () => {
    test('renders without crashing', () => {});
    test('match notFound data-testid', () => {
        expect(screen.getByTestId('notFound')).toBeInTheDocument();
    });
    test('contains Not-Found massage', () => {
        expect(screen.getByText(/page not found/i)).toBeInTheDocument();
    });
});
