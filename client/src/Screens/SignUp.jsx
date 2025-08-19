import React from "react";
import Logo from "../components/Logo";
import SignupLeftDiv from "../Components/SignUp/SignupLeftDiv";
import SignupRightDiv from "../Components/SignUp/SignupRightDiv";
import UnifiedAuth from "../Components/Auth/UnifiedAuth";

const Signup = () => {
  return (
    <div className="bg-[linear-gradient(to_bottom,_#1F2D3C_0%,_#1BA089_26%,_#1ABC9C_100%)] min-h-screen">
      <Logo />
      
      {/* Mobile/Tablet: Unified Auth Component */}
      <main className="lg:hidden flex items-center justify-center w-full mt-14">
        <UnifiedAuth />
      </main>

      {/* Desktop: Original Layout */}
      <main className="hidden lg:flex flex-row items-center justify-center w-full mt-14">
        <SignupLeftDiv />
        <SignupRightDiv />
      </main>
    </div>
  );
};

export default Signup;
