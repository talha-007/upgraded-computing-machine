import { Activity } from "lucide-react";

type HistoryCardProps = {
  year: string;
  title: string;
  desc: string;
};

const HistoryCard = ({ year, title, desc }: HistoryCardProps) => (
  <div className="relative pl-8 pb-12 border-l-2 border-slate-800 last:border-0 last:pb-0">
    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-[#005eD2] ring-4 ring-[#0a0f1c]"></div>
    <span className="text-[#005eD2] font-bold text-sm mb-1 block">{year}</span>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

const About = () => {
  return (
    <section id="about" className="py-24 bg-[#0f172a] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-[#ff1d1d] font-bold tracking-widest uppercase text-sm mb-3">Our Legacy</h2>
            <h3 className="text-3xl md:text-4xl font-black text-white mb-6 uppercase">
              Over 50 Years of <br />Engineering Excellence
            </h3>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Majeed Diesel Lab has been a pioneer in diesel fuel injection services since 1970. What started as a dedicated workshop has evolved into a high-tech laboratory equipped with the latest electronic diagnostic tools.
            </p>
            <p className="text-slate-400 mb-8 leading-relaxed">
              We take pride in being an authorized service partner for industry giants and providing specialized support for agricultural and industrial machinery, including Millat Tractors Lahore.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-slate-900/50 p-4 rounded border border-[#005eD2]/20">
                <div className="text-3xl font-bold text-white mb-1">1970</div>
                <div className="text-xs text-[#005eD2] uppercase font-bold">Established</div>
              </div>
              <div className="bg-slate-900/50 p-4 rounded border border-[#005eD2]/20">
                <div className="text-3xl font-bold text-white mb-1">2004</div>
                <div className="text-xs text-[#ff1d1d] uppercase font-bold">Delphi Certified</div>
              </div>
              <div className="bg-slate-900/50 p-4 rounded border border-[#005eD2]/20">
                <div className="text-3xl font-bold text-white mb-1">2023</div>
                <div className="text-xs text-[#0bd0c2] uppercase font-bold">Phinia Certified</div>
              </div>
            </div>
          </div>

          <div className="bg-[#0a0f1c] p-8 rounded-xl border border-slate-800 shadow-2xl">
            <h4 className="text-white font-bold mb-8 flex items-center">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;


