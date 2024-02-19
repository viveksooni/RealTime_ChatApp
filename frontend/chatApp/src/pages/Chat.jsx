import React, { useEffect, useState,useRef } from "react";
import Contacts from "../components/Contacts";
import { allUserRoute, host } from "../utils/API_routes";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import LogOut from "../components/LogOut";
import { io } from "socket.io-client";
function Chat() {
  const socket = useRef();
  const [currentUser, setCurrentUser] = useState();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const navigate = useNavigate();

  const logOut = async () => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
    }
  };
  useEffect(() => {
    logOut();
  }, []);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  },[currentUser]);
  const getContatcts = async () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const { data } = await axios(`${allUserRoute}/${currentUser._id}`);

        setContacts(data);
      } else {
        navigate("/setAvatar");
      }
    }
  };

  useEffect(() => {
    getContatcts();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} chatChange={handleChatChange}></Contacts>

        {currentChat === undefined ? (
          <Welcome currentUser={currentUser}></Welcome>
        ) : (
          <ChatContainer currentChat={currentChat} socket={socket}></ChatContainer>
        )}
      </div>
      <LogOut></LogOut>
    </Container>
  );
}
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
