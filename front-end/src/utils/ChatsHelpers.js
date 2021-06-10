import axios from "axios";

export const startDuoChat = async (id, chatsList) => {
  try {
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

      const body = JSON.stringify({
        id,
      });

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/chat_duos/create/`,
        body,
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
