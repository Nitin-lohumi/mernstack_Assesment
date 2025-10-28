import { useNavigate } from "react-router-dom";
import { API } from "./SignUp";
import { toast } from "react-toastify";
import { useUserStore } from "../store/store";
import { motion } from "framer-motion";
function Header() {
  const { logoutUser, setRole } = useUserStore();
  const navigate = useNavigate();
  const handleSignout = async () => {
    try {
      await API.get("/auth/logout");
      navigate("/auth/login");
      toast.success("logout sucess");
      logoutUser();
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex justify-between items-center w-full p-2 md:mt-1 mt-3">
      <div className="flex justify-center items-center">
        <p className="text-xl md:font-semibold font-bold"></p>
      </div>
      <motion.div
        whileHover={{ scale: 1.1, color: "red" }}
        className="text-blue-600 cursor-pointer border pl-2 pr-2 p-1 rounded-xl"
        onClick={() => {
          handleSignout();
          setRole(null);
        }}
      >
        signout
      </motion.div>
    </div>
  );
}

export default Header;
