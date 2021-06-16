import React from 'react';
import { startDuoChatAction } from '../../redux/actions/chat';
import { useHistory } from 'react-router-dom';

function chooseUserToChatWith({ userListData, loggedUserData, chatsListData }) {
    const history = useHistory();

    const startDuoChatHandler = async (id) => {
        const newURL = await startDuoChatAction(id, chatsListData);
        history.push(newURL);
    };

    return (
        <div>
            {userListData.length > 0 ? (
                <>
                    <h3>Friends:</h3>
                    {userListData &&
                        userListData.map((user) => {
                            if (user.name !== loggedUserData.name) {
                                return (
                                    <li
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => startDuoChatHandler(user.id)}
                                        key={user.id}
                                    >
                                        {user.name}
                                    </li>
                                );
                            }
                        })}
                </>
            ) : (
                <>No Friends :(</>
            )}
        </div>
    );
}

export default chooseUserToChatWith;
