import { CONNECT_SOCKET } from "../actions/types";

const initialState = {
  socket: null,
};

const socketReducer = (state = initialState, action) => {
  if (action.type === CONNECT_SOCKET) {
    return {
      ...state,
      socket: action.payload.socket,
    };
  }
  return { ...state };
};
export default socketReducer;
