// Step 1: Import React. This lets you use JSX inside your .js file.
import * as React from "react";
import { Link, graphql } from "gatsby";
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";
import Layout from "../components/layout";
import HeaderHamburger from "../components/header-hamburger";
import {
  hamburgerGridLayer,
  clubListHeader,
  clubListTitle,
  clubListDescription,
  clubListBoxes,
  clubListVenue,
} from "../components/layout.module.css";

/* Step 2: Define your component/page. Note that your
component name should start with a capital letter. */
const Clubs = ({ data }) => {
  return (
    <Layout>
      <div style={{ display: "grid" }}>
        <StaticImage
          src="../images/clubs-header.jpg"
          alt="Dance again text in club"
          placeholder="dominant color"
          style={{
            gridArea: "1/1",
          }}
        />
        <div className={clubListHeader}>
          <div>
            <div className={clubListTitle}>Ibiza Club Guestlists</div>

            <div className={clubListDescription}>
              Great free or discounted entry to our partner clubs in Ibiza. Be
              Local members get free access to guestlists for nights run by the
              clubs below:
            </div>
          </div>
        </div>
        <div className={hamburgerGridLayer}>
          <HeaderHamburger />
        </div>
      </div>

      <div className={clubListBoxes}>
        {data.allMysqlClubs.edges.map(({ node }, index) => (
          <div key={index}>
            <Link to={"/" + node.fields.slug}>
              <div style={{ display: "grid", padding: "5px" }}>
                <GatsbyImage
                  image={node.mysqlImage.childImageSharp.gatsbyImageData}
                  alt={node.venue_name}
                  style={{
                    gridArea: "1/1",
                    filter: "brightness(70%)",
                  }}
                />

                <div className={clubListVenue}>
                  {node.venue_name}
                  <svg
                    style={{ position: "absolute", right: "0", top: "35%" }}
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    focusable="false"
                    width="40px"
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
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export const query = graphql`
  {
    allMysqlClubs(filter: { venue_active: { eq: 1 } }) {
      edges {
        node {
          venue_name
          venue_description
          mysqlImage {
            childImageSharp {
              gatsbyImageData(
                aspectRatio: 4
                placeholder: DOMINANT_COLOR
                formats: [AUTO, WEBP, AVIF]
                quality: 90
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

/* Step 3: Export your component so it
can be used by other parts of your app. */
export default Clubs;
