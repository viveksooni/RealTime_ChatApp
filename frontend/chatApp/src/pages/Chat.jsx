import React, { useEffect, useState } from "react";
import Contacts from "../components/Contacts";
import { allUserRoute } from "../utils/API_routes";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Chat() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  const logOut = async () => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/");
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
        console.log(data);
        setContacts(data);
      } else {
        navigate("/setAvatar");
      }
    }
  };
  useEffect(() => {
    getContatcts();
  }, [currentUser]);
  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts}></Contacts>
      </div>
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
