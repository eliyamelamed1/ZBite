import axios from "axios";

export const startDuoChat = async (id, loggedUserId, chatsList) => {
  try {
    console.log(id, loggedUserId);
    const isChatExist = chatsList.find((chat) => {
      chat.members.includes(id);
    });

    if (!isChatExist) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
      };

      //   const body = JSON.stringify({
      //     id,
      //   });

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/chat_duos/create/`,
        { id },
        config
      );
      return `chat/${res.data.id}`;
    } else {
      return `chat/${isChatExist.id}`;
    }
  } catch (err) {
    console.log(err);
  }
};
