import '@testing-library/jest-dom/extend-expect';

import { cleanup, render, screen } from '@testing-library/react';

import Custom404 from '../../pages/404';
import React from 'react';

beforeEach(() => {
    render(<Custom404 />);
});
afterEach(() => {
    cleanup();
});

describe('NotFound', () => {
    test('renders without crashing', () => {});
    test('match custom404 data-testid', () => {
        expect(screen.getByTestId('custom404')).toBeInTheDocument();
    });
    test('contains Not-Found massage', () => {
        expect(screen.getByText(/page not found/i)).toBeInTheDocument();
    });
});
