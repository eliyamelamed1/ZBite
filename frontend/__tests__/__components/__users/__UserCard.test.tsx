// TODO find a way

import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

import { cleanup, render, screen } from '@testing-library/react';

import React from 'react';
import UserCard from '../../../components/users/UserCard';

beforeEach(() => {
    render(<UserCard name='userName' email='userEmail' id='userId' photo_main='/userImage' />);
});

afterEach(() => {
    cleanup();
});

describe('UserCard', () => {
    test('renders without crashing', () => {});
    test('UserCard renders user details', () => {
        expect(screen.getByText(/name: userName/)).toBeInTheDocument();
        expect(screen.getByText(/email: userEmail/)).toBeInTheDocument();

        const image = screen.getByAltText(/userImage/);
        // expect(image.src).toBe('http://localhost/userImage');
    });
    test('link to user detail contains user id', () => {
        const userDetailUrl = screen.getByRole('link', { name: /profile/i });
        expect(userDetailUrl.href).toBe('http://localhost/users/userId');
    });
});
