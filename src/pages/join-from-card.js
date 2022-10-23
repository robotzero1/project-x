import React from "react";
import { useState } from "react";
import { handleLogin, isLoggedIn } from "../services/auth"
import { StaticImage } from "gatsby-plugin-image";
import Layout from "../components/layout";
import HeaderHamburger from "../components/header-hamburger";
import {
  profileCard,
  profileCardBigNumber,
  profileCardName,
  profileCardNote,
  signupContent,
  formCardJoin,
  formCardJoinFirstHalf,
  formCardJoinSecondHalf,
  formCardJoinFullWidth,
  formButton,
} from "../components/layout.module.css";

const Join = () => {
  const [state, setState] = useState({
    inputcardnumber: "",
    inputcardcode: "",
    inputmembername: "",
    inputmemberemail: "",
    inputmemberpass: "",
    joinStatus: null,
  });
  const [joinStatus, setJoinStatus] = useState(null);

  const handleJoinFromCard = () => {
    const myRequest = new Request(
      "https://f.co.uk/member/join-from-card.php",
      {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inputcardnumber: state["inputcardnumber"],
          inputcardcode: state["inputcardcode"],
          inputmembername: state["inputmembername"],
          inputmemberemail: state["inputmemberemail"],
          inputmemberpass: state["inputmemberpass"],
        }),
      }
    );

    fetch(myRequest)
      .then(handleErrors)
      .then((response) => response.text())
      .then((text) => {
        console.log(text);
        if (text.substring(0, 7) == "failed:") {
          setJoinStatus(text.substring(7));
        } else {
          setJoinStatus(text);
          setTimeout(() => {  
            handleLogin({inputuser: state["inputmemberemail"], inputpass: state["inputmemberpass"]})
          }, 2500);
          
        }
      })
      .catch((error) => console.log(error));

    return false;
  };

  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  const handleUpdate = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleJoinFromCard();
  };

  return (
    <Layout pageTitle="Join from Card">
      <div>
        <HeaderHamburger menuType="back" parentLink="join" />

        <div className={profileCard}>
          <div>
            <StaticImage
              src="../images/temp-profile.jpg"
              alt="Profle Image"
              placeholder="dominantColor"
              height="60"
            />
          </div>
          <div className={profileCardBigNumber}>888888888 888888</div>
          <div className={profileCardName}>project-x Member</div>
        </div>

        <div className={signupContent}>
          <h2>Join With Membership Card</h2>
          <p>
            Buy a membership card from one of our retailers and enter the
            details below
          </p>

          <form
            method="post"
            onSubmit={(event) => {
              handleSubmit(event);
            }}
            className={formCardJoin}
          >
            <label className={formCardJoinFirstHalf}>
              Card Number
              <input
                type="number"
                required
                name="inputcardnumber"
                placeholder="First number on card"
                onChange={handleUpdate}
              />
            </label>
            <label className={formCardJoinSecondHalf}>
              Card Code
              <input
                type="number"
                required
                name="inputcardcode"
                placeholder="Second number on card"
                onChange={handleUpdate}
              />
            </label>
            <label className={formCardJoinFullWidth}>
              Full Name
              <input
                type="text"
                required
                name="inputmembername"
                placeholder="Please enter your full name"
                onChange={handleUpdate}
              />
            </label>
            <label className={formCardJoinFullWidth}>
              Email
              <input
                type="email"
                autocomplete="username"
                required
                name="inputmemberemail"
                placeholder="Please enter your email"
                onChange={handleUpdate}
              />
            </label>
            <label className={formCardJoinFullWidth}>
              Create Password
              <input
                type="password"
                autocomplete="password"
                required
                name="inputmemberpass"
                placeholder="Please create a password for this account"
                onChange={handleUpdate}
              />
            </label>
            <button className={formButton} type="submit">
              JOIN
            </button>
          </form>
          <div>{joinStatus}</div>
        </div>
      </div>
    </Layout>
  );
};

export default Join;
