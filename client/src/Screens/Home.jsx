import CTA from "../Components/Home/CTA";
import Info from "../Components/Home/Info";
import Logo from "../components/Logo";


const Home = () => {

  return (
    
    <div className="bg-[linear-gradient(to_bottom,_#1F2D3C_0%,_#1BA089_26%,_#1ABC9C_100%)] min-h-screen">
      <Logo />

      <main className="mx-auto md:px-4 mt-5">
        <CTA />
        <Info />
      </main>
    </div>
  );
};

export default Home;
