import React from "react";
import styled from "styled-components";

function Welcome({ currentUser }) {
  return (
    <Container>
      {currentUser && (
        <h1>
          welcome, <span>{currentUser.userName} !</span>{" "}
        </h1>
      )}
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  span {
    color: #4e0eff;
  }
  h3
  {
    margin-top:10px;
  }
`;

export default Welcome;
