import React from "react";
import { Link, navigate } from "gatsby";
import { getUser, isLoggedIn, logout } from "../services/auth";
import {
  footerMember,
  footerMemberBlock,
  footerMemberIcon,
} from "../components/layout.module.css";

const FooterMember = () => {
  return (
    <div className={footerMember} style={{padding: "10px"}}>
      {isLoggedIn() && (
        <div className={footerMemberBlock} style={{border: "solid #7b7b7b 1px"}}>
          <div className={footerMemberIcon}>
            <Link to="/app/profile-edit" style={{display: "flex", justifyContent: "center", padding: "7px"}} activeStyle={{background: "rgb(56 56 56)"}}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
                width="26px"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path
                  d="M18.988 2.012l3 3L19.701 7.3l-3-3z"
                  fill="rgba(255, 168, 0, 1)"
                />
                <path
                  d="M8 16h3l7.287-7.287l-3-3L8 13z"
                  fill="rgba(255, 168, 0, 1)"
                />
                <path
                  d="M19 19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z"
                  fill="rgba(255, 168, 0, 1)"
                />
                <rect
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                  fill="rgba(0, 0, 0, 0)"
                />
              </svg>
              <div style={{marginLeft: "4px"}}>              
              <span style={{fontSize: ".9rem"}}>
              EDIT
              </span>
              </div>
            </Link>
          </div>

          <div className={footerMemberIcon}>
            <Link to="/app/profile-status" style={{display: "flex", justifyContent: "center", padding: "7px"}} activeStyle={{background: "rgb(56 56 56)"}}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
                width="20px"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 20 20"
                style={{float: "left"}}                
              >
                <path
                  d="M2 19h16c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1H2c-.55 0-1 .45-1 1v16c0 .55.45 1 1 1zM4 3c.55 0 1 .45 1 1s-.45 1-1 1s-1-.45-1-1s.45-1 1-1zm13 0v2H6V3h11zM4 7c.55 0 1 .45 1 1s-.45 1-1 1s-1-.45-1-1s.45-1 1-1zm13 0v2H6V7h11zM4 11c.55 0 1 .45 1 1s-.45 1-1 1s-1-.45-1-1s.45-1 1-1zm13 0v2H6v-2h11zM4 15c.55 0 1 .45 1 1s-.45 1-1 1s-1-.45-1-1s.45-1 1-1zm13 0v2H6v-2h11z"
                  fill="rgba(255, 168, 0, 1)"
                />
                <rect
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  fill="rgba(0, 0, 0, 0)"
                />
              </svg>
              <div style={{marginLeft: "4px"}}>        
              <span style={{fontSize: ".9rem"}}>
              STATUS
              </span>
              </div>
            </Link>
          </div>

          <div className={footerMemberIcon}>
            <Link to="/app/profile-pass" style={{display: "flex", justifyContent: "center", padding: "7px"}} activeStyle={{background: "rgb(56 56 56)"}}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
                width="24px"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
                style={{float: "left"}}                  
              >
                <path
                  d="M20 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16zm-1 2H5v16h14V4zm-3 12v2H8v-2h8zM12 6a4 4 0 1 1 0 8a4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4a2 2 0 0 0 0-4z"
                  fill="rgba(255, 168, 0, 1)"
                />
                <rect
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                  fill="rgba(0, 0, 0, 0)"
                />
              </svg>
              <div style={{marginLeft: "4px"}}>              
              <span style={{fontSize: ".9rem"}}>
              PASS
              </span>
              </div>
            </Link>
          </div>
        </div>
      )}

    </div>
  );
};

export default FooterMember;
