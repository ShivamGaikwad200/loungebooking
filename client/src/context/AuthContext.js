import { createContext, useEffect, useReducer } from "react";

const getUserFromLocalStorage = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null; // ✅ Ensures parsing only when user exists
  } 
  catch (error) {
    console.error("Error parsing user data from localStorage:", error);
    return null; // ✅ If error, return null instead of crashing
  }
};
  
const INITIAL_STATE = {
  user: getUserFromLocalStorage(),
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  // console.log("AuthReducer action:", action); // Debugging
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      // console.log("User data received:", action.payload);
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    if (state.user) {
      const timer = setTimeout(() => {
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
      }, 24 * 60 * 60 * 1000); 
      return () => clearTimeout(timer); 
    }
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


