import React from "react";
import Logo from "../components/Logo";
import SignupLeftDiv from "../Components/SignUp/SignupLeftDiv";
import SignupRightDiv from "../Components/SignUp/SignupRightDiv";

const Signup = () => {
  return (
    <div className="bg-[linear-gradient(to_bottom,_#1F2D3C_0%,_#1BA089_26%,_#1ABC9C_100%)] min-h-screen">
      <Logo />
      <main className="flex flex-col md:flex-row items-center justify-center w-full mt-14">
        <SignupLeftDiv />
        <SignupRightDiv />
      </main>
    </div>
  );
};

export default Signup;
