import React from "react";
import styles from "./ContactForm.module.scss";
import { Link } from "gatsby";

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "", message: "", status: 0 };
  }

  handleSubmit = e => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "dnafication-contact", ...this.state })
    })
      .then(() => this.setState({ ...this.state, status: 1 }))
      .catch(error => this.setState({ ...this.state, status: 2 }));

    e.preventDefault();
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  reset = e => this.setState({ name: "", email: "", message: "", status: 0 });

  render() {
    const { name, email, message } = this.state;
    return (
      <div className={styles["contact"]}>
        <p>Use the form below to contact me.</p>

        <form
          onSubmit={this.handleSubmit}
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          <input type="hidden" name="bot-field" />
          <label for="name">
            Name:
            <div>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={name}
                onChange={this.handleChange}
              />
            </div>
          </label>
          <label for="email">
            Email:
            <div>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={email}
                onChange={this.handleChange}
              />
            </div>
          </label>
          <label for="message">
            Message:
            <div>
              <textarea
                name="message"
                id="message"
                rows="4"
                value={message}
                onChange={this.handleChange}
                required
              />
            </div>
          </label>

          <button type="submit" className={styles["contact__btn-primary"]}>
            Send
          </button>
          <input
            type="reset"
            value="Clear"
            onClick={this.reset}
            className={styles["contact__btn-secondary"]}
          />
        </form>
        {this.state.status === 1 && (
          <div>
            Form successfully submitted. <Link to="/">Click here</Link> to go
            back to home page
          </div>
        )}
        {this.state.status === 2 && (
          <div>
            Something unexpected occurred. Please try again later or DM me on
            twitter.
          </div>
        )}
      </div>
    );
  }
}

export default ContactForm;
