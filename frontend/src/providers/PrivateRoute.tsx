import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useUserStore } from "../store/store";
import { ClipLoader } from "react-spinners";
export default function PrivateRoute({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState("");
  const { setUser, logoutUser, setRole } = useUserStore();
  useEffect(() => {
    axios
      .get("http://localhost:4000/auth/check", {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        console.log(res.data);
        setRole(res.data.user.role);
        return setAuth(res.data.user);
      })
      .catch(() => {
        logoutUser();
        setRole(null);
        return setAuth("false");
      });
  }, []);
  if (auth == "")
    return (
      <ClipLoader
        size={50}
        color="blue"
        cssOverride={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      />
    );
  if (auth == "false") return <Navigate to={"/auth/login"} />;
  return children;
}
