// import React,{useState, useEffect} from "react";

import React from 'react';
import { useLocation } from 'react-router-dom';

function ChatDetails() {
    const location = useLocation();
    const messageWithId = location.pathname.split('/chat/')[1];

    //   const [messages,setMessages] = useState([])

    //   useEffect(()=>{
    //       const res = axios.get( `${process.env.REACT_APP_API_URL}/api/chat_massages/${messageWithId}/`)

    //   })
    return <div>{messageWithId}</div>;
}

export default ChatDetails;
