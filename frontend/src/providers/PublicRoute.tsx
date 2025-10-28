import { ClipLoader } from "react-spinners";
import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserStore } from "../store/store";
export default function PublicRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { setUser, logoutUser, setRole } = useUserStore();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("https://mernstack-assesment-ctxa.onrender.com/auth/check", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.isLoggedIn) {
          setUser(res.data.user);
          console.log(res.data);
          setRole(res.data.user.role);
          navigate("/");
        }
        setLoading(false);
      })
      .catch(() => {
        logoutUser();
        setLoading(false);
      });
  }, [navigate]);
  if (loading)
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
  return children;
}
