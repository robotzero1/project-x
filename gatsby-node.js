const path = require(`path`);
const slugify = require("slugify");

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MysqlClubs`) {
    console.log(node.venue_name);
    createNodeField({
      node,
      name: `slug`,
      value: slugify(node.venue_name, { lower: true }),
    });
  }
  if (node.internal.type === `MysqlClubNights`) {
    console.log(node.club_night_name);
    createNodeField({
      node,
      name: `slug`,
      value: slugify(node.club_night_name, { lower: true }),
    });
  }
  if (node.internal.type === `MysqlOfferCats`) {
    console.log(node.category_name);
    createNodeField({
      node,
      name: `slug`,
      value: slugify(node.category_name, { lower: true }),
    });
  }
  if (node.internal.type === `MysqlOffersCategoryVenue`) {
    console.log(node.offer_title);
    createNodeField({
      node,
      name: `slug`,
      value: slugify(node.offer_title, { lower: true }),
    });
  }  
};

exports.createPages = async ({ graphql, actions }) => {
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allMysqlClubs(
        filter: { venue_active: { eq: 1 }, venue_type: { eq: "Club" } }
      ) {
        edges {
          node {
            fields {
              slug
            }
            id_venue
          }
        }
      }
      allMysqlClubNights(filter: { club_night_active: { eq: 1 } }) {
        edges {
          node {
            fields {
              slug
            }
            id_club_night
            club_night_venue_id
          }
        }
      }
      allMysqlOfferCats(filter: { category_active: { eq: 1 } }) {
        edges {
          node {
            fields {
              slug
            }
            id_category
          }
        }
      }
      allMysqlOffers(filter: { offer_active: { eq: 1 } }) {
        edges {
          node {
            id_offer
            offer_venue_id
          }
        }
      } 
      allMysqlOffersCategoryVenue(filter: { offer_active: { eq: 1 } }) {
        edges {
          node {
            fields {
              slug
            }
            id_category
            id_offer
            offer_venue_id
          }
        }
      }       
      
    }
  `);

  // Create Pages containing a list of nights in one club
  result.data.allMysqlClubs.edges.forEach(({ node }) => {
    // console.log(node);
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/template-club-nights.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
        clubID: node.id_venue,
      },
    });
  });

  // Create Page containing details of a club night
  result.data.allMysqlClubNights.edges.forEach(({ node }) => {
    // console.log(node);
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/template-night-detail.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
        nightID: node.id_club_night,
        venueID: node.club_night_venue_id,
      },
    });
  });

  // Create the pages containing a list of offers in one category
  result.data.allMysqlOfferCats.edges.forEach(({ node }) => {
    // console.log(node);
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/template-offers.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
        categoryID: node.id_category,
      },
    });
  });

  // Create the pages containing details of an offer
  result.data.allMysqlOffersCategoryVenue.edges.forEach(({ node }) => {
    console.log(node);
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/template-offer-detail.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
        offerID: node.id_offer,
        venueID: node.offer_venue_id,
      },
    });
  });
};

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/app/)) {
    page.matchPath = "/app/*"

    // Update the page.
    createPage(page)
  }
}
