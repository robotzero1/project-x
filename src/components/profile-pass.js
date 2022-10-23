import React, { useState, useRef, useEffect } from "react";
import { Link, navigate } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { getUser, logout } from "../services/auth";
import Countdown, { zeroPad } from "react-countdown";
import HeaderHamburger from "./header-hamburger";
import { hamburgerGridLayer } from "../components/layout.module.css";

const ProfilePass = () => {
  const [imgSrc, setImgSrc] = useState(null);

  // Renderer callback for Days condition
  const rendererDays = ({ days }) => {
    return <span> {days} </span>;
  };

  // Renderer callback with condition
  const renderer = ({ formatted: { hours, minutes, seconds } }) => {
    return (
      <span>
        {hours} : {minutes} : {seconds}
      </span>
    );
  };

  const BackgroundSVG =
    "%3Csvg xmlns='http://www.w3.org/2000/svg' aria-hidden='true' focusable='false' preserveAspectRatio='xMidYMid meet' viewBox='4 0 20 20' %3E%3Cpath d='M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41c-.24.13-.54.04-.68-.2a.506.506 0 0 1 .2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52c.25.13.34.43.21.67a.49.49 0 0 1-.44.28zM3.5 9.72a.499.499 0 0 1-.41-.79c.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25a.5.5 0 0 1-.12.7c-.23.16-.54.11-.7-.12a9.388 9.388 0 0 0-3.39-2.94c-2.87-1.47-6.54-1.47-9.4.01c-1.36.7-2.5 1.7-3.4 2.96c-.08.14-.23.21-.39.21zm6.25 12.07a.47.47 0 0 1-.35-.15c-.87-.87-1.34-1.43-2.01-2.64c-.69-1.23-1.05-2.73-1.05-4.34c0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39c-2.57 0-4.66 1.97-4.66 4.39c0 1.44.32 2.77.93 3.85c.64 1.15 1.08 1.64 1.85 2.42c.19.2.19.51 0 .71c-.11.1-.24.15-.37.15zm7.17-1.85c-1.19 0-2.24-.3-3.1-.89c-1.49-1.01-2.38-2.65-2.38-4.39c0-.28.22-.5.5-.5s.5.22.5.5c0 1.41.72 2.74 1.94 3.56c.71.48 1.54.71 2.54.71c.24 0 .64-.03 1.04-.1c.27-.05.53.13.58.41c.05.27-.13.53-.41.58c-.57.11-1.07.12-1.21.12zM14.91 22c-.04 0-.09-.01-.13-.02c-1.59-.44-2.63-1.03-3.72-2.1a7.297 7.297 0 0 1-2.17-5.22c0-1.62 1.38-2.94 3.08-2.94c1.7 0 3.08 1.32 3.08 2.94c0 1.07.93 1.94 2.08 1.94s2.08-.87 2.08-1.94c0-3.77-3.25-6.83-7.25-6.83c-2.84 0-5.44 1.58-6.61 4.03c-.39.81-.59 1.76-.59 2.8c0 .78.07 2.01.67 3.61c.1.26-.03.55-.29.64c-.26.1-.55-.04-.64-.29a11.14 11.14 0 0 1-.73-3.96c0-1.2.23-2.29.68-3.24c1.33-2.79 4.28-4.6 7.51-4.6c4.55 0 8.25 3.51 8.25 7.83c0 1.62-1.38 2.94-3.08 2.94s-3.08-1.32-3.08-2.94c0-1.07-.93-1.94-2.08-1.94s-2.08.87-2.08 1.94c0 1.71.66 3.31 1.87 4.51c.95.94 1.86 1.46 3.27 1.85c.27.07.42.35.35.61c-.05.23-.26.38-.47.38z' fill='rgba(255, 168, 0, 0.1)' /%3E%3C/svg%3E";

  useEffect(() => {
    if (localStorage.getItem("profile-image")) {
      setImgSrc(localStorage.getItem("profile-image"));
    } else {
      alert("photo not found. Please update your profile");
    }
  }, [localStorage.getItem("profile-image")]);

  return (
    <>
      <div style={{ display: "grid" }}>
        <StaticImage
          src="../images/profile-background.jpg"
          alt="Lookout on a beach"
          placeholder="dominantColor"
          transformOptions={{ cropFocus: "center" }}
          aspectRatio="1.5"
          style={{
            gridArea: "1/1",
          }}
        />
        <div className={hamburgerGridLayer}>
          <HeaderHamburger menuType="full" />
        </div>
      </div>
      <div
        style={{
          display: "grid",
          justifyItems: "center",
          position: "relative",
          marginTop: "-90px",
          width: "100%",
          background: "black",
          backgroundImage: `url("data:image/svg+xml;utf8,${BackgroundSVG}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          borderRadius: "12px 12px 0 0",
        }}
      >
        <div style={{ marginTop: "-86px" }}>
          {imgSrc && (
            <img
              src={imgSrc}
              style={{
                borderRadius: "50%",
                width: "260px",
                height: "260px",
                objectFit: "cover"
              }}
            />
          )}
        </div>
        <div
          style={{
            fontSize: "20px",
            textTransform: "uppercase",
            letterSpacing: "3px",
          }}
        >
          {getUser().name}
        </div>
        <div style={{ fontSize: "14px", lineHeight: "22px", color: "#FFA800" }}>
          Be Local Member #{getUser().id}
        </div>
        <div
          style={{
            fontSize: "1rem",
            fontWeight: "200",
            margin: "10px 0",
          }}
        >
          <Countdown
            renderer={rendererDays}
            date={parseInt(JSON.parse(localStorage.getItem("gatsbyUser")).expiry)}
          />{" "}
          days remaining
        </div>
        <div
          style={{
            fontSize: "1.3rem",
            fontWeight: "200",
            border: "1px solid rgba(255, 168, 0, 0.4)",
            padding: "10px 15px",
            margin: "10px 0",
          }}
        >
          <Countdown
            renderer={renderer}
            date={parseInt(JSON.parse(localStorage.getItem("gatsbyUser")).expiry)}
          />
        </div><p>&nbsp;</p>      <p>&nbsp;</p>     
      </div>
      
    </>
  );
};

export default ProfilePass;
