import { Link } from "react-router-dom";
import styles from "./HomeComponent.module.css";
import ReviewLists from "./ReviewLists";
const HomeComponent = () => {
  return (
    <>
      <section className={styles.section + " " + styles.hero}>
        <div>
          <h1>Track Your Finances,<br /> Achieve Your Goals</h1>
          <p>
            Simplify your income and expense management with FinTrack. Know
            where your money goes and plan smarter.
          </p>

        <div className={styles.buttons}>
          <Link to="/signup" className={styles.primaryBtn}>
            Get Started
          </Link>
          <Link to="/login" className={styles.secondaryBtn}>
            Log In
          </Link>
        </div>
        </div>
        <div className={styles.heroImg}>
        <img src={`${import.meta.env.BASE_URL}hero-img.png`} alt="Finance Icons" />
        </div>
      </section>

      <section className={styles.section + " " + styles.features}>
        <h2>Why Choose FinTrack?</h2>
        <div className={styles.featuresGrid}>
          <div>
            <img src={`${import.meta.env.BASE_URL}cash-flow.svg`} alt="Wallet Icon" />
            <h3>Expense Tracking</h3>
            <p>Monitor your spending and identify savings opportunities.</p>
          </div>
          <div>
            <img src={`${import.meta.env.BASE_URL}bar-chart.svg`} alt="Chart Icon" />
            <h3>Income Insights</h3>
            <p>Gain valuable insights into your income sources.</p>
          </div>
          <div>
            <img src={`${import.meta.env.BASE_URL}security.svg`} alt="Lock Icon" />
            <h3>Security</h3>
            <p>Your data is securely encrypted and protected.</p>
          </div>
        </div>
      </section>

      <section className={styles.section + " " + styles.testimonials}>
        <h2>What Our Users Say</h2>
        <ReviewLists />
        </section>

      <section className={styles.section + " " + styles.cta}>
        <h2>Ready to take control of your finances?</h2>
        <Link to="signup">Sign Up Now</Link>
      </section>

    </>
  );
};

export default HomeComponent;
