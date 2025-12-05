import { Settings, Cpu, Truck, Activity, Wrench, Award } from "lucide-react";

type ServiceCardProps = {
  icon: typeof Settings;
  title: string;
  description: string;
};

const ServiceCard = ({ icon: Icon, title, description }: ServiceCardProps) => (
  <div className="group p-8 bg-[#1e293b] hover:bg-[#005eD2] border-b-4 border-[#005eD2] hover:border-[#ff1d1d] transition-all duration-300">
    <div className="w-14 h-14 bg-[#0f172a] rounded flex items-center justify-center mb-6 group-hover:bg-white transition-colors duration-300">
      <Icon className="text-[#005eD2] group-hover:text-[#005eD2] h-7 w-7 transition-colors" />
    </div>
    <h3 className="text-xl font-bold text-white mb-3 uppercase">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-sm group-hover:text-blue-100">{description}</p>
  </div>
);

const Services = () => {
  return (
    <section id="services" className="py-24 bg-[#0a0f1c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-[#ff1d1d] font-bold tracking-widest uppercase text-sm mb-3">Our Expertise</h2>
          <h3 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase">Complete Fuel Injection Solutions</h3>
          <div className="w-24 h-1 bg-[#005eD2] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard
            icon={Settings}
            title="Diesel Pump Repair"
            description="Expert calibration and repair of mechanical diesel pumps for tractors, trucks, and generators."
          />
          <ServiceCard
            icon={Cpu}
            title="Electronic Injectors"
            description="Advanced diagnostics and repairing for modern Common Rail Injectors using the Hartridge CRI-Pro."
          />
          <ServiceCard
            icon={Truck}
            title="Tractor Services"
            description="Specialized support for Millat Tractors and agricultural machinery fuel systems."
          />
          <ServiceCard
            icon={Activity}
            title="Diagnostics"
            description="Computerized fault finding to identify fuel pressure issues, smoke problems, and power loss."
          />
          <ServiceCard
            icon={Wrench}
            title="Parts Replacement"
            description="We use genuine parts to ensure your engine runs efficiently and meets emission standards."
          />
          <ServiceCard
            icon={Award}
            title="Calibration"
            description="Precision calibration of fuel delivery systems to factory specifications for optimal fuel economy."
          />
        </div>
      </div>
    </section>
  );
};

export default Services;


