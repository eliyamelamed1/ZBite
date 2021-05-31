import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { connectSocket } from "../actions/socket";
import Navbar from "../components/Navbar";
import { connect } from "react-redux";
import { loadLoggedUserDetailsAction } from "../actions/auth";
import NewMessage from "../components/notifications/NewMessage";

const layout = ({ loadLoggedUserDetailsAction, children }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [messageReceived, setMessageReceivied] = useState({
    sender: "",
    text: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connectSocket());
  }, [dispatch]);

  const { socket } = useSelector((state) => state.socketReducer);

  useEffect(() => {
    if (socket) {
      loadLoggedUserDetailsAction(socket);
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("message-received", ({ sender, text }) => {
        console.log("------------");
        setShowPopup(true);
        setMessageReceivied({ sender, text }); //while on chat dont show popup
      });
    }
  }, [socket]);

  useEffect(() => {
    if (showPopup && messageReceived) {
      setTimeout(() => {
        setShowPopup(false);
        setMessageReceivied(null);
      }, 3000);
    }
  }, [showPopup, messageReceived]);

  return (
    <div data-testid="layout">
      <meta name="csrf_token" content="{{ csrf_token }}"></meta>
      <Navbar />
      {showPopup && messageReceived !== null && (
        <>
          <NewMessage
            setShowPopup={setShowPopup}
            setMessageReceivied={setMessageReceivied}
            sender={messageReceived.sender}
            text={messageReceived.text}
          />
        </>
      )}
      {children}
    </div>
  );
};

export default connect(null, { loadLoggedUserDetailsAction })(layout);
