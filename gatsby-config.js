module.exports = {
  siteMetadata: {
    title: "projectX",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`, // Needed for dynamic images
    `gatsby-plugin-gatsby-cloud`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: "/images/svg/"
        },
      },
    },
    {
      resolve: `gatsby-source-mysql`,
      options: {
        connectionDetails: {
          host: "2",
          user: "f",
          password: "5",
          database: "f",
        },
        queries: [
          {
            statement: 'SELECT * FROM venues WHERE venue_type = "club"',
            idFieldName: "id_venue",
            name: "clubs",
            remoteImageFieldNames: ["venue_photo_ref"],
          },
          {
            statement: "SELECT * FROM club_nights",
            idFieldName: "id_club_night",
            name: "club_nights",
          },
          {
            statement: 'SELECT * FROM venues WHERE venue_type != "club"',
            idFieldName: "id_venue",
            name: "venues",
            remoteImageFieldNames: ["venue_photo_ref"],
          },          
          {
            statement: "SELECT * FROM offer_categories",
            idFieldName: "id_category",
            name: "offer_cats",
            remoteImageFieldNames: ["category_photo_ref"],
          },
          {
            statement: "SELECT * FROM offers",
            idFieldName: "id_offer",
            name: "offers",
            remoteImageFieldNames: ["offer_photo_ref"],
          },     
          {
            statement: "SELECT * FROM offers LEFT OUTER JOIN offer_categories ON offers.category_id = offer_categories.id_category LEFT OUTER JOIN venues ON offers.offer_venue_id = venues.id_venue",
            idFieldName: "id_offer",
            name: "offers_category_venue",
            remoteImageFieldNames: ["offer_photo_ref"],
          },
          {
            statement: "SELECT * FROM retailers",
            idFieldName: "id_retailer",
            name: "retailers",
          },                    
        ],
      },
    },
  ],
};
