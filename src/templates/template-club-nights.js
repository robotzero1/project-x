// Step 1: Import React. This lets you use JSX inside your .js file.
import * as React from "react";
import { Link, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/layout";
import HeaderHamburger from "../components/header-hamburger";
import LocationDetails from "../components/location-details";
import {
  hamburgerGridLayer,
  clubNightsHeader,
  clubNightsVenueName,
  clubNightsHeaderDescription,
  clubNightsBoxes,
  clubNightsBox,
  clubNightsIconMonday,
  clubNightsIconTuesday,
  clubNightsIconWednesday,
  clubNightsIconThursday,
  clubNightsIconFriday,
  clubNightsIconSaturday,
  clubNightsIconSunday,
  clubNightsDetails,
  clubNightsName,
  clubNightsDescription,
  clubNightsHours,
  clubNightsDay,
} from "../components/layout.module.css";

/* Step 2: Define your component/page. Note that your
component name should start with a capital letter. */
const ClubNights = ({ data }) => {
  const club = data.club;
  const nights = data.nights;
  const clubImage = getImage(club.mysqlImage);
  return (
    <Layout>
      <div style={{ display: "grid" }}>
        <GatsbyImage
          image={clubImage}
          alt={club.venue_name}
          style={{
            gridArea: "1/1",
            filter: "brightness(70%)",
          }}
        />
        <div className={clubNightsHeader}>
          <h1 className={clubNightsVenueName}>{club.venue_name}</h1>
          <div className={clubNightsHeaderDescription}>
            {club.venue_description}
          </div>
        </div>
        <div className={hamburgerGridLayer}>
          <HeaderHamburger menuType="full" />
        </div>
      </div>

      <div className={clubNightsBoxes}>
        {nights.edges.map(({ node }, index) => (
          <Link to={"/" + node.fields.slug}>
            <div key={index}>
              <div className={clubNightsBox}>
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

                <div className={clubNightsDetails}>
                  <div className={clubNightsName}>{node.club_night_name}</div>
                  <div className={clubNightsDescription}>
                    {node.club_night_description_short}
                  </div>
                  <div className={clubNightsHours}>{node.club_night_hours}</div>
                  <div className={clubNightsDay}>{node.club_night_day}</div>
                  <svg
                  style={{ position: "absolute", right: 0, bottom: 2 }}
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  focusable="false"
                  width="30px"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.163 4.516c.418.408 4.502 4.695 4.502 4.695a1.095 1.095 0 0 1 0 1.576s-4.084 4.289-4.502 4.695c-.418.408-1.17.436-1.615 0c-.446-.434-.481-1.041 0-1.574L11.295 10L7.548 6.092c-.481-.533-.446-1.141 0-1.576c.445-.436 1.197-.409 1.615 0z"
                    fill="rgba(255, 168, 0, 1)"
                  />
                </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <LocationDetails venue={club} />
    </Layout>
  );
};

export const query = graphql`
  query ($clubID: Int!) {
    club: mysqlClubs(venue_active: { eq: 1 }, id_venue: { eq: $clubID }) {
      venue_name
      venue_description
      venue_hours
      venue_address
      venue_website
      venue_telephone
      venue_email
      venue_map
      mysqlImage {
        childImageSharp {
          gatsbyImageData(
            width: 600
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }

    nights: allMysqlClubNights(
      filter: {
        club_night_active: { eq: 1 }
        club_night_venue_id: { eq: $clubID }
      }
    ) {
      edges {
        node {
          club_night_name
          club_night_description_short
          club_night_hours
          club_night_day
          fields {
            slug
          }
        }
      }
    }
  }
`;

/* Step 3: Export your component so it
can be used by other parts of your app. */
export default ClubNights;
