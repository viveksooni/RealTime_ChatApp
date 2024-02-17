import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function LogOut() {
  const navigate = useNavigate();
  const handleClick = () => {
    // const id = await JSON.parse(localStorage.getItem("chat-app-user")._id);

    // const data = await axios(`${logoutRoute}/${id}`);

    // if (data.status === 200) {
    localStorage.clear();
    navigate("/login");
    // }
  };
  return <Button onClick={handleClick}>LogOut</Button>;
}
const Button = styled.button`
  position: absolute;
  left: 1250px;
  top: 15px;
  justify-content: left;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
`;
export default LogOut;
