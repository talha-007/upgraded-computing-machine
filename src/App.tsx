import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Equipment from "./components/Equipment";
import Diagnostics from "./components/Diagnostics";
import Gallery from "./components/Gallery";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const App = () => (
  <div className="bg-white min-h-screen text-gray-900 font-sans selection:bg-[#005eD2] selection:text-white">
    <Navbar />
    <Hero />
    <About />
    <Services />
    <Equipment />
    <Diagnostics />
    <Gallery />
    <Blog />
    <Contact />
    <Footer />
  </div>
);

export default App;

