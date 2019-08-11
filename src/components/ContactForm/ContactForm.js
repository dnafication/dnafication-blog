import React from "react";
import styles from "./ContactForm.module.scss";
import { Link } from "gatsby";

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

const ContactForm = () => {
  return (
    <div className={styles["contact"]}>
      <p>Use the form below to contact me.</p>

      <form
        name="contact"
        method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        {/* You still need to add the hidden input with the form name to your JSX form */}
        <input type="hidden" name="form-name" value="contact" />

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
        <label for="message">
          Message:
          <div>
            <textarea name="message" id="message" rows="4" required />
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
