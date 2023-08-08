import { useAuth } from "./auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const RequiresAuth = ({ children, requires = true }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && requires) {
      navigate("/");
    }
    if (user && !requires) {
      navigate("/dashboard");
    }
  }, [user, requires]);

  if (user && requires) {
    return children;
  }

  if (!user && !requires) {
    return children;
  }
};
