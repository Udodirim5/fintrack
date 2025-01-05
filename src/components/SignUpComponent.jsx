import { useState } from "react";
import styles from "./SignUpComponent.module.css";
import { Link } from "react-router-dom";
const SignUpComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.formWrapper}>
        <h1>Sign Up</h1>
        <p>Create a new account</p>
        <form>
          <div className={styles.inputGroup}>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span onClick={togglePassword} className={styles.showPassword}>
              { password !== "" ? showPassword ? "Hide" : "Show" : ""  }
            </span>
          </div>
          <div className={styles.inputGroup}>
            <label>Confirm Password:</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span onClick={toggleConfirmPassword} className={styles.showPassword}>
              { confirmPassword !== "" ? showConfirmPassword ? "Hide" : "Show" : ""  }
            </span>
          </div>
          <div className={styles.formActions}>
            <button type="submit" className={styles.primaryBtn}>
              Sign In
            </button>
          </div>
        </form>
        <p className={styles.toggle}>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpComponent;
