// Step 1: Import React. This lets you use JSX inside your .js file.
import * as React from "react";
import { graphql } from "gatsby";
import { isLoggedIn } from "../services/auth";
import Layout from "../components/layout";
import HeaderHamburger from "../components/header-hamburger";
import LocationDetails from "../components/location-details";
import NightStatus from "../components/night-status";
import Joinproject-x from "../components/join-be-local";
import {
  hamburgerGridLayer,
  clubNightDetailHeaderMonday,
  clubNightDetailHeaderTuesday,
  clubNightDetailHeaderWednesday,
  clubNightDetailHeaderThursday,
  clubNightDetailHeaderFriday,
  clubNightDetailHeaderSaturday,
  clubNightDetailHeaderSunday,
  clubNightDetailName,
  clubNightDetailClub,
  clubNightDetailBox,
  clubNightDetailDay,
  clubNightDetailHours,
  clubNightDetailRequest,
} from "../components/layout.module.css";
const ClubNight = ({ data }) => {
  console.log(data)
  const night = data.night;
  const club = data.club;
  return (
    <Layout pageTitle="Club Night Details">
      <div style={{ display: "grid" }}>
        <div
          style={{
            gridArea: "1/1",
            position: "relative",
            placeItems: "center",
            display: "grid",
          }}
          className={
            {
              Monday: clubNightDetailHeaderMonday,
              Tuesday: clubNightDetailHeaderTuesday,
              Wednesday: clubNightDetailHeaderWednesday,
              Thursday: clubNightDetailHeaderThursday,
              Friday: clubNightDetailHeaderFriday,
              Saturday: clubNightDetailHeaderSaturday,
              Sunday: clubNightDetailHeaderSunday,
            }[night.club_night_day]
          }
        >
          <div className={clubNightDetailName}>{night.club_night_name}</div>
          <div className={clubNightDetailClub}>{club.venue_name}</div>
        </div>
        <div className={hamburgerGridLayer} style={{ background: "black" }}>
          <HeaderHamburger menuType="full" parentLink={club.fields.slug} />
        </div>
      </div>

 
        <div className={clubNightDetailBox}>
          <div className={clubNightDetailDay}>{night.club_night_day}</div>
          <div className={clubNightDetailHours}>{night.club_night_hours}</div>
        
                      {night.club_night_description_long
              .replace("&#60;p&#62;", "")
              .replace("&#60;/p&#62;", "")
              .split("&#60;br /&#62;")
              .map((i, key) => {
                return <p key={key}>{i}</p>;
              })}
          

          <div className={clubNightDetailRequest}>
            {isLoggedIn() ? (
              <NightStatus nightID={night.id_club_night} />
            ) : (
              <Joinproject-x />
            )}
          </div>
        </div>

      <LocationDetails venue={club} />
    </Layout>
  );
};

export const query = graphql`
  query ($nightID: Int!, $venueID: Int!) {
    night: mysqlClubNights(
      club_night_active: { eq: 1 }
      id_club_night: { eq: $nightID }
    ) {
      id_club_night
      club_night_name
      club_night_description_long
      club_night_hours
      club_night_day
    }
    club: mysqlClubs(venue_active: { eq: 1 }, id_venue: { eq: $venueID }) {
      venue_name
      venue_hours
      venue_address
      venue_website
      venue_telephone
      venue_email
      venue_map
      fields {
      slug
      }
    }
  }
`;

/* Step 3: Export your component so it
can be used by other parts of your app. */
export default ClubNight;
