// @flow
import React from 'react';
import { Link } from 'gatsby';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Page from '../components/Page';
import { useSiteMetadata } from '../hooks';

const NotFoundTemplate = () => {
  const { title, subtitle } = useSiteMetadata();

  return (
    <Layout title={`Not Found - ${title}`} description={subtitle}>
      <Sidebar />
      <Page title="404 - Not Found">
        <p>
          You just hit a route that doesn&#39;t exist... the sadness.{' '}
          <Link to="/">Click here to head back home.</Link>
        </p>
      </Page>
    </Layout>
  );
};

export default NotFoundTemplate;
