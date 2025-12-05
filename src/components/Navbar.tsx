import { useEffect, useState } from "react";
import { Menu, X, Settings } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Equipment", href: "#equipment" },
  { name: "AI Check", href: "#diagnostics" },
  { name: "Gallery", href: "#gallery" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 border-b border-transparent ${
        scrolled
          ? "bg-[#0f172a]/95 backdrop-blur-md shadow-lg border-[#005eD2]/30 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#005eD2] rounded flex items-center justify-center shadow-lg shadow-blue-900/50">
            <Settings className="text-white h-6 w-6 animate-spin-slow" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-black text-white tracking-tighter uppercase leading-none">
              Majeed
            </span>
            <span className="text-xs font-bold text-[#ff1d1d] tracking-widest uppercase">
              Diesel Lab
            </span>
          </div>
        </div>

        <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-slate-300 hover:text-[#005eD2] font-medium transition-colors text-xs xl:text-sm uppercase tracking-wide"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-[#ff1d1d] hover:bg-red-600 text-white px-5 py-2 rounded font-bold transition-all shadow-lg shadow-red-900/30 uppercase text-xs tracking-wider border border-transparent hover:border-white/20"
          >
            Get Quote
          </a>
        </div>

        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-[#ff1d1d] focus:outline-none transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#0f172a] border-t border-[#005eD2]/30 p-4 shadow-xl max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-300 hover:text-[#005eD2] block px-3 py-2 rounded-md hover:bg-slate-800 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="bg-[#ff1d1d] text-white px-5 py-3 rounded w-full font-bold text-center uppercase tracking-wide"
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


