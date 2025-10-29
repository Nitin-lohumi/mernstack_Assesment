import { Navigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useAuthCheck } from "./useAuthCheck";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, isAuthenticated } = useAuthCheck();

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

  if (!isAuthenticated) return <Navigate to="/auth/login" />;
  return children;
}
