import CTA from "../Components/Home/CTA";
import Info from "../Components/Home/Info";
import AboutTeam from "../Components/Home/about team/AboutTeam.jsx";
import Logo from "../Components/Logo";


const Home = () => {

  return (
    
    <div className="bg-[linear-gradient(to_bottom,#1F2D3C_0%,#1BA089_26%,_#1ABC9C_100%)] min-h-screen">
      <Logo />

      <main className="mx-auto md:px-4 mt-5">
        <CTA />
        <Info />
        <AboutTeam />
      </main>
    </div>
  );
};

export default Home;