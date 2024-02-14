import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";
import { setAvatarRoute } from "../utils/API_routes";
function SetAvatar() {
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const navigate = useNavigate();
  const api = "https://robohash.org/";
  const toastOption = {
    position: "bottom-right",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const setProfilePic = async () => {
    console.log("clicked");
    if (selectedAvatar == undefined) {
      toast.error("Please, Select an Avatar!!", toastOption);
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      
      console.log("selected avatar: "+avatars[selectedAvatar]);

      const { data } = await axios.post(`${setAvatarRoute}`, {
        image: avatars[selectedAvatar],
        id:user._id
      });
      console.log(data);
      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("an error occured", toastOption);
      }
    }
  };
  async function something() {
    const data = [];

    for (let i = 0; i < 4; i++) {
      const AlphaNumericString =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
        "0123456789" +
        "abcdefghijklmnopqrstuvxyz";
      let randomString = "";

      for (let j = 0; j < 6; j++) {
        const indx = Math.round(Math.random() * AlphaNumericString.length);
        randomString += AlphaNumericString.charAt(indx);
      }
      data.push(randomString);
    }
    console.log(data);
    setAvatars(data);
    setIsLoading(false);
  }

  useEffect(() => {
    something();
  }, []);

  return (
    <Container>
      <div className="title-container">
        <h1>Pick an avatar as your profile picture..</h1>
      </div>

      <div className="avatars">
        {avatars.map((avatar, index) => {
          return (
            <div
              key={index}
              className={`avatar ${selectedAvatar == index ? "selected" : ""}`}
            >
              <img
                className="robo"
                src={`https://robohash.org/${avatar}/?set=set2 `}
                onClick={() => {
                  setSelectedAvatar(index);
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="submit-btn" onClick={setProfilePic}>
        Set as Profile Picture
      </div>
      <ToastContainer />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      .robo {
        border-radius: 50%;
        height: 15rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;

export default SetAvatar;
