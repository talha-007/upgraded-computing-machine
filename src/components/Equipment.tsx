import { Cpu, Settings, Award, ChevronRight } from "lucide-react";

type EquipmentItemProps = {
  name: string;
  desc: string;
  badge?: string;
};

const EquipmentItem = ({ name, desc, badge }: EquipmentItemProps) => (
  <div className="flex flex-col bg-[#0f172a] border border-slate-800 rounded-lg overflow-hidden group hover:border-[#005eD2] transition-all">
    <div className="h-48 bg-[#1e293b] relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[#1e293b] flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
        <Cpu className="w-16 h-16 text-slate-600 group-hover:text-[#005eD2] transition-colors" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent"></div>
      <div className="absolute bottom-4 left-4">
        <span className="bg-[#ff1d1d] text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
          {badge || "Equipment"}
        </span>
      </div>
    </div>
    <div className="p-6">
      <h4 className="text-lg font-bold text-white mb-2">{name}</h4>
      <p className="text-slate-400 text-sm">{desc}</p>
    </div>
  </div>
);

const Equipment = () => {
  return (
    <section id="equipment" className="py-24 bg-[#0f172a] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-[#005eD2] font-bold tracking-widest uppercase text-sm mb-3">Our Technology</h2>
            <h3 className="text-3xl md:text-4xl font-black text-white uppercase">State-of-the-art Lab</h3>
            <p className="text-slate-400 mt-4 max-w-2xl">
              We invest in the world's best testing technology from Hartridge to ensure OEM-level precision.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            <div className="flex items-center space-x-1 bg-[#1e293b] px-3 py-1 rounded border border-[#005eD2]/30">
              <Award size={16} className="text-[#ff1d1d]" />
              <span className="text-white text-xs font-bold">Hartridge Trained</span>
            </div>
            <div className="flex items-center space-x-1 bg-[#1e293b] px-3 py-1 rounded border border-[#005eD2]/30">
              <Award size={16} className="text-[#005eD2]" />
              <span className="text-white text-xs font-bold">Delphi Center</span>
            </div>
            <div className="flex items-center space-x-1 bg-[#1e293b] px-3 py-1 rounded border border-[#005eD2]/30">
              <Award size={16} className="text-[#0bd0c2]" />
              <span className="text-white text-xs font-bold">Phinia Certified</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-2 md:col-span-2">
            <div className="h-full bg-gradient-to-br from-[#005eD2] to-[#003da1] rounded-lg p-8 border border-blue-600 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <Settings size={200} className="text-white" />
              </div>
              <div className="relative z-10">
                <span className="text-blue-200 font-bold tracking-wider text-sm uppercase mb-2 block">The Crown Jewel</span>
                <h3 className="text-3xl font-black text-white mb-4">Hartridge CRI-Pro</h3>
                <p className="text-blue-100 mb-6 leading-relaxed">
                  Our latest addition, the CRI-Pro, allows us to test and code Common Rail Injectors to the highest standards. We are fully trained by Hartridge to operate this advanced machinery.
                </p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center text-blue-100 text-sm">
                    <ChevronRight size={16} className="text-white mr-2" /> All-Makes Common Rail Injector Testing
                  </li>
                  <li className="flex items-center text-blue-100 text-sm">
                    <ChevronRight size={16} className="text-white mr-2" /> Advanced Response Time Measurement
                  </li>
                  <li className="flex items-center text-blue-100 text-sm">
                    <ChevronRight size={16} className="text-white mr-2" /> Injector Coding
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <EquipmentItem name="AVM-PC 2" desc="Computerized test bench for detailed pump calibration and testing." badge="Test Bench" />
          <EquipmentItem name="HK-1400" desc="Specialized Common Rail injection system testing unit." badge="Common Rail" />
          <EquipmentItem name="Test Bench 2500" desc="Heavy duty test bench for larger industrial diesel applications." badge="Heavy Duty" />
          <EquipmentItem name="Test Bench 700" desc="Reliable mechanical pump testing solution for conventional systems." badge="Classic" />
        </div>
      </div>
    </section>
  );
};

export default Equipment;


