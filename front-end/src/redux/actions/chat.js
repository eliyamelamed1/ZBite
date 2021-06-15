import axios from "axios";

import { CHAT_LIST_SUCCESS, CHAT_LIST_FAIL } from "./types";

export const getChatsList = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  };
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/chat_duos/list/`,
      config
    );
    dispatch({ type: CHAT_LIST_SUCCESS, payload: res.data });
  } catch {
    dispatch({ type: CHAT_LIST_FAIL });
  }
};
