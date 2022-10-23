import * as React from "react";
import { Link, graphql } from "gatsby";
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";
import { getUser, isLoggedIn } from "../services/auth";
import HeaderHamburger from "../components/header-hamburger";
import Layout from "../components/layout";
import {
  homeH1,
  homeH2,
  homeP,
  hamburgerGridLayer,
  infoPageHeader,
  clubNightsBoxes,
  clubNightsBox,
  clubNightsDetails,
  clubNightsName,
  clubNightsDescription,
  clubNightsHours,
  clubNightsDay,
  homeOfferListBoxes,
  homeOfferDetailOffer,
  homeOfferDetailTopRow,
  homeOfferDetailCircle,
  homeOfferDetailOfferTitle,
  homeOfferDetailVenueName,
  homeOfferDetailOfferDescription,
  homeMemberScreenDemo,
} from "../components/layout.module.css";

const IndexAlt = ({ data }) => {
  console.log(data);
  const club = data.club;
  const nights = data.nights;
  const offers = data.offers;
  return (
    <Layout>
      <div style={{ display: "grid" }}>
        <StaticImage
          src="../images/ibiza.jpg"
          alt="Ibiza Town"
          placeholder="dominantColor"
          transformOptions={{ cropFocus: "center" }}
          aspectRatio="1.2"
          style={{
            gridArea: "1/1",
            filter: "brightness(0.7)",
          }}
        />
        <div className={infoPageHeader}>
          <h1 style={{marginTop: "-31px"}}>BE LOCAL</h1>
        </div>
        <div className={hamburgerGridLayer}>
          <HeaderHamburger />
        </div>
      </div>
      <p className={homeP} style={{marginTop: "-8vh", position: "relative"}}>
        Be Local Ibiza Members get exclusive deals in bars,
        restaurants, rentals and accommodation and access to guestlists for some of
        the best clubs on the island.
      </p>
      <h2 className={homeH2}>Club Guestlists</h2>
      <p className={homeP}>
        Be Local has partnered with many of the top clubs on the Island to offer
        our members free entry to most club nights. Members request a guestlist
        entry within the App and we work directly with the club.
      </p>
      <div className={clubNightsBoxes}>
        {nights.edges.map(({ node }, index) => (
          <Link to={"/" + node.fields.slug}>
            <div key={index}>
              <div className={clubNightsBox}>
                <div>
                  <GatsbyImage
                    image={club.mysqlImage.childImageSharp.gatsbyImageData}
                    alt={node.club_night_name}
                  />
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
      <h2 className={homeH2}>Current Member Deals</h2>
      <p className={homeP}>
        Be Local members currently have access to 43 different Ibiza deals such
        as the two below
      </p>
      <div className={homeOfferListBoxes}>
        {offers.edges.map(({ node }, index) => (
          <div key={index}>
            <Link to={"/" + node.fields.slug}>
              <div className={homeOfferDetailOffer}>
                <div className={homeOfferDetailTopRow}>
                  <div className={homeOfferDetailCircle}>
                    <GatsbyImage
                      image={node.circle.childImageSharp.gatsbyImageData}
                      alt={node.offer_title}
                    />
                  </div>
                  <div className={homeOfferDetailOfferTitle}>
                    {node.offer_title}
                    <div className={homeOfferDetailVenueName}>
                      {node.venue_name}
                    </div>
                  </div>
                </div>

                <div className={homeOfferDetailOfferDescription}>
                  {node.offer_desc_short}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <h2 className={homeH2}>Accessing Offers</h2>
      <p className={homeP}>
        Be Local works like an App on your phone. Members simply need to show
        their profile page to any participating venue before ordering or booking
        to receive the offer.
      </p>
      <div className={homeMemberScreenDemo}>
        <StaticImage
          src="../images/temp-member-screen.jpg"
          alt="Member Screen Example"
          placeholder="dominant color"
        />
      </div>
      <hr />
      <h5>Hello {isLoggedIn() ? getUser().name : "world"}!</h5>
      <p>
        {isLoggedIn() ? (
          <>
            You are logged in, so check your{" "}
            <Link to="/app/profile">profile</Link>
          </>
        ) : (
          <>
            You should <Link to="/app/login">log in</Link> to see restricted
            content
          </>
        )}
      </p>
    </Layout>
  );
};

export const query = graphql`
  query {
    club: mysqlClubs(venue_active: { eq: 1 }, id_venue: { eq: 4 }) {
      venue_name
      mysqlImage {
        childImageSharp {
          gatsbyImageData(
            width: 80
            height: 80
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }

    nights: allMysqlClubNights(
      filter: {
        club_night_active: { eq: 1 }
        club_night_venue_id: { eq: 4 }
        club_night_day: { eq: "Monday" }
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

    offers: allMysqlOffersCategoryVenue(
      filter: { offer_active: { eq: 1 }, id_offer: { in: [3, 7] } }
    ) {
      edges {
        node {
          offer_title
          offer_desc_short
          venue_name
          circle: mysqlImage {
            childImageSharp {
              gatsbyImageData(
                placeholder: DOMINANT_COLOR
                formats: [AUTO, WEBP, AVIF]
                quality: 80
                width: 50
                height: 50
                transformOptions: { cropFocus: CENTER }
              )
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default IndexAlt;
