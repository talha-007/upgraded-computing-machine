import { Settings } from "lucide-react";

const Footer = () => (
  <footer className="bg-[#0a0f1c] border-t border-slate-900 pt-12 pb-6">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Settings className="text-[#005eD2] h-6 w-6" />
            <span className="text-xl font-black text-white uppercase">Majeed Diesel Lab</span>
          </div>
          <p className="text-slate-500 text-sm">
            Professional diesel injection services since 1970. Official Delphi & Phinia Service Center.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold uppercase text-sm mb-4">Services</h4>
          <ul className="text-slate-500 text-sm space-y-2">
            <li>
              <a href="#" className="hover:text-[#005eD2]">
                Pump Repair
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#005eD2]">
                Injector Coding
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#005eD2]">
                Diagnostics
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold uppercase text-sm mb-4">Certifications</h4>
          <div className="flex space-x-3">
            <div className="bg-[#0f172a] px-3 py-1 rounded border border-[#005eD2]/30 text-white text-xs font-bold">
              Delphi
            </div>
            <div className="bg-[#0f172a] px-3 py-1 rounded border border-[#005eD2]/30 text-white text-xs font-bold">
              Hartridge
            </div>
            <div className="bg-[#0f172a] px-3 py-1 rounded border border-[#005eD2]/30 text-white text-xs font-bold">
              Phinia
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-900 pt-6 text-center">
        <p className="text-slate-600 text-xs">
          © {new Date().getFullYear()} Majeed Diesel Lab. All rights reserved. Lahore, Pakistan.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;


