import React, { useState, useEffect } from "react";
import { Link, navigate } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { getUser, logout } from "../services/auth";
import ListStatus from "./list-status";
import HeaderHamburger from "./header-hamburger";
import {
  hamburgerGridLayer,
  profileH2,
  profileCard,
  profileCardBigNumber,
  profileCardName,
  profileCardNote,
  profileMoreClubsBox,
  profileLogout,
  profileMoreClubsLink,
} from "../components/layout.module.css";

const ProfileStatus = () => {
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("profile-image")) {
      setImgSrc(localStorage.getItem("profile-image"));
    } else {
      alert("Photo not found. Please edit your profile");
    }
  }, [localStorage.getItem("profile-image")]);

  return (
    <>
      <div className={hamburgerGridLayer} style={{ background: "black" }}>
        <HeaderHamburger menuType="full" />
      </div>

      <div className={profileCard}>
        <div>
          {imgSrc && (
            <img
              src={imgSrc}
              style={{
                borderRadius: "50%",
                width: "110px",
                height: "110px",
                objectFit: "cover",
              }}
            />
          )}
        </div>
        <div className={profileCardBigNumber}>878{getUser().card_code} {getUser().card_number}</div>
        <div className={profileCardName}>{getUser().name}</div>
        <div className={profileCardNote}>Be Local Member #{getUser().id}</div>
      </div>

      <h2 className={profileH2}>Guest Lists Status</h2>

      <ListStatus />

      <div className={profileMoreClubsBox}>
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            logout(() => navigate(`/app/login`));
          }}
        >
          <div className={profileLogout}>
            LOG OUT&nbsp;&nbsp;
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
              width="13px"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 64 64"
            >
              <path
                d="M62 10.571L53.429 2L32 23.429L10.571 2L2 10.571L23.429 32L2 53.429L10.571 62L32 40.571L53.429 62L62 53.429L40.571 32z"
                fill="#ec1c24"
              />
            </svg>
          </div>
        </a>
        <Link to="/clubs">
          <div className={profileMoreClubsLink}>
            View more clubs
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
              width="13px"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 15 15"
            >
              <path
                d="M9.163 4.516c.418.408 4.502 4.695 4.502 4.695a1.095 1.095 0 0 1 0 1.576s-4.084 4.289-4.502 4.695c-.418.408-1.17.436-1.615 0c-.446-.434-.481-1.041 0-1.574L11.295 10L7.548 6.092c-.481-.533-.446-1.141 0-1.576c.445-.436 1.197-.409 1.615 0z"
                fill="rgba(255, 168, 0, 1)"
              />
            </svg>
          </div>
        </Link>
      </div>
      <p>&nbsp;</p>
    </>
  );
};

export default ProfileStatus;
