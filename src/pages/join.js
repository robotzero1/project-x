import * as React from "react";
import { Link, graphql } from "gatsby";
import { isIOS, isMobile } from "react-device-detect";
import { StaticImage } from "gatsby-plugin-image";
import HeaderHamburger from "../components/header-hamburger";
import Layout from "../components/layout";
import {
  hamburgerGridLayer,
  howItWorksRetailerBox,
  howItWorksRetailerName,
  infoPageHeader,
  infoPageContent,
} from "../components/layout.module.css";

const openMap = (latitude, longitude) => {
  const mapUrl = "?q=" + latitude + "," + longitude;
  let mapUrlFullPath = "";
  // Check if a mobile device exists, or is web browser
  if (isMobile) {
    mapUrlFullPath = isIOS ? "maps://" + mapUrl : "geo:" + mapUrl;
  } else {
    mapUrlFullPath = "https://www.google.com/maps/dir//lat,long/@" + mapUrl;
  }
  window.open(mapUrlFullPath, "_system");
};

const IndexPage = ({ data }) => {
  //   console.log(data);
  const retailers = data.retailers;

  return (
    <Layout pageTitle="Join">
      <div style={{ display: "grid" }}>
        <StaticImage
          src="../images/join-from-mobile.jpg"
          alt="Man with mobile phone"
          placeholder="dominantColor"
          transformOptions={{ cropFocus: "center" }}
          aspectRatio="1.5"
          style={{
            gridArea: "1/1",
          }}
        />
        <div className={infoPageHeader}></div>
        <div className={hamburgerGridLayer}>
          <HeaderHamburger />
        </div>
      </div>
      <div className={infoPageContent}>
        <h2>JOIN</h2>
        <p>
          Membership costs 40€ for 365 days and can be bought online or from one
          of our authorised resellers.
        </p>

        <h2>Buy Online</h2>
        <p>
          Get instant access to all member offers and club guestlists when
          signing up with your credit or debit card. Payments are handled by
          Stripe.
        </p>
        <Link to="/join-from-stripe"><button>JOIN ONLINE</button></Link>
        <h2>Buy In-Person </h2>
        <p>You can buy membership from the following locations. </p>
        <div>
          <StaticImage
            src="../images/temp-card-image.jpg"
            alt="Membership card"
            placeholder="dominantColor"
          />
        </div>

        {retailers.edges.map(({ node }, index) => (
          <div key={index}>
            <div className={howItWorksRetailerBox}>
              <div className={howItWorksRetailerName}>
                {node.retailer_name} <span> - 123 Address St</span>
              </div>

              <div>
                {node.retailer_map && (
                  <div
                    title="Open on Map"
                    onClick={() =>
                      openMap(
                        node.retailer_map.split(", ")[0],
                        node.retailer_map.split(", ")[1]
                      )
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      focusable="false"
                      width="25px"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M9 6.882l-7-3.5v13.236l7 3.5l6-3l7 3.5V7.382l-7-3.5l-6 3zM15 15l-6 3V9l6-3v9z"
                        fill="rgba(255, 168, 0, 1)"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

<Link to="/join-from-card"><button>JOIN WITH CARD</button></Link>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    retailers: allMysqlRetailers(
      filter: { retailer_name: { ne: "Web" }, retailer_active: { eq: 1 } }
    ) {
      edges {
        node {
          retailer_name
          retailer_map
        }
      }
    }
  }
`;

export default IndexPage;
