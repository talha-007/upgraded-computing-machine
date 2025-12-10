import { FileText, Calendar, User, ArrowRight } from "lucide-react";

type BlogPostProps = {
  title: string;
  date: string;
  excerpt: string;
  category: string;
};

const BlogPost = ({ title, date, excerpt, category }: BlogPostProps) => (
  <article className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col hover:border-[#005eD2] transition-colors group shadow-sm">
    <div className="h-48 bg-gray-100 relative flex items-center justify-center">
      <FileText className="w-12 h-12 text-gray-400 group-hover:text-[#005eD2] transition-colors" />
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-gray-900 text-xs font-bold px-2 py-1 rounded border border-[#005eD2]/30">
        {category}
      </div>
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <div className="flex items-center text-gray-500 text-xs mb-3 space-x-3">
        <span className="flex items-center">
          <Calendar size={12} className="mr-1 text-[#005eD2]" /> {date}
        </span>
        <span className="flex items-center">
          <User size={12} className="mr-1 text-[#005eD2]" /> Admin
        </span>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-[#005eD2] transition-colors cursor-pointer">
        {title}
      </h3>
      <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">{excerpt}</p>
      <button className="text-[#ff1d1d] font-bold text-xs uppercase tracking-widest flex items-center hover:text-[#ff1d1d]/80 transition-colors mt-auto">
        Read Article <ArrowRight size={12} className="ml-2" />
      </button>
    </div>
  </article>
);

const Blog = () => {
  return (
    <section id="blog" className="py-24 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-[#005eD2] font-bold tracking-widest uppercase text-sm mb-3">Latest News</h2>
            <h3 className="text-3xl md:text-4xl font-black text-gray-900 uppercase">Diesel Insights</h3>
          </div>
          <button className="hidden md:flex bg-gray-100 hover:bg-[#005eD2] text-gray-900 hover:text-white border border-gray-300 hover:border-[#005eD2] px-6 py-3 rounded font-bold text-sm uppercase tracking-wider transition-all items-center">
            View All Posts <ArrowRight size={16} className="ml-2" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <BlogPost
            title="Why Electronic Injector Calibration is Critical"
            date="October 12, 2023"
            category="Technical"
            excerpt="Modern engines rely on precise fuel delivery. Learn why even a micron of deviation in injector calibration can lead to engine failure and smoke issues."
          />
          <BlogPost
            title="Majeed Diesel Lab acquires Hartridge CRI-Pro"
            date="September 28, 2023"
            category="Company News"
            excerpt="We have upgraded our facility with the latest Hartridge CRI-Pro machine, allowing us to test all makes of Common Rail injectors with OEM precision."
          />
          <BlogPost
            title="Maintenance Tips for Millat Tractor Fuel Pumps"
            date="August 15, 2023"
            category="Maintenance"
            excerpt="Farmers relying on Millat Tractors need to ensure their fuel systems are clean. Here are 5 tips to extend the life of your diesel pump."
          />
        </div>

        <div className="mt-8 md:hidden text-center">
          <button className="bg-gray-100 hover:bg-[#005eD2] text-gray-900 hover:text-white border border-gray-300 px-6 py-3 rounded font-bold text-sm uppercase tracking-wider transition-all inline-flex items-center">
            View All Posts <ArrowRight size={16} className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Blog;


