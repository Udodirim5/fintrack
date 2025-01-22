import { useState, useEffect } from "react";
import styles from "./ContactPage.module.css";
import Footer from "../components/Footer";
import AlertMsg from "../components/AlertMsg";

const ContactPage = () => {
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [alert, setAlert] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !contactName ||
      !contactEmail ||
      !contactMessage ||
      !contactEmail.includes("@") ||
      !contactEmail.includes(".") ||
      contactMessage.length < 2
    ) {
      setAlert("Please fill in all fields!");
      return;
    }
    setAlert("Message sent successfully!");
    setContactName("");
    setContactEmail("");
    setContactMessage("");
  };

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <main>
      {alert && <AlertMsg error={alert} />}
      <div className={styles.contactPage}>
        <div className={styles.container}>
          <h1>Contact Us</h1>
          <p>
            We’d love to hear from you! Fill out the form below, and our team
            will get back to you as soon as possible.
          </p>
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                value={contactName}
                placeholder="Enter your full name"
                onChange={(e) => setContactName(e.target.value)}
                autoFocus
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={contactEmail}
                placeholder="Enter your email address"
                required
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="message">Message</label>
              <textarea
                value={contactMessage}
                rows="5"
                placeholder="Write your message here"
                required
                onChange={(e) => setContactMessage(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className={styles.submitBtn}>
              Send Message
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default ContactPage;
