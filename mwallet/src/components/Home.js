import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className="content">
        <div className="logo-name">
          <img
            src="https://www.creativefabrica.com/wp-content/uploads/2021/08/22/Random-circle-logo-like-a-maze-Graphics-16173883-1.jpg"
            alt="logo"
            height="70px"
            width="100px"
            style={{ marginLeft: "-10px" }}
          />
          <img
            src="https://i.imghippo.com/files/hJ4057T.jpeg"
            alt=""
            height="70px"
            width="190px"
            style={{ marginLeft: "-20px" }}
          />
        </div>
        <h2> Hey There 👋</h2>
        <h4 className="h4">Welcome to your Web3 wallet</h4>
        <Button
          className="frontPageButton"
          type="primary"
          onClick={() => navigate("/yourwallet")}
        >
          Create a wallet
        </Button>
        <Button
          className="frontPageButton"
          type="default"
          onClick={() => navigate("/recover")}
        >
          Sign In With Seed Phrase
        </Button>
      </div>
    </>
  );
}

export default Home;
