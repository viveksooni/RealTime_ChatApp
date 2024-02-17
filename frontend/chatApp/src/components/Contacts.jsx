import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
function Contacts({ contacts, chatChange }) {
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const navigate = useNavigate();
  const setUserData = async () => {
    const data = await JSON.parse(localStorage.getItem("chat-app-user"));
    setCurrentUserName(data.userName);
    setCurrentUserImage(data.AvatarImage);
  };
  useEffect(() => {
    setUserData();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    chatChange(contact);
  };
  return (
    <Container>
      <div className="brand">
        <h3>{"< Chat App / >"}</h3>
      </div>
      <div className="contacts">
        {contacts.map((contact, index) => {
          return (
            <div
              key={contact._id}
              className={`contact ${
                index === currentSelected ? "selected" : ""
              }`}
              onClick={() => changeCurrentChat(index, contact)}
            >
              <div className="avatar">
                <img
                  src={`https://robohash.org/${contact.AvatarImage}`}
                  alt="roboPhoto"
                />
              </div>
              <div className="username">
                <h3>{contact.userName}</h3>
              </div>
            </div>
          );
        })}
      </div>
      <div className="current-user">
        <div className="avatar">
          <img
            src={`https://robohash.org/${currentUserImage}`}
            alt="avatar"
            onClick={() => navigate("/setAvatar")}
          />
        </div>
        <div className="username">
          <h2>{currentUserName}</h2>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contact:hover {
    transform: scale(1.1);
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      text-transform: uppercase;
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 5rem;
          border-radius: 50%;
        }
      }

      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    text-transform: uppercase;
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 6rem;
        max-inline-size: 100%;
        border-radius: 50%;
      }
      img:hover {
        transform: scale(1.2);
        border: 0.4rem solid #4e0eff;
        background-color: #0d0d30;
    
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
export default Contacts;
