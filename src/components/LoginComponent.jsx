import { useEffect, useState } from "react";
import styles from "./LoginComponent.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const LoginComponent = () => {
  const [password, setPassword] = useState("qwerty");
  const [username, setUsername] = useState("jack5");
  const [showPassword, setShowPassword] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) login(username, password);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/incomes", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className={styles.authContainer}>
      <div className={styles.formWrapper}>
        <h1>Welcome Back</h1>
        <p>Sign in to your account</p>
        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              required
            />
            <span onClick={togglePassword} className={styles.showPassword}>
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
          <div className={styles.formActions}>
            <button type="submit" className={styles.primaryBtn}>
              Sign In
            </button>
          </div>
        </form>

        <p className={styles.toggle}>
          Don&apos;t have an account?
          <a href="#">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;
