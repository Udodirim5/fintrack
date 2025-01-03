import { Link } from "react-router-dom";
import styles from "./HomeComponent.module.css";
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
          <Link to="#" className={styles.primaryBtn}>
            Get Started
          </Link>
          <Link to="/login" className={styles.secondaryBtn}>
            Log In
          </Link>
        </div>
        </div>
        <div className={styles.heroImg}>
          <img src="/hero-graph.svg" alt="Finance Icons" />
        </div>
      </section>

      <section className={styles.section + " " + styles.features}>
        <h2>Why Choose FinTrack?</h2>
        <div className={styles.featuresGrid}>
          <div>
            <img src="/cash-flow.svg" alt="Wallet Icon" />
            <h3>Expense Tracking</h3>
            <p>Monitor your spending and identify savings opportunities.</p>
          </div>
          <div>
            <img src="/bar-chart.svg" alt="Chart Icon" />
            <h3>Income Insights</h3>
            <p>Gain valuable insights into your income sources.</p>
          </div>
          <div>
            <img src="/security.svg" alt="Lock Icon" />
            <h3>Security</h3>
            <p>Your data is securely encrypted and protected.</p>
          </div>
        </div>
      </section>

      <section className={styles.section + " " + styles.cta}>
        <h2>Ready to take control of your finances?</h2>
        <Link to="#">Sign Up Now</Link>
      </section>

      <footer>
        <p>&copy; 2025 FinTrack. All Rights Reserved.</p>
      </footer>
    </>
  );
};

export default HomeComponent;
