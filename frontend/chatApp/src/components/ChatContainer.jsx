import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import { addMsgRoute, getMsgRoute } from "../utils/API_routes";
import axios from "axios";
function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMsg, setArrivalMsg] = useState([]);
  const scrollRef = useRef();
  const loadChats = async () => {
    if (currentChat) {
      const data = await JSON.parse(localStorage.getItem("chat-app-user"));
      const response = await axios.post(`${getMsgRoute}`, {
        from: data._id,
        to: currentChat._id,
      });

      setMessages(response.data);
    }
  };

  useEffect(() => {
    loadChats();
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(localStorage.getItem("chat-app-user"))._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);
  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(localStorage.getItem("chat-app-user"));

    if (msg.length > 0) {
      await axios.post(`${addMsgRoute}`, {
        message: msg,
        users: [data._id, currentChat._id],
        from: data._id,
      });

      socket.current.emit("send-msg", {
        to: currentChat._id,
        from: data._id,
        msg: msg,
      });
      setMessages([...messages, { fromSelf: true, msg }]);
    } else {
      console.log("type to kr");
    }
  };
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMsg({ fromSelf: false, msg: msg });
      });
    }
  }, []);

  useEffect(() => {
    console.log(arrivalMsg);
    arrivalMsg && setMessages((prev) => [...prev, arrivalMsg]);
    console.log(messages);
  }, [arrivalMsg]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);
  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`https://robohash.org/${currentChat.AvatarImage}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{currentChat.userName}</h3>
          </div>
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref ={scrollRef} key={Math.random() * 1000}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.msg}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg}></ChatInput>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: auto;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 2rem;
      .avatar {
        img {
          height: 4rem;
          border-radius: 50%;
        }
      }
      .username {
        h3 {
          text-transform: uppercase;
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #6c3483;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9b59b6;
      }
    }
  }
`;
export default ChatContainer;
