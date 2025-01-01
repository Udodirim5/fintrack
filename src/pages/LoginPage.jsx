import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
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
    <main>
      <div className="login">
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span onClick={togglePassword} className="show-password">
            {showPassword ? "Hide" : "Show"}
          </span>
          <button type="submit">Login</button>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
