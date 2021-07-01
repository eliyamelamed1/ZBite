// test getUser is called
// test user is displayed

import React from 'react';
import UserCard from './UserCard';

const displayUsers = ({ users }) => {
    const getUsers = () => {
        if (users) {
            const usersOnPage = [];
            const result = [];

            users.map((user) =>
                usersOnPage.push(
                    <UserCard email={user.email} photo_main={user.photo_main} id={user.id} name={user.name} />
                )
            );

            // 3 is for 3 users on page
            for (let i = 0; i < users.length; i += 1) {
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
