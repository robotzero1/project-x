import React from "react";
import { useEffect, useState } from "react";
import { getUser } from "../services/auth";

const NightRequest = ({ nightID }) => {
  console.log(nightID);

  const [requestList, setRequestList] = useState(null);
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

  useEffect(() => {
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
          setbuttonStatus("REQUEST ENTRY");
        } else {
          setbuttonStatus("CANCEL ENTRY");
        }
      })
      .catch((error) => console.log(error));
  }, [requestList]);

  return (
    <>
      <div>
        <button onClick={() => setRequestList()}>{buttonStatus}</button>
      </div>
      {/* {status?.list_member_status} */}
    </>
  );
};

export default NightRequest;
