import { useEffect, useRef, useState } from "react";


type TimelineItemProps = {
  year: string;
  title: string;
  desc: string;
  index: number;
};

type IntersectionObserverOptions = {
  root: Element | null;
  rootMargin: string;
  threshold: number;
};

// --- Custom Hook for Scroll Animation ---
// Required to detect when items enter the viewport
const useElementOnScreen = (options: IntersectionObserverOptions): [React.RefObject<HTMLDivElement | null>, boolean] => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, options);

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [options]);

  return [containerRef, isVisible];
};

// --- Individual Timeline Item ---
const TimelineItem = ({ year, title, desc, index }: TimelineItemProps) => {
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.2
  });

  const isEven = index % 2 === 0;

  return (
    <div 
      ref={containerRef}
      className="flex md:justify-between items-start w-full mb-16 md:mb-24 relative"
    >
      {/* Content Wrapper - Handles Alternating Layout (Left/Right) */}
      <div className={`flex w-full ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row items-center`}>
          
          {/* Desktop Content Side */}
          <div className={`hidden md:block w-1/2 ${isEven ? 'pr-16 text-right' : 'pl-16 text-left'}`}>
             <div className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                 <div className="relative inline-block">
                    {/* Artistic Year Watermark Background */}
                    <span className={`text-[#005eD2] font-black text-8xl opacity-[0.04] absolute -top-10 -z-10 select-none ${isEven ? '-right-10' : '-left-10'}`}>
                        {year}
                    </span>
                    {/* Actual Year Label */}
                    <span className="text-[#ff1d1d] font-bold tracking-[0.2em] text-sm uppercase mb-3 block relative z-10">
                        {year}
                    </span>
                 </div>
                 <h3 className="text-3xl font-bold text-slate-900 mb-4 relative z-10 leading-tight">{title}</h3>
                 <p className="text-slate-500 leading-relaxed text-base relative z-10 font-light">{desc}</p>
             </div>
          </div>

          {/* Center Marker Dot */}
          <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center top-0">
             <div className={`w-3 h-3 rounded-full border-2 border-white shadow-md transition-all duration-700 ease-in-out ${isVisible ? 'bg-[#ff1d1d] scale-150' : 'bg-slate-200 scale-100'}`}></div>
          </div>

          {/* Mobile Content (Always displayed on the right of the line) */}
          <div className={`md:hidden w-full pl-20 pr-4 pt-1`}>
             <div className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                 <span className="text-[#ff1d1d] font-bold tracking-widest text-xs uppercase mb-2 block">{year}</span>
                 <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
                 <p className="text-slate-500 leading-relaxed text-sm">{desc}</p>
             </div>
          </div>

          {/* Spacer for the other side to maintain balance (Desktop only) */}
          <div className="hidden md:block w-1/2"></div>
      </div>
    </div>
  );
};


const About = () => {

  const milestones = [
    {
      year: "1970",
      title: "The Beginning",
      desc: "Majeed Diesel Lab starts operations, providing core mechanical diesel pump services to the local agricultural industry in Punjab."
    },
    {
      year: "2004",
      title: "Delphi Authorization",
      desc: "Achieved a major milestone by becoming an official Delphi Service Center, validating our quality standards globally."
    },
    {
      year: "2017",
      title: "Millat Tractors Ltd",
      desc: "Started offering specialized service in Millat Tractors Lahore, supporting the agricultural backbone of Pakistan."
    },
    {
      year: "2023",
      title: "Delphi Technologies Certification",
      desc: "Achieved certification from Delphi Technologies for matching their diagnostic and repair standards for modern diesel systems."
    },
    {
      year: "2024",
      title: "Delphi Technologies Certification",
      desc: "Achieved certification from Delphi Technologies for matching their diagnostic and repair standards for modern diesel systems."
    },
    {
      year: "2025",
      title: "Delphi Technologies Certification",
      desc: "Achieved certification from Delphi Technologies for matching their diagnostic and repair standards for modern diesel systems."
    },
    {
      year: "2025",
      title: "MDL and Phinia Partnership",
      desc: "MDL has been recognized for its valuable partnership with PHINIA Brazil providing exceptional support and services in handling Diesel Pumps and injectors incidents for the customer Millat Tractors Lahore."
    },
    {
      year: "2025",
      title: "Hartridge CRI-Pro Operating Certification",
      desc: "Asif Majeed successfully completed the technical training course from PHINIA Brazil and earned certification for operating the Hartridge CRI-Pro test bench, enhancing our capabilities in Common Rail injector diagnostics."
    },
    {
      year: "2026",
      title: "Delphi Technologies Certification",
      desc: "Once again we have achieved certification from Delphi Technologies for matching their diagnostic and repair standards for modern diesel systems."
    }
  ];

  return (
    <section id="about" className="py-24 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div >
          <div className="text-center">
            <h2 className="text-[#ff1d1d] font-bold tracking-widest uppercase text-sm mb-3">Our Legacy</h2>
            <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 uppercase">
              Over 55 Years of <br />Engineering Excellence
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Majeed Diesel Lab has been a pioneer in diesel fuel injection services since 1970. What started as a dedicated workshop has evolved into a high-tech laboratory equipped with the latest electronic diagnostic tools.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We take pride in being an authorized service partner for industry giants and providing specialized support for agricultural and industrial machinery, including Millat Tractors Lahore.
            </p>

          
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-[#ff1d1d] font-bold tracking-[0.2em] uppercase text-xs mb-4">Our History</h2>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 uppercase tracking-tight">Legacy of <br/>Excellence</h3>
          {/* Decorative Gradient Line */}
          <div className="w-px h-16 bg-gradient-to-b from-[#005eD2] to-transparent mx-auto"></div>
        </div>

        <div className="relative h-full">
          {/* Vertical Center Line for the Timeline */}
          <div className="absolute w-px bg-slate-200 h-full left-8 md:left-1/2 transform md:-translate-x-1/2 top-0"></div>
          
          {milestones.map((item, index) => (
             <TimelineItem key={index} {...item} index={index} />
          ))}
        </div>
      </div>
          {/* <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-lg">
            <h4 className="text-gray-900 font-bold mb-8 flex items-center">
              <Activity className="w-5 h-5 text-[#ff1d1d] mr-2" />
              Company Milestones
            </h4>
            <HistoryCard
              year="1970"
              title="The Beginning"
              desc="Majeed Diesel Lab starts operations, providing core mechanical diesel pump services to the local industry."
            />
            <HistoryCard
              year="2004"
              title="Delphi Authorization"
              desc="Achieved a major milestone by becoming an official Delphi Service Center, validating our quality standards."
            />
            <HistoryCard
              year="2023"
              title="Phinia Certification"
              desc="Recognized by Phinia (Delphi Technologies) for matching their diagnostic and repair standards for modern diesel systems."
            />
            <HistoryCard
              year="Expansion"
              title="Millat Tractors Partner"
              desc="Started offering specialized service in Millat Tractors Lahore, supporting the agricultural backbone."
            />
            <HistoryCard
              year="Present"
              title="Electronic Era"
              desc="Imported the Hartridge CRI-Pro and expanded into full electronic injector repairing with certified training."
            />
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default About;


