import styles from "./AboutPage.module.css";
import Footer from "../components/Footer";

const AboutPage = () => {
  return (
    <main>
      <div className={styles.about}>
        <h2>About FinTrack</h2>
        <section>
          <img
            src="about.jpg"
            alt="A person with a dog overlooking a mountain during sunset"
          />
          <div>
            <p>
              Welcome to FinTrack, your ultimate companion for managing and
              understanding your finances. Designed with simplicity and
              efficiency in mind, FinTrack empowers you to take control of your
              income, expenses, and financial goals all in one place.
            </p>
            <p>
              Whether you’re looking to track daily spending, plan for the
              future, or analyze your financial habits, FinTrack offers
              intuitive tools that make financial management accessible to
              everyone. From smart categorization and insightful filters to
              detailed analytics and secure data storage, FinTrack has it all.
            </p>
            <p>
              Join the thousands of users who trust FinTrack to simplify their
              finances and help them stay on top of their money, effortlessly.
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default AboutPage;
