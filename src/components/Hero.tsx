import { useEffect, useState } from "react";
import { Award, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { certificationLogos } from "../constants/certificationLogos";

type SlideAsset = {
  key: string;
  alt: string;
  importer: () => Promise<string>;
};

const formatAltText = (path: string) => {
  const fileName = path.split("/").pop() ?? "slide image";
  const name = fileName.replace(/\.[^/.]+$/, "").replace(/[-_]+/g, " ").trim();
  return name.length ? name.charAt(0).toUpperCase() + name.slice(1) : "Slide image";
};

const heroImageModules = import.meta.glob<string>(
  "../assets/images/*.{jpg,jpeg,png,webp,avif}",
  {
    import: "default",
  }
);

const slides: SlideAsset[] = Object.entries(heroImageModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, importer]) => ({
    key: path,
    alt: formatAltText(path),
    importer,
  }));

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadedSlides, setLoadedSlides] = useState<Record<string, string>>({});
  const slideCount = slides.length;

  useEffect(() => {
    if (slideCount <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, 5000);

    return () => clearInterval(timer);
  }, [slideCount]);

  useEffect(() => {
    if (!slideCount) {
      return;
    }

    let cancelled = false;

    const loadImageForIndex = async (index: number) => {
      const slide = slides[index];
      if (!slide || loadedSlides[slide.key]) {
        return;
      }

      try {
        const src = await slide.importer();
        if (!cancelled) {
          setLoadedSlides((prev) => (prev[slide.key] ? prev : { ...prev, [slide.key]: src }));
        }
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error(`Failed to load slide image ${slide.key}`, error);
        }
      }
    };

    loadImageForIndex(currentSlide);
    loadImageForIndex((currentSlide + 1) % slideCount);

    return () => {
      cancelled = true;
    };
  }, [currentSlide, slideCount, loadedSlides]);

  const nextSlide = () => {
    if (slideCount <= 1) return;
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  };

  const prevSlide = () => {
    if (slideCount <= 1) return;
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  };

  return (
    <div
      id="home"
      className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white min-h-[80vh] flex items-center"
    >
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => {
          const loadedSrc = loadedSlides[slide.key];

          return (
            <div
              key={slide.key}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              {loadedSrc ? (
                <img
                  src={loadedSrc}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={index === 0 ? "high" : "low"}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 animate-pulse" aria-hidden="true" />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1c] via-[#0a0f1c]/90 to-[#0a0f1c]/40"></div>
            </div>
          );
        })}
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] border-4 border-[#005eD2]/30 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#005eD2]/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="lg:w-2/3">
          <div className="inline-flex items-center space-x-2 bg-slate-900/80 backdrop-blur-sm border border-[#005eD2]/30 rounded px-3 py-1 mb-6">
            <Award className="w-4 h-4 text-[#ff1d1d]" />
            <span className="text-white text-xs font-bold uppercase tracking-wider">Serving Since 1970</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6 leading-none drop-shadow-lg">
            PRECISION <span className="text-[#005eD2]">DIESEL</span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">
              INJECTION SYSTEMS
            </span>
          </h1>

          <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl border-l-4 border-[#ff1d1d] pl-6 drop-shadow-md bg-slate-900/20 rounded-r-lg py-2">
            Official Delphi & Phinia Service Center with Hartridge trained experts. We specialize in repairing all kinds of diesel pumps, injectors, and modern Common Rail electronic systems using the world's best testing equipment.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#equipment"
              className="bg-[#005eD2] hover:bg-blue-700 text-white px-8 py-4 rounded font-bold text-sm uppercase tracking-widest transition-all flex items-center justify-center shadow-lg shadow-blue-900/40"
            >
              View Our Equipment <ChevronRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href="#diagnostics"
              className="bg-transparent border border-slate-400 hover:border-[#ff1d1d] hover:text-[#ff1d1d] text-white px-8 py-4 rounded font-bold text-sm uppercase tracking-widest transition-all flex items-center justify-center backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 mr-2" /> AI Check
            </a>
          </div>

          <div className="mt-10 bg-white/80 border border-gray-200 rounded-2xl p-4 sm:p-5 backdrop-blur-md max-w-md shadow-sm">
            <div className="text-gray-600 text-xs font-bold uppercase tracking-[0.3em] mb-4">
              Certified By
            </div>
            <div className="flex flex-wrap items-center gap-6">
              {certificationLogos.map((cert) => (
                <img
                  key={cert.name}
                  src={cert.logo}
                  alt={`${cert.name} logo`}
                  className="h-8 md:h-10 object-contain opacity-80 hover:opacity-100 transition-opacity"
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 right-4 lg:right-10 flex space-x-4 z-20">
          <button
            onClick={prevSlide}
            className="p-2 bg-slate-900/50 hover:bg-[#005eD2] text-white rounded-full border border-slate-700 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 bg-slate-900/50 hover:bg-[#005eD2] text-white rounded-full border border-slate-700 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((slide, idx) => (
            <button
              key={slide.key}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentSlide ? "bg-[#ff1d1d] w-6" : "bg-slate-500 hover:bg-slate-300"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
              disabled={slideCount <= 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;


