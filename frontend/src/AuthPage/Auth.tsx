import { Outlet } from "react-router-dom";
import RoleComp from "./RoleComp";
function Auth() {
  return (
    <>
      <RoleComp />
      <div className="md:flex md:justify-center w-full items-center md:max-w-[1100px] mx-auto md:px-4 md:py-6 h-[calc(100vh-5rem)] ">
        <Outlet />
      </div>
    </>
  );
}

export default Auth;
