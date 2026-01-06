import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const ContactInfoItem = ({ icon: Icon, title, content }: { icon: React.ElementType, title: string, content: React.ReactNode }) => (
  <div className="flex items-start group">
    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mr-5 border border-slate-100 shadow-sm group-hover:border-[#005eD2]/20 group-hover:shadow-md transition-all duration-300 shrink-0">
      <Icon className="text-[#005eD2] h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
    </div>
    <div>
      <h4 className="text-slate-900 font-bold uppercase text-xs tracking-wider mb-1">{title}</h4>
      <div className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-700 transition-colors">
        {content}
      </div>
    </div>
  </div>
);

const WhatsAppButton = () => (
  <a
    href="https://wa.me/923006060780" // Replace with your actual WhatsApp number
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-8 right-8 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-2xl hover:shadow-[#25D366]/40 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center group"
    aria-label="Contact on WhatsApp"
  >
    <MessageCircle className="w-8 h-8 fill-current" />
    <span className="absolute right-full mr-4 bg-white text-slate-800 text-xs font-bold px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
      Chat with us
    </span>
  </a>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Pump Repair',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '8a8e2856-44b4-42a9-b3cd-2c406ce1e729',
          subject: `New Inquiry: ${formData.service} - from ${formData.name}`,
          from_name: 'Bhalwal Diesel Lab Website',
          ...formData
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setStatus('success');
        setFormData({ name: '', phone: '', email: '', service: 'Pump Repair', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <>
      <section id="contact" className="py-32 bg-white relative border-t border-slate-100 overflow-hidden">
        {/* Decorative Background Blob */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#005eD2]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left Column: Info */}
            <div className="flex flex-col justify-center">
              <div className="mb-12">
                <span className="text-[#ff1d1d] font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Get in Touch</span>
                <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 uppercase tracking-tight">
                  Ready to <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005eD2] to-blue-400">Optimize?</span>
                </h3>
                <p className="text-slate-500 text-lg leading-relaxed max-w-md">
                  Visit our lab in Bhalwal or reach out directly. Our team is ready to diagnose and repair your diesel injection systems with precision.
                </p>
              </div>

              <div className="space-y-8">
                <ContactInfoItem 
                  icon={MapPin}
                  title="Our Location"
                  content={<>Noon Sugar Mills Road<br/>Bhalwal, Pakistan</>}
                />
                <ContactInfoItem 
                  icon={Phone}
                  title="Phone Number"
                  content={<>+92 300 6060780<br/>+92 302 6794560</>}
                />
                <ContactInfoItem 
                  icon={Mail}
                  title="Email Us"
                  content="asifmajeed1@yahoo.co.uk"
                />
                <ContactInfoItem 
                  icon={Clock}
                  title="Working Hours"
                  content={<>Mon - Sun: 9:00 AM - 7:00 PM<br/>Friday: Closed</>}
                />
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100 shadow-xl relative overflow-hidden">
              {/* Form Background Accent */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#005eD2] via-blue-400 to-[#ff1d1d]"></div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center">
                Send a Message
                <span className="ml-3 w-12 h-px bg-slate-200"></span>
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col space-y-2">
                    <label className="text-slate-500 text-xs font-bold uppercase tracking-wider ml-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-white border border-slate-200 text-slate-900 px-4 py-3 rounded-xl focus:outline-none focus:border-[#005eD2] focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-300"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="text-slate-500 text-xs font-bold uppercase tracking-wider ml-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full bg-white border border-slate-200 text-slate-900 px-4 py-3 rounded-xl focus:outline-none focus:border-[#005eD2] focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-300"
                      placeholder="0300..."
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="text-slate-500 text-xs font-bold uppercase tracking-wider ml-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-slate-200 text-slate-900 px-4 py-3 rounded-xl focus:outline-none focus:border-[#005eD2] focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-300"
                    placeholder="name@example.com"
                  />
                </div>
                
                <div className="flex flex-col space-y-2">
                  <label className="text-slate-500 text-xs font-bold uppercase tracking-wider ml-1">Service Required</label>
                  <div className="relative">
                    <select 
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full bg-white border border-slate-200 text-slate-900 px-4 py-3 rounded-xl focus:outline-none focus:border-[#005eD2] focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none cursor-pointer"
                    >
                      <option>Pump Repair</option>
                      <option>Injector Testing</option>
                      <option>Common Rail Service</option>
                      <option>Diagnostics</option>
                      <option>Other</option>
                    </select>
                    {/* Custom Arrow */}
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="text-slate-500 text-xs font-bold uppercase tracking-wider ml-1">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-white border border-slate-200 text-slate-900 px-4 py-3 rounded-xl focus:outline-none focus:border-[#005eD2] focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-300 resize-none"
                    placeholder="Tell us about your vehicle or machine issue..."
                  ></textarea>
                </div>

                {/* Status Messages */}
                {status === 'success' && (
                  <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700">
                    <CheckCircle className="w-5 h-5 shrink-0" />
                    <span className="font-medium">Message sent successfully! We'll get back to you soon.</span>
                  </div>
                )}
                {status === 'error' && (
                  <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span className="font-medium">Failed to send message. Please try again or contact us directly.</span>
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-gradient-to-r from-[#ff1d1d] to-[#d91616] hover:from-[#d91616] hover:to-[#b91212] text-white font-bold py-4 rounded-xl shadow-lg shadow-red-500/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center group disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                      Send Request
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sticky WhatsApp Button */}
      <WhatsAppButton />
    </>
  );
};

export default Contact;