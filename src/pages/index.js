import * as React from "react";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { Link, graphql } from "gatsby";
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";
import HeaderHamburger from "../components/header-hamburger";
import Layout from "../components/layout";
import {
  hamburgerGridLayer,
  homeP,
  homePageHeader,
  homeCategoryBlocks,
  homeCategoryBlock,
  homeCategoryName,
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
} from "../components/layout.module.css";

const IndexPage = ({ data }) => {
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
          aspectRatio="0.7"
          style={{
            gridArea: "1/1",
            filter: "brightness(0.7)",
          }}
        />
        <div className={homePageHeader}>
          <div>
          <h1>BE LOCAL CLUB</h1>
          <h2>IBIZA</h2>
          </div>
        </div>
        <div className={hamburgerGridLayer}>
          <HeaderHamburger />
        </div>
      </div>
      <div style={{ marginTop: "-64vw" }}>
        <div className={homeCategoryBlocks}>
          <div style={{ display: "grid" }}>
            <Link to={"/restaurants"}>
              <div style={{ display: "grid" }}>
                <div className={homeCategoryBlock}>
                  <h1 className={homeCategoryName}>Restaurants</h1>
                </div>
              </div>
            </Link>
          </div>

          <div>
            <Link to={"/bars"}>
              <div style={{ display: "grid" }}>
                <div className={homeCategoryBlock}>
                  <h1 className={homeCategoryName}>Bars</h1>
                </div>
              </div>
            </Link>
          </div>

          <div>
            <Link to={"/relax"}>
              <div style={{ display: "grid" }}>
                <div className={homeCategoryBlock}>
                  <h1 className={homeCategoryName}>Body & Mind</h1>
                </div>
              </div>
            </Link>
          </div>

          <div>
            <Link to={"/shops"}>
              <div style={{ display: "grid" }}>
                <div className={homeCategoryBlock}>
                  <h1 className={homeCategoryName}>Shops</h1>
                </div>
              </div>
            </Link>
          </div>

          <div>
            <Link to={"/rental"}>
              <div style={{ display: "grid" }}>
                <div className={homeCategoryBlock}>
                  <h1 className={homeCategoryName}>Rental</h1>
                </div>
              </div>
            </Link>
          </div>

          <div>
            <Link to={"/clubs"}>
              <div style={{ display: "grid" }}>
                <div className={homeCategoryBlock}>
                  <h1 className={homeCategoryName}>Clubs</h1>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className={homeCategoryBlocks}>
          <div>
            <Link to={"/about"}>
              <div style={{ display: "grid" }}>
                <div className={homeCategoryBlock}>
                  <h1 className={homeCategoryName}>About Be Local</h1>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className={homeCategoryBlocks}>
          <div>
            <Link to={"/app/profile-status"}>
              <div style={{ display: "grid" }}>
                <div className={homeCategoryBlock}>
                  <h1 className={homeCategoryName}>My Profile</h1>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <p className={homeP}>Become a member to get access to exclusive deals and club guestlists</p>
      <Link to="/how-it-works"><button style={{width: "calc(100% - 20px)", margin: "10px"}}>HOW IT WORKS</button></Link>
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={30}
        totalSlides={4}
        isPlaying={true}
      >
        <Slider>
          {nights.edges.map(({ node }, index) => (
            <Link to={"/" + node.fields.slug}>
              <Slide index={{ index }}>
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
                    <div className={clubNightsHours}>
                      {node.club_night_hours}
                    </div>
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
              </Slide>
            </Link>
          ))}
        </Slider>
      </CarouselProvider>

      {/* <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={40}
        totalSlides={2}
        isPlaying={true}
      >
        <Slider>
          {offers.edges.map(({ node }, index) => (
            <Link to={"/" + node.fields.slug}>
              <Slide index={{ index }}>
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
              </Slide>
            </Link>
          ))}
        </Slider>
      </CarouselProvider> */}
    </Layout>
  );
};

export const query = graphql`
  query {
    club: mysqlClubs(venue_active: { eq: 1 }) {
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

    nights: allMysqlClubNights(filter: { club_night_active: { eq: 1 } }) {
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

export default IndexPage;
