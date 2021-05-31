import { CONNECT_SOCKET } from "./types";
import io from "socket.io-client";
import { baseUrl } from "../utils/baseUrl";

export const connectSocket = () => {
  const socket = io(baseUrl);
  return {
    type: CONNECT_SOCKET,
    payload: { socket },
  };
};
