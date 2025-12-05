import { Camera } from "lucide-react";

const images = [
  { title: "Hartridge CRI-Pro in Action", category: "Technology" },
  { title: "Workshop Interior", category: "Facility" },
  { title: "Team Calibration Work", category: "Team" },
  { title: "Injector Repair Process", category: "Service" },
  { title: "Millat Tractor Service", category: "Clients" },
  { title: "Spare Parts Inventory", category: "Stock" },
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-24 bg-[#0a0f1c] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-[#ff1d1d] font-bold tracking-widest uppercase text-sm mb-3">Our Workplace</h2>
          <h3 className="text-3xl md:text-4xl font-black text-white uppercase mb-4">Gallery</h3>
          <p className="text-slate-400 max-w-2xl">
            A glimpse into our daily operations, precision machinery, and the expert team behind Majeed Diesel Lab.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img, index) => (
            <div
              key={index}
              className="group relative aspect-video bg-[#0f172a] rounded-lg overflow-hidden border border-slate-800 cursor-pointer hover:border-[#005eD2] transition-colors"
            >
              <div className="absolute inset-0 flex items-center justify-center bg-[#0f172a] group-hover:scale-105 transition-transform duration-500">
                <Camera className="w-12 h-12 text-slate-700 group-hover:text-[#005eD2] transition-colors" />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-[#0a0f1c]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

              <div className="absolute bottom-0 left-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-[#ff1d1d] text-xs font-bold uppercase tracking-wider mb-1 block">{img.category}</span>
                <h4 className="text-white font-bold text-lg">{img.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;


