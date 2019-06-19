'use strict';

module.exports = {
  url: 'https://lumen.netlify.com',
  title: 'Blog by dnafication',
  subtitle:
    'I write about latest web technologies & tools for development/testing',
  copyright: '© 2019 dnafication. All rights reserved.',
  disqusShortname: 'dnafication',
  postsPerPage: 5,
  googleAnalyticsId: 'UA-29342982-2',
  menu: [
    {
      label: 'articles',
      path: '/'
    },
    {
      label: 'about',
      path: '/pages/about'
    },
    {
      label: 'contact',
      path: '/pages/contacts'
    }
  ],
  author: {
    name: 'dnafication',
    photo: '/photo.jpg',
    bio:
      // eslint-disable-next-line quotes
      `I am a performance test engineer at my day job but I'm mostly found playing with Reactjs, GraphQL & Nodejs. Really passionate about fast paced web movement and happy to join wherever its going 🏃‍♂️`,
    contacts: {
      twitter: 'dnafication',
      github: 'dnafication',
      // rss: '#',
      linkedin: 'dnafication'
    }
  }
};
