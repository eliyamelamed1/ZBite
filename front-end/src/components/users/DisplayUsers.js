// test getUser is called
// test user is displayed

import PropTypes from 'prop-types';
import React from 'react';
import UserCard from './UserCard';

const displayUsers = ({ usersToDisplay }) => {
    const getUsers = () => {
        if (usersToDisplay) {
            const usersOnPage = [];
            const result = [];

            usersToDisplay.map((user) =>
                usersOnPage.push(
                    <UserCard email={user.email} photo_main={user.photo_main} id={user.id} name={user.name} />
                )
            );

            // 3 is for 3 users on page
            for (let i = 0; i < usersToDisplay.length; i += 1) {
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

displayUsers.propTypes = {
    usersToDisplay: PropTypes.array.isRequired,
};

export default displayUsers;
