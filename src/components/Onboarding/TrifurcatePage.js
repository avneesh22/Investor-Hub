import React from "react";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import Card from "../atoms/Card";
import { useDispatch } from "react-redux";
import { setUserRole } from "../../actions";

const TrifurcatePage = ({ setIdentity, identity }) => {
  const identities = ["Investor", "Startup", "User"];
  const [id, setId] = useState("");
  const [verified, setVerified] = useState(false);
  const dispatch=useDispatch()
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`You are now verified as a ${identities[identity]}`);
    dispatch(setUserRole(identities[identity]))
    setVerified(true);
  };

  return (
    <div>
      {identity === 2 && <Redirect to="/home" />}
      {verified && <Redirect to="/home" />}
      <Nav>
        <a href="/">
          <img height="60" src="/images/final-logo.png" alt="" />
        </a>
      </Nav>
      <h1 className="heading">
        Please choose one of the folowing which best describes you !
      </h1>
      <div className="card-container">
        {identities.map((ele, index) => (
          <Card
            identity={identity}
            key={index}
            setIdentity={setIdentity}
            index={index}
            value={ele}
          />
        ))}
      </div>
      {identity <= 1 && (
        <div>
          <form onSubmit={handleSubmit}>
            <label>Enter your {identities[identity]} ID:</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <input type="submit" />
          </form>
        </div>
      )}
    </div>
  );
};

const Nav = styled.nav`
  max-width: 1128px;
  margin: auto;
  padding: 12px 0 16px 0;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-wrap: nowrap;

  & > a {
    width: 135px;
    height: 34px;

    @media (max-width: 768px) {
      padding: 0 5px;
    }
  }
`;

const Join = styled.a`
  font-size: 16px;
  padding: 10px 12px;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.6);
  margin-right: 12px;
  font-weight: 600;
  border-radius: 4px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    color: rgba(0, 0, 0, 0.9);
    text-decoration: none;
    cursor: pointer;
  }
`;

const SignIn = styled.a`
  box-shadow: inset 0 0 0 1px #e6a106;
  color: #e6a106;
  border-radius: 24px;
  transition-duration: 167ms;
  font-size: 16px;
  font-weight: 600;
  line-height: 40px;
  padding: 12px 23px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0);

  &:hover {
    background-color: rgba(230, 161, 6, 0.15);
    color: #e6a106;
    text-decoration: none;
    cursor: pointer;
    box-shadow: inset 0 0 0 2px #e6a106;
  }
`;

export default TrifurcatePage;
