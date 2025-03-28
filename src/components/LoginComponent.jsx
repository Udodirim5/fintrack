import { useEffect, useState } from "react";
import styles from "./LoginComponent.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AlertMsg from "./AlertMsg";

const LoginComponent = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, error, isAuthenticated, dispatch } = useAuth();
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

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch({ type: "clearError" });
      }, 5000);
      return () => clearTimeout(timer); 
    }
  }, [error, dispatch]);

  return (
    <>
    {error && <AlertMsg error={error} />}
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
              { password !== "" ? showPassword ? "Hide" : "Show" : ""  }
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
          <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
    </>
  );
};

export default LoginComponent;
