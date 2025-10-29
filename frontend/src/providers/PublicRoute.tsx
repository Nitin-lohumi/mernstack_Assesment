import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useAuthCheck } from "./useAuthCheck";

export default function PublicRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, isAuthenticated } = useAuthCheck();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  if (loading)
    return (
      <ClipLoader
        size={50}
        color="blue"
        cssOverride={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    );

  return children;
}
