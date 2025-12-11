import { Cpu, Settings, Award, ChevronRight } from "lucide-react";

import criProImage from "../assets/images/machines/Cri-pro.jpg";
import ift70Image from "../assets/images/machines/IFT-70.jpg";
import hk1400Image from "../assets/images/machines/hk1400.webp";
import hartridge2500Image from "../assets/images/machines/hartridge-2500.jpg";
import hartridge800Image from "../assets/images/machines/hartridge-800.jpg";
import hartridgePopTesterImage from "../assets/images/machines/pop tester.jpg";

type EquipmentItemProps = {
  name: string;
  desc: string;
  badge?: string;
  image?: string;
};

const EquipmentItem = ({ name, desc, badge, image }: EquipmentItemProps) => (
  <div className="flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden group hover:border-[#005eD2] transition-all shadow-sm">
    <div className="h-48 bg-gray-100 relative flex items-center justify-center overflow-hidden">
      {image ? (
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
          <Cpu className="w-16 h-16 text-gray-400 group-hover:text-[#005eD2] transition-colors" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
      <div className="absolute bottom-4 left-4">
        <span className="bg-[#ff1d1d] text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
          {badge || "Equipment"}
        </span>
      </div>
    </div>
    <div className="p-6">
      <h4 className="text-lg font-bold text-gray-900 mb-2">{name}</h4>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  </div>
);

const Equipment = () => {
  return (
    <section id="equipment" className="py-24 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-[#005eD2] font-bold tracking-widest uppercase text-sm mb-3">Our Technology</h2>
            <h3 className="text-3xl md:text-4xl font-black text-gray-900 uppercase">State-of-the-art Lab</h3>
            <p className="text-gray-600 mt-4 max-w-2xl">
              We invest in Hartridge benches and run their ISO-standard OEM test plans to keep every calibration traceable.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            <div className="flex items-center space-x-1 bg-white px-3 py-1 rounded border border-[#005eD2]/30 shadow-sm">
              <Award size={16} className="text-[#ff1d1d]" />
              <span className="text-gray-900 text-xs font-bold">Hartridge Trained</span>
            </div>
            <div className="flex items-center space-x-1 bg-white px-3 py-1 rounded border border-[#005eD2]/30 shadow-sm">
              <Award size={16} className="text-[#005eD2]" />
              <span className="text-gray-900 text-xs font-bold">Delphi Center</span>
            </div>
            <div className="flex items-center space-x-1 bg-white px-3 py-1 rounded border border-[#005eD2]/30 shadow-sm">
              <Award size={16} className="text-[#0bd0c2]" />
              <span className="text-gray-900 text-xs font-bold">Phinia Certified</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-2 md:col-span-2">
            <div className="h-full bg-gradient-to-br from-[#005eD2] to-[#003da1] rounded-lg p-8 border border-blue-600 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <img
                  src={criProImage}
                  alt="Hartridge CRI-Pro"
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </div>
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

          <EquipmentItem 
            name="Hartridge IFT-70" 
            desc="The IFT-70 is a cost-effective common-rail injector test; designed to provide all levels of workshop from garages to diesel workshops with the ability to perform a simple and quick diesel injector diagnostic." 
            badge="Test Bench"
            image={ift70Image}
          />
          <EquipmentItem 
            name="Hartridge-PC 2 (coming soon)" 
            desc="Computerized test bench for detailed pump calibration and testing." 
            badge="Test Bench" 
          />
          <EquipmentItem 
            name="Hartridge HK-1400" 
            desc="Specialized Common Rail injection system testing unit." 
            badge="Common Rail"
            image={hk1400Image}
          />
          <EquipmentItem 
            name="Hartridge Test Bench 2500" 
            desc="Heavy duty test bench for larger industrial diesel applications." 
            badge="Heavy Duty"
            image={hartridge2500Image}
          />
          <EquipmentItem 
            name="Hartridge Test Bench 800" 
            desc="Reliable mechanical pump testing solution for conventional systems." 
            badge="Classic"
            image={hartridge800Image}
          />
          <EquipmentItem 
            name="Hartridge HH560 Injector Poptest 3" 
            desc="The Hartridge HH560 Injector PopTest 3 is compact and portable, and perfect for ‘go/no-go’ testing. It is a simple unit for mechanical injector testing that performs reliably in any setting" 
            badge="Classic"
            image={hartridgePopTesterImage}
          />
        </div>
      </div>
    </section>
  );
};

export default Equipment;


