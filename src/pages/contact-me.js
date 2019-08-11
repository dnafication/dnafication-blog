// @flow
import React from "react";
import { Link } from "gatsby";
import Sidebar from "../components/Sidebar";
import Layout from "../components/Layout";
import Page from "../components/Page";
import ContactForm from "../components/ContactForm";
import { useSiteMetadata } from "../hooks";

const ContactMe = () => {
  const { title, subtitle } = useSiteMetadata();

  return (
    <Layout title={`Contact Me - ${title}`} description={subtitle}>
      <Sidebar />
      <Page title="Contact Me">
        <ContactForm />
      </Page>
    </Layout>
  );
};

export default ContactMe;
