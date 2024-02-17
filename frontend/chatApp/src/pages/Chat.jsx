import React, { useEffect, useState } from "react";
import Contacts from "../components/Contacts";
import { allUserRoute } from "../utils/API_routes";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import LogOut from "../components/LogOut";
function Chat() {
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
          <ChatContainer currentChat={currentChat}></ChatContainer>
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
