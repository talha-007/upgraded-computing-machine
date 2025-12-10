import { Settings } from "lucide-react";
import { certificationLogos } from "../constants/certificationLogos";

const Footer = () => (
  <footer className="bg-white border-t border-gray-200 pt-12 pb-6">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Settings className="text-[#005eD2] h-6 w-6" />
            <span className="text-xl font-black text-gray-900 uppercase">Majeed Diesel Lab</span>
          </div>
          <p className="text-gray-600 text-sm">
            Professional diesel injection services since 1970. Official Delphi & Phinia Service Center.
          </p>
        </div>

        <div>
          <h4 className="text-gray-900 font-bold uppercase text-sm mb-4">Services</h4>
          <ul className="text-gray-600 text-sm space-y-2">
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
          <h4 className="text-gray-900 font-bold uppercase text-sm mb-4">Certifications</h4>
          <div className="flex flex-wrap gap-3 items-center">
            {certificationLogos.map((cert) => (
              <div
                key={cert.name}
                className="bg-gray-50 px-4 py-2 rounded border border-[#005eD2]/30 flex items-center justify-center shadow-sm"
              >
                <img
                  src={cert.logo}
                  alt={`${cert.name} logo`}
                  className="h-6 w-auto object-contain opacity-80"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6 text-center">
        <p className="text-gray-500 text-xs">
          © {new Date().getFullYear()} Majeed Diesel Lab. All rights reserved. Lahore, Pakistan.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;


