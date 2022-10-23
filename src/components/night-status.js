import React from "react";
import { useEffect, useState } from "react";
import { getUser } from "../services/auth";
import { listRequestEntry } from "../components/layout.module.css";

const NightStatus = ({ nightID }) => {
  console.log(nightID);

  const [status, setStatus] = useState(null);
  const [buttonStatus, setbuttonStatus] = useState(null);

  const handleErrors = (response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  };

  const showFailedMessage = (message) => {
    console.log(message);
    // const messageArea = document.querySelector(".list-status-container");
    // const messageInner = document.createElement("div");
    // messageInner.style.backgroundColor = "pink";
    // messageArea.appendChild(messageInner).innerHTML = message;
  };

  const updateList = () => {
    fetch("https://f.co.uk/member/night-request.php", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: getUser().idx,
        night: nightID,
      }),
    })
      .then(handleErrors)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.hasOwnProperty("error")) {
          showFailedMessage(data.error);
        }
        if (data.hasOwnProperty("status")) {
          if (data.status == "deleted") {
            setbuttonStatus("REQUEST ENTRY");
          }
          if (data.status == "created") {
            setbuttonStatus("CANCEL REQUEST");
          }
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetch("https://f.co.uk/member/night-status.php", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: getUser().idx,
        night: nightID,
      }),
    })
      .then(handleErrors)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.hasOwnProperty("error")) {
          showFailedMessage(data.error);
          if (data.error == "No request record found") {
            setbuttonStatus("REQUEST ENTRY");
            setStatus(null);
          }
        } else {
          setStatus(data);
          setbuttonStatus("CANCEL REQUEST");
        }
      })
      .catch((error) => console.log(error));
  }, [buttonStatus]);

  return (
    <>
      <div>{status?.list_member_status}</div>
      <div>
        <a onClick={() => updateList()}>{buttonStatus}</a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
          width="26px"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 19 19"
        >
          <path
            d="M9 13h10a1 1 0 0 1 0 2H9a1 1 0 0 1 0-2zm0 4h10a1 1 0 0 1 0 2H9a1 1 0 0 1 0-2zm6-8h4a1 1 0 0 1 0 2h-4a1 1 0 0 1 0-2zm-7.257 1.914L4 7.172l1.414-1.415l2.329 2.329L12.828 3l1.415 1.414l-6.5 6.5z"
            fill="rgba(255, 168, 0, 1)"
            fill-rule="evenodd"
          />
        </svg>     
      </div>
    </>
  );
};

export default NightStatus;
