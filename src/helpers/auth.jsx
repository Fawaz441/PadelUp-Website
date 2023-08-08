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
  const [fetchingWaterPrice, setFetchingWaterPrice] = useState(false);
  const [waterPrice, setWaterPrice] = useState(0);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const item = localStorage.getItem("HH-AA");
    if (item) {
      const parsedItem = JSON.parse(item);
      setUser(parsedItem);
      // setToken(parsedItem?.token);
      setChecking(false);
    } else {
      setChecking(false);
    }
  }, []);

  const login = async (details) => {
    setUser(details);
    localStorage.setItem("HH-AA", JSON.stringify(details));
    // setLoading(true)
    // try {
    //   const res = await auth.login(details)
    //   setUser(res?.data?.data)
    //   localStorage.setItem("HH-AA", JSON.stringify(res?.data?.data))
    //   setToken(res?.data?.data?.token)
    //   setLoading(false)
    // }
    // catch (e) {
    //   setLoading(false)
    //   toast.error(
    //     getServerError(e)
    //   )
    // };
  };

  const logout = async () => {
    localStorage.removeItem("HH-AA");
    setUser(null);
    // removeToken()
  };

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
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
