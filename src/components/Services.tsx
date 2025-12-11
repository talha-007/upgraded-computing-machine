
import { 
  Settings, 
  Cpu, 
  Activity, 
  Wrench, 
  Award, 
  ArrowUpRight,
  Zap,
  Gauge,
  Cog
} from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, description, relatedIcon: RelatedIcon }: { icon: React.ElementType, title: string, description: string, relatedIcon: React.ElementType }) => (
  <div className="group relative bg-white border border-slate-100 rounded-2xl p-8 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-[#005eD2]/30 hover:-translate-y-1">
    
    {/* Hover Effect: Related Object (Watermark) */}
    {/* This large icon slides in from the bottom-right and rotates slightly on hover */}
    <div className="absolute -bottom-10 -right-10 opacity-0 group-hover:opacity-10 transform translate-y-8 group-hover:translate-y-0 rotate-0 group-hover:-rotate-12 transition-all duration-700 ease-out z-0">
      <RelatedIcon size={200} className="text-[#005eD2]" />
    </div>

    {/* Hover Effect: Gradient Background Overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#005eD2]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

    <div className="relative z-10">
      {/* Header: Icon & Arrow */}
      <div className="flex justify-between items-start mb-6">
        <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-[#005eD2] transition-colors duration-500 shadow-sm group-hover:shadow-lg group-hover:shadow-blue-500/30">
          <Icon className="text-[#005eD2] group-hover:text-white h-7 w-7 transition-colors duration-500" />
        </div>
        
        {/* Animated Arrow */}
        <div className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-100">
           <ArrowUpRight className="text-[#005eD2] w-5 h-5" />
        </div>
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#005eD2] transition-colors duration-300">
        {title}
      </h3>
      <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-600 transition-colors duration-300">
        {description}
      </p>

      {/* Bottom Line Decoration */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#005eD2] transition-all duration-500 group-hover:w-full"></div>
    </div>
  </div>
);

const ServicesSection = () => {
  const services = [
    {
      icon: Settings,
      relatedIcon: Cog, // The "related object" shown on hover
      title: "Diesel Pump Repair",
      description: "Expert calibration and repair of all type of diesel pumps for tractors, trucks, and generators."
    },
    {
      icon: Cpu,
      relatedIcon: Zap,
      title: "Electronic Injectors",
      description: "Advanced testing and repair of CR Injectors, EUI, and EUP using Hartridge CRi-Pro, IFT-70, and HK-1400."
    },
    {
      icon: Activity,
      relatedIcon: Gauge,
      title: "Diagnostics",
      description: "Computerized fault finding to identify fuel pressure issues, smoke problems, and power loss."
    },
    {
      icon: Wrench,
      relatedIcon: Settings,
      title: "Parts Replacement",
      description: "We use genuine parts to ensure your engine runs efficiently and meets emission standards."
    },
    {
      icon: Award,
      relatedIcon: Activity,
      title: "Calibration",
      description: "Precision calibration of fuel delivery systems to factory specifications for optimal fuel economy."
    }
  ];

  return (
    <section id="services" className="py-32 bg-white relative overflow-hidden">
      {/* Subtle Background Grid */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ 
               backgroundImage: 'radial-gradient(#005eD2 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
           }}>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-[#ff1d1d] font-bold tracking-[0.2em] uppercase text-xs mb-4">Our Expertise</h2>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 uppercase tracking-tight">Technical <br/>Solutions</h3>
          <div className="w-px h-16 bg-gradient-to-b from-[#005eD2] to-transparent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;