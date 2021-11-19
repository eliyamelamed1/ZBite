import '@testing-library/jest-dom';

import * as UserCard from '../../../components/users/UserCard';

import { cleanup, render, screen } from '@testing-library/react';

import DisplayUsers from '../../../components/users/DisplayUsers';
import React from 'react';

const userCardSpy = jest.spyOn(UserCard, 'default');

const firstUserData = {
    email: 'user email',
    photo_main: '/#',
    id: 'userId',
    name: 'user name',
};
const secondUserData = {
    email: 'user email2',
    photo_main: '/#',
    id: 'userId2',
    name: 'user name2',
};
const usersToDisplay = [firstUserData, secondUserData];

describe('DisplayUsers', () => {
    beforeEach(() => {
        cleanup();
        jest.clearAllMocks();
        render(<DisplayUsers usersToDisplay={usersToDisplay} />);
    });
    test('should render without crashing', () => {});
    test('should have called recipeCard twice', () => {
        expect(userCardSpy.mock.calls.length).toBe(2);
    });
    test('should have called recipeCard with the proper recipe data', () => {
        expect(userCardSpy.mock.calls[0][0]).toEqual(firstUserData);
        expect(userCardSpy.mock.calls[1][0]).toEqual(secondUserData);
    });
    test('component data-testid should match displayUsers', () => {
        const displayUsers = screen.getByTestId('displayUsers');
        expect(displayUsers).toBeInTheDocument();
    });
});
