import '@testing-library/jest-dom/extend-expect';

import * as UserActions from '../../../redux/actions/userActions';

import Leaderboard, { getStaticProps } from '../../../pages/users/Leaderboard';
import { cleanup, render, screen } from '@testing-library/react';

import store from '../../../redux/store';

jest.mock('../../../redux/store.tsx');

const loadLeaderboardActionSpy = jest.spyOn(UserActions, 'loadLeaderboardAction');
const listOfLeaderboardUsers = [
    {
        id: 'firstUserId',
        name: 'firstUserName',
        score: 1.1,
        photo_main: { src: '/firstUserImage' },
    },
    {
        id: 'secondUserId',
        name: 'secondUserName',
        score: 1.2,
        photo_main: { src: '/secondUserImage' },
    },
    {
        id: 'thirdUserId',
        name: 'thirdUserName',
        score: 1.3,
        photo_main: { src: '/thirdUserImage' },
    },
    {
        id: 'fourthUserId',
        name: 'fourthUserName',
        score: 1.4,
        photo_main: { src: '/fourthUserImage' },
    },
    {
        id: 'fifthUserId',
        name: 'fifthUserName',
        score: 1.5,
        photo_main: { src: '/fifthUserImage' },
    },
    {
        id: 'sixthUserId',
        name: 'sixthUserName',
        score: 1.6,
        photo_main: { src: '/sixthUserImage' },
    },
    {
        id: 'seventhUserId',
        name: 'seventhUserName',
        score: 1.7,
        photo_main: { src: '/seventhUserImage' },
    },
    {
        id: 'eighthUserId',
        name: 'eighthUserName',
        score: 1.8,
        photo_main: { src: '/eighthUserImage' },
    },
    {
        id: 'ninthUserId',
        name: 'ninthUserName',
        score: 1.9,
        photo_main: { src: '/ninthUserImage' },
    },
    {
        id: 'tenthUserId',
        name: 'tenthUserName',
        score: 2.1,
        photo_main: { src: '/tenthUserImage' },
    },
];
const initialListOfLeaderboardUsers = [
    {
        id: 'firstUserId',
        name: 'firstUserName',
        score: 2.2,
        photo_main: { src: '/firstUserImage' },
    },
];

describe('Leaderboard', () => {
    describe('getStaticProps', () => {
        beforeEach(() => {
            cleanup();
            jest.clearAllMocks();
            store.getState = () => ({
                userReducer: {
                    listOfLeaderboardUsers: listOfLeaderboardUsers,
                },
            });
        });

        test('getStaticProps should dispatch loadLeaderboardAction', async () => {
            (await getStaticProps()).props.listOfLeaderboardUsers;
            expect(loadLeaderboardActionSpy).toHaveBeenCalled();
        });
        test('getStaticProps - should return matching revalidate', async () => {
            const revalidate = (await getStaticProps()).revalidate;
            expect(revalidate).toBe(10);
        });
        test('getStaticProps - should return matching props', async () => {
            const props = (await getStaticProps()).props;
            expect(props.listOfLeaderboardUsers).toEqual(listOfLeaderboardUsers);
        });
    });
    describe('list with 10 users', () => {
        beforeEach(() => {
            cleanup();
            jest.clearAllMocks();
            store.getState = () => ({
                userReducer: {
                    listOfLeaderboardUsers: listOfLeaderboardUsers,
                },
            });
            render(<Leaderboard listOfLeaderboardUsers={listOfLeaderboardUsers} />);
        });
        test('should render without crashing', () => {});
        test('should render all users relevant fields', () => {
            listOfLeaderboardUsers.forEach((user) => {
                let score = screen.getByText(user.score);
                let name = screen.getByText(user.name);

                expect(score).toBeInTheDocument();
                expect(name).toBeInTheDocument();
            });
        });
    });

    describe('list with less than 10 users', () => {
        beforeEach(() => {
            cleanup();
            jest.clearAllMocks();
            store.getState = () => ({
                userReducer: {
                    listOfLeaderboardUsers: initialListOfLeaderboardUsers,
                },
            });
            render(<Leaderboard listOfLeaderboardUsers={initialListOfLeaderboardUsers} />);
        });
        test('should render without crashing', () => {});
        test('should render all users relevant fields', () => {
            initialListOfLeaderboardUsers.forEach((user) => {
                if (!user?.score || !user?.name) return;

                let score = screen.queryByText(user?.score);
                let name = screen.queryByText(user?.name);

                expect(score).toBeInTheDocument();
                expect(name).toBeInTheDocument();
            });
        });
    });
});
