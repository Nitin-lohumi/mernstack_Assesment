import { useEffect, useState } from "react";
import axios from "axios";
import { useUserStore } from "../store/store";

interface AuthState {
  loading: boolean;
  isAuthenticated: boolean;
}

export function useAuthCheck(): AuthState {
  const [auth, setAuth] = useState<AuthState>({
    loading: true,
    isAuthenticated: false,
  });

  const { setUser, logoutUser, setRole } = useUserStore();

  useEffect(() => {
    axios
      .get("https://mernstack-assesment-ctxa.onrender.com/auth/check", {
        withCredentials: true,
        timeout: 2000,
      })
      .then((res) => {
        if (res.data?.isLoggedIn) {
          setUser(res.data.user);
          setRole(res.data.user.role);
          setAuth({ loading: false, isAuthenticated: true });
        } else {
          logoutUser();
          setRole(null);
          setAuth({ loading: false, isAuthenticated: false });
        }
      })
      .catch(() => {
        logoutUser();
        setRole(null);
        setAuth({ loading: false, isAuthenticated: false });
      });
  }, []);

  return auth;
}
