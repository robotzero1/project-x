import React from "react";
import { Link } from "gatsby";
import { useEffect, useState } from "react";
import { getUser } from "../services/auth";
import {
  clubNightsIconMonday,
  clubNightsIconTuesday,
  clubNightsIconWednesday,
  clubNightsIconThursday,
  clubNightsIconFriday,
  clubNightsIconSaturday,
  clubNightsIconSunday,
  profileListStatusBox,
  profileListStatusNight,
  profileListStatusDate,
  profileListStatusTime,
  profileListStatusStatus,
  profileListStatusLink,
  profileListStatusPending,
  profileListStatusRejected,
  profileListStatusAccepted,
} from "../components/layout.module.css";

const DATE_OPTIONS = { weekday: 'long', month: 'long', day: 'numeric' };


const ListStatus = () => {
  const [listsStatus, setlistsStatus] = useState(null);
  const slugify = require('slugify')

  const handleErrors = (response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  };

  const showFailedMessage = (message) => {
    listsStatus = "fred";
  };


  const myRequest = new Request(
    "https://f.co.uk/member/list-status.php",
    {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: getUser().idx,
      }),
    }
  );

  useEffect(() => {
    fetch(myRequest)
      .then(handleErrors)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.hasOwnProperty("error")) {
          showFailedMessage(data.error);
        } else {
          setlistsStatus(data);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>

      {listsStatus?.map((node, index) => (
        <div key={index}>
          <div className={profileListStatusBox}>
            <div
              className={
                {
                  Monday: clubNightsIconMonday,
                  Tuesday: clubNightsIconTuesday,
                  Wednesday: clubNightsIconWednesday,
                  Thursday: clubNightsIconThursday,
                  Friday: clubNightsIconFriday,
                  Saturday: clubNightsIconSaturday,
                  Sunday: clubNightsIconSunday,
                }[node.club_night_day]
              }
            >
              {node.club_night_name.charAt(0)}
            </div>

            <div>
              <div className={profileListStatusNight}>
                {node.club_night_name}
              </div>
              <div className={profileListStatusDate}>
                {(new Date(node.list_club_night_date)).toLocaleDateString('en-GB', DATE_OPTIONS)}
              </div>
              <div className={profileListStatusTime}>
                {node.club_night_hours}
              </div>
            </div>
            <div className={profileListStatusStatus}>
              Status:&nbsp;
              <span
                className={
                  {
                    Pending: profileListStatusPending,
                    Rejected: profileListStatusRejected,
                    Accepted: profileListStatusAccepted,
                  }[node.list_member_status]
                }
              >
                {node.list_member_status}
              </span>
            </div>
            <Link to={"/" + slugify(node.club_night_name, {lower: true})}>
            <div className={profileListStatusLink}>
              View Details
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
                width="15px"
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
        </div>
      ))}


    </>
  );
};

export default ListStatus;
