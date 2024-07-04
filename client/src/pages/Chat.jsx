import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAllUsers, host } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";
import "../styles/chat.css";

function Chat() {
  const socket = useRef();
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrnetUser] = useState(undefined);
  const [currentChat, setCurrnetChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (!localStorage.getItem("userDetails")) {
        navigate("/login");
      } else {
        setCurrnetUser(await JSON.parse(localStorage.getItem("userDetails")));
        setIsLoaded(true);
      }
    })();
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host, {
        // withCredentials: true,
      });
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    (async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const { data } = await axios.get(`${getAllUsers}/${currentUser._id}`);
          setUsers(data.users);
        } else {
          navigate("/setAvatar");
        }
      }
    })();
  }, [currentUser, navigate]);

  const handleChatChange = (chat) => {
    setCurrnetChat(chat);
  };

  return (
    <div className="parent-chat-container">
      <div className="child-chat-container">
        <Contacts
          contacts={users}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {isLoaded && currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer
            currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
          />
        )}
      </div>
    </div>
  );
}

export default Chat;
