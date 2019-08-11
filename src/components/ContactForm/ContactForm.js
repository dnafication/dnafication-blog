import React, { useRef, useEffect } from "react";
import styles from "./ContactForm.module.scss";

type Props = {
  title?: string,
  children: React.Node
};

const ContactForm = ({ title, children }: Props) => {
  const pageRef = useRef();

  useEffect(() => {
    pageRef.current.scrollIntoView();
  });

  return (
    <div ref={pageRef} className={styles["contact"]}>
      <p>Use the form below to contact me.</p>

      <form
        name="contact-dnafication"
        method="post"
        netlify-honeypot="bot-field"
        data-netlify="true"
      >
        <input type="hidden" name="bot-field" />
        <label for="name">
          Name:
          <div>
            <input type="text" name="name" id="name" required />
          </div>
        </label>
        <label for="email">
          Email:
          <div>
            <input type="email" name="email" id="email" required />
          </div>
        </label>
        <label for="subject">
          Subject:
          <div>
            <input type="text" name="subject" id="subject" required />
          </div>
        </label>
        <label for="message">
          Message:
          <div>
            <textarea name="message" id="message" rows="4" />
          </div>
        </label>

        <button type="submit" className={styles["contact__btn-primary"]}>
          Send
        </button>
        <input
          type="reset"
          value="Clear"
          className={styles["contact__btn-secondary"]}
        />
      </form>
    </div>
  );
};

export default ContactForm;
