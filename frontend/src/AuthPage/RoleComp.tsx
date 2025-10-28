import { motion } from "framer-motion";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";
import { useUserStore } from "../store/store";

export default function RoleComp() {
  const { role, setRole } = useUserStore();
  return (
    <motion.div
      className="flex md:flex-row items-center md:justify-between h-fit gap-5 p-2 bg-gray-50 flex-col-reverse"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-xl flex font-serif items-center ">
        {role ? (
          <>
            <span>Login / signup as</span>
            <span className="text-2xl text-blue-600 capitalize p-2 underline leading-10">
              {role}
            </span>
          </>
        ) : (
          "Select Your Role"
        )}
      </h1>

      <div className="flex gap-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={() => setRole("teacher")}
          className="bg-blue-600 text-white cursor-pointer flex items-center gap-2
           px-6 py-3 rounded-xl shadow-md"
        >
          <FaChalkboardTeacher /> Teacher
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={() => setRole("student")}
          className="bg-green-600 text-white flex cursor-pointer items-center gap-2 px-6 py-3 rounded-xl shadow-md"
        >
          <FaUserGraduate /> Student
        </motion.button>
      </div>
    </motion.div>
  );
}
