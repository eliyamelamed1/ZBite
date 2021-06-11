import React from "react";
import { startDuoChat } from "../../utils/ChatsHelpers";
import { useHistory } from "react-router-dom";

function FriendList({ userList, loggedUser, chatsList }) {
  const history = useHistory();

  const startDuoChatHandler = async (id) => {
    const newURL = await startDuoChat(id, chatsList);
    history.push(newURL);
  };

  return (
    <div>
      {userList.length > 0 ? (
        <>
          <h3>Friends:</h3>
          {userList &&
            userList.map((user) => {
              if (user.name !== loggedUser.name) {
                return (
                  <li
                    style={{ cursor: "pointer" }}
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

export default FriendList;
