// test getUser is called
// test user is displayed

import React from 'react';
import UserCard from './UserCard';
import { useSelector } from 'react-redux';

const displayUsers = () => {
    const userListData = useSelector((state) => state.authReducer.userListData);
    const getUsers = () => {
        if (userListData) {
            const usersOnPage = [];
            const result = [];

            userListData.map((user) =>
                usersOnPage.push(
                    <UserCard email={user.email} photo_main={user.photo_main} id={user.id} name={user.name} />
                )
            );

            // 3 is for 3 users on page
            for (let i = 0; i < userListData.length; i += 1) {
                result.push(
                    <div key={i}>
                        <div>{usersOnPage[i] ? usersOnPage[i] : null}</div>
                    </div>
                );
            }

            return result;
        } else {
            return null;
        }
    };
    return <div data-testid='displayUsers'>{getUsers()}</div>;
};

export default displayUsers;
