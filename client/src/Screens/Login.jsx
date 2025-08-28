import React from "react";
import Logo from "../Components/Logo";
import LoginLeftDiv from "../Components/Login/LoginLeftDiv";
import LoginRightDiv from "../Components/Login/LoginRightDiv";
import UnifiedAuth from "../Components/Auth/UnifiedAuth";

const Login = () => {
  return (
    <div className="bg-[linear-gradient(to_bottom,_#1F2D3C_0%,_#1BA089_26%,_#1ABC9C_100%)] min-h-screen">
      {/* Logo */}
      <Logo />

      {/* Mobile/Tablet: Unified Auth Component */}
      <main className="lg:hidden flex items-center justify-center w-full mt-14">
        <UnifiedAuth />
      </main>

      {/* Desktop: Original Layout */}
      <main className="hidden lg:flex flex-row items-center justify-center w-full mt-14">
        {/* Left Div */}
        <LoginLeftDiv />

        {/* Right Div */}
        <LoginRightDiv />
      </main>
    </div>
  );
};

export default Login;