/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    case "error":
      return { ...state, error: action.payload };
    case "clearError":
      return { ...state, error: null };
    default:
      throw new Error("Invalid action type");
  }
};

const FAKE_USER = {
  name: "Jack",
  username: "jack5",
  password: "qwerty",
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { user, isAuthenticated, error } = state;

  const login = (username, password) => {
    if (username === FAKE_USER.username && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    } else {
      dispatch({ type: "error", payload: "Invalid username or password" }); // Dispatch error
    }
  };

  const logout = () => {
    dispatch({ type: "logout" });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, error, login, logout, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
