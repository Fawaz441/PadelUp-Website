import authAPIs from "@/api/auth";
import { addTokenToInstance2, instance2, removeTokenFromInstance2 } from "@/api/instance";
import { showError } from "@/widgets/misc/alert";
import Loader from "@/widgets/misc/loader";
import { createContext, useContext, useEffect, useState } from "react";
// import { removeToken, setToken } from "../api";
// import auth from "../api/auth";
// import payments from "../api/payments";
// import { getServerError } from "./misc";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null)
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const item = localStorage.getItem("U-AA");
    const tkn = localStorage.getItem("T-AA");
    if (item && tkn) {
      const parsedItem = JSON.parse(item);
      setUser(parsedItem);
      setToken(tkn)
      addTokenToInstance2(tkn);
      setChecking(false);
    } else {
      setChecking(false);
    }
  }, []);

  const login = (tkn, details) => {
    setUser(details);
    localStorage.setItem("T-AA", tkn)
    localStorage.setItem("U-AA", JSON.stringify(details));
    addTokenToInstance2(tkn)
    setToken(tkn)
  };

  const logout = async () => {
    localStorage.removeItem("T-AA");
    localStorage.removeItem("U-AA");
    try {
      await authAPIs.logout(token)
      removeTokenFromInstance2()
    }
    catch (e) {
      removeTokenFromInstance2()
    }
    setUser(null);
    setToken(null)
    removeToken()
  };

  const refreshData = async () => {
    try {
      const { data } = await authAPIs.getUserProfile()
      setUser(data)
    }
    catch (e) {
      logout()
    }
  }

  if (checking) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader loading />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        refreshData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
