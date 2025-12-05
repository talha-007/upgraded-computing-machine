import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-[#0a0f1c] relative border-t border-slate-800">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#005eD2] to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-[#ff1d1d] font-bold tracking-widest uppercase text-sm mb-3">Get In Touch</h2>
            <h3 className="text-3xl md:text-4xl font-black text-white mb-6 uppercase">Visit Our Lab</h3>
            <p className="text-slate-400 mb-8 leading-relaxed">
              We are located in Bhalwal, ready to serve your diesel injection needs. Whether it&apos;s a single tractor or a fleet of trucks, our team is equipped to help.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-[#0f172a] rounded flex items-center justify-center mr-4 border border-[#005eD2]/30 shrink-0">
                  <MapPin className="text-[#005eD2] h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase text-sm mb-1">Our Location</h4>
                  <p className="text-slate-400 text-sm">
                    Noon Sugar Mills Road
                    <br />
                    Bhalwal, Pakistan
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-[#0f172a] rounded flex items-center justify-center mr-4 border border-[#005eD2]/30 shrink-0">
                  <Phone className="text-[#005eD2] h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase text-sm mb-1">Phone Number</h4>
                  <p className="text-slate-400 text-sm">+92 300 6060780</p>
                  <p className="text-slate-400 text-sm">+92 302 6794560</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-[#0f172a] rounded flex items-center justify-center mr-4 border border-[#005eD2]/30 shrink-0">
                  <Mail className="text-[#005eD2] h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase text-sm mb-1">Email Us</h4>
                  <p className="text-slate-400 text-sm">asifmajeed1@yahoo.co.uk</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-[#0f172a] rounded flex items-center justify-center mr-4 border border-[#005eD2]/30 shrink-0">
                  <Clock className="text-[#005eD2] h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase text-sm mb-1">Working Hours</h4>
                  <p className="text-slate-400 text-sm">Mon - Sun: 9:00 AM - 7:00 PM</p>
                  <p className="text-slate-400 text-sm">Friday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#0f172a] p-8 rounded-xl border border-slate-800 shadow-xl shadow-blue-900/10">
            <h3 className="text-xl font-bold text-white mb-6 uppercase">Send us a Message</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-slate-500 text-xs font-bold uppercase mb-2">Name</label>
                  <input
                    type="text"
                    className="bg-[#0a0f1c] border border-slate-800 text-white p-3 rounded focus:outline-none focus:border-[#005eD2] transition-colors"
                    placeholder="Your Name"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-slate-500 text-xs font-bold uppercase mb-2">Phone</label>
                  <input
                    type="tel"
                    className="bg-[#0a0f1c] border border-slate-800 text-white p-3 rounded focus:outline-none focus:border-[#005eD2] transition-colors"
                    placeholder="0300..."
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-slate-500 text-xs font-bold uppercase mb-2">Service Required</label>
                <select className="bg-[#0a0f1c] border border-slate-800 text-white p-3 rounded focus:outline-none focus:border-[#005eD2] transition-colors">
                  <option>Pump Repair</option>
                  <option>Injector Testing</option>
                  <option>Common Rail Service</option>
                  <option>Diagnostics</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-slate-500 text-xs font-bold uppercase mb-2">Message</label>
                <textarea
                  rows={4}
                  className="bg-[#0a0f1c] border border-slate-800 text-white p-3 rounded focus:outline-none focus:border-[#005eD2] transition-colors"
                  placeholder="Tell us about your vehicle or machine issue..."
                ></textarea>
              </div>

              <button className="w-full bg-[#ff1d1d] hover:bg-red-600 text-white font-bold py-4 rounded uppercase tracking-widest transition-colors mt-2">
                Send Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;


