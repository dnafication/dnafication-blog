"use strict";

module.exports = {
  url: "https://dnafication.netlify.com",
  title: "dnafication-blog",
  subtitle:
    "I write about latest web technologies & tools for development/testing",
  copyright: "© 2019 dnafication. All rights reserved.",
  disqusShortname: "dnafication",
  postsPerPage: 5,
  googleAnalyticsId: "UA-29342982-2",
  menu: [
    {
      label: "articles",
      path: "/"
    },
    {
      label: "about",
      path: "/pages/about"
    },
    {
      label: "contact",
      path: "/contact-me"
    }
  ],
  author: {
    name: "dnafication",
    photo: "/photo.jpg",
    bio:
      // eslint-disable-next-line quotes
      `A software engineer who is passionate about the high paced web movement and geared up to join wherever its heading 🚀`,
    contacts: {
      twitter: "dnafication",
      github: "dnafication",
      rss: "/rss.xml",
      linkedin: "dnafication"
    }
  }
};
