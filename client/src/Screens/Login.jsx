import React from "react";
import Logo from "../components/Logo";
import LoginLeftDiv from "../Components/Login/LoginLeftDiv";
import LoginRightDiv from "../Components/Login/LoginRightDiv";

const Login = () => {
  return (
    <div className="bg-[linear-gradient(to_bottom,_#1F2D3C_0%,_#1BA089_26%,_#1ABC9C_100%)] min-h-screen">
      {/* Logo */}
      <Logo />

      {/* Main container with left and right divs */}
      <main className="flex flex-col md:flex-row items-center justify-center w-full mt-14">
        {/* Left Div */}
        <LoginLeftDiv />

        {/* Right Div */}
        <LoginRightDiv />
      </main>
    </div>
  );
};

export default Login;