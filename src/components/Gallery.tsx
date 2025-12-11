import { useState, useEffect, useRef } from 'react';
import { Zap, ArrowUpRight, Instagram } from 'lucide-react';

type ImageItem = {
  id: string;
  src: string;
  category: string;
  title: string;
  importer?: () => Promise<string>;
};

// Helper function to generate category and title from filename
const formatImageInfo = (path: string): { category: string; title: string } => {
  const fileName = path.split('/').pop()?.replace(/\.[^/.]+$/, '') || 'Gallery Image';
  const categories = ['Lab', 'Workshop', 'Equipment', 'Team', 'Facility', 'Service', 'Technology'];
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const title = fileName.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  return { category: randomCategory, title: title.length > 30 ? title.substring(0, 30) + '...' : title };
};

// Dynamically import all gallery images
const galleryImageModules = import.meta.glob<string>(
  "../assets/gallery/*.{jpg,jpeg,png,webp}",
  {
    import: "default",
  }
);

// Create image items from imported modules
const createImageItems = (): ImageItem[] => {
  return Object.entries(galleryImageModules)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, importer], index) => {
      const { category, title } = formatImageInfo(path);
      return {
        id: `gallery-${index + 1}`,
        src: '', // Will be loaded lazily
        category,
        title,
        importer,
      };
    });
};

// --- Image Data Pool ---
const allImages: ImageItem[] = createImageItems();

// --- REFINED "BENTO" LAYOUT CONFIGURATION ---
// Using a 6-column grid basis for finer control and smaller tiles.
const layoutConfig = [
  // Row 1
  { id: '1', span: 'col-span-2 md:col-span-2 md:row-span-2' }, // Large Square (Left)
  { id: '2', span: 'col-span-1 md:col-span-2 md:row-span-1' }, // Wide (Middle)
  { id: '3', span: 'col-span-1 md:col-span-1 md:row-span-1' }, // Small (Right 1)
  { id: '4', span: 'col-span-1 md:col-span-1 md:row-span-1' }, // Small (Right 2)
  
  // Row 2 (Filling gaps below Row 1 items)
  { id: '5', span: 'col-span-1 md:col-span-1 md:row-span-1' }, // Small
  { id: '6', span: 'col-span-1 md:col-span-1 md:row-span-1' }, // Small
  { id: '7', span: 'col-span-2 md:col-span-2 md:row-span-1' }, // Wide
  
  // Row 3
  { id: '8', span: 'col-span-1 md:col-span-1 md:row-span-2' }, // Tall (Left)
  { id: '9', span: 'col-span-2 md:col-span-2 md:row-span-2' }, // Large Square (Middle)
  { id: '10', span: 'col-span-1 md:col-span-1 md:row-span-1' }, // Small (Right 1)
  { id: '11', span: 'col-span-2 md:col-span-2 md:row-span-1' }, // Wide (Right 2)
  
  // Row 4
  { id: '12', span: 'col-span-2 md:col-span-3 md:row-span-1' }, // Extra Wide
];

const GalleryItem = ({ item, span, priority = false }: { item: ImageItem; span: string; priority?: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [loadedSrc, setLoadedSrc] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!itemRef.current || loadedSrc) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: priority ? '0px' : '100px',
        threshold: 0.1,
      }
    );

    observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, [loadedSrc, priority]);

  // Load image when visible or if priority
  useEffect(() => {
    if (item.importer && !loadedSrc && (isVisible || priority)) {
      item.importer()
        .then(src => setLoadedSrc(src))
        .catch(err => {
          if (import.meta.env.DEV) {
            console.error('Failed to load gallery image', err);
          }
        });
    }
  }, [item.importer, loadedSrc, isVisible, priority]);
  
  return (
    <div 
      ref={itemRef}
      className={`relative group overflow-hidden rounded-2xl bg-slate-100 ${span} h-full w-full min-w-0`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Absolute positioning with inset-0 ensures the image fills the parent 
         container defined by the grid, regardless of the image's intrinsic size.
      */}
      <div className="absolute inset-0">
        {loadedSrc ? (
          <img 
            src={loadedSrc} 
            alt={item.title}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={priority ? "high" : "low"}
            className={`w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 animate-pulse" aria-hidden="true" />
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col justify-end pointer-events-none">
        <div className={`transform transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>
           <span className="inline-block text-[#005eD2] bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest shadow-sm mb-1">
             {item.category}
           </span>
        </div>
        <div className="flex justify-between items-end">
           <h3 className="text-white font-bold text-sm md:text-base leading-tight drop-shadow-md truncate pr-2">
             {item.title}
           </h3>
           <div className={`bg-white/10 backdrop-blur-md p-1.5 rounded-full border border-white/20 transition-all duration-500 ${
              isHovered ? 'bg-[#005eD2] border-[#005eD2] rotate-45' : ''
           }`}>
             <ArrowUpRight className="text-white w-3 h-3 md:w-4 md:h-4" />
           </div>
        </div>
      </div>
    </div>
  );
};

const Gallery = () => {
  // Map layout config to images. If more config slots than images, cycle images.
  const gridItems = layoutConfig.map((config, index) => ({
    ...config,
    image: allImages[index % allImages.length]
  }));

  return (
    <section id="gallery" className="py-24 bg-white relative overflow-x-hidden">
       {/* Background */}
       <div className="absolute right-0 top-0 w-1/3 h-full bg-slate-50 -skew-x-12 z-0 opacity-50" style={{ maxWidth: '100%', clipPath: 'inset(0)' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 overflow-x-hidden">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10">
          <div>
             <div className="flex items-center space-x-2 mb-2">
                <Zap className="text-[#005eD2] w-4 h-4 fill-current" />
                <span className="text-[#ff1d1d] font-bold tracking-[0.2em] uppercase text-xs">Visual Archive</span>
             </div>
             <h3 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight">
               Inside <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005eD2] to-[#ff1d1d]">The Lab</span>
             </h3>
          </div>
          
          <div className="mt-6 md:mt-0 flex gap-3">
             <button className="text-slate-500 hover:text-[#005eD2] font-medium text-sm transition-colors">
                View All
             </button>
             <button className="flex items-center space-x-2 bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-[#005eD2] transition-all shadow-lg hover:shadow-blue-500/30">
                <Instagram size={14} />
                <span className="font-bold text-xs uppercase tracking-wide">Follow Us</span>
             </button>
          </div>
        </div>

        {/* Bento Grid
           - grid-cols-2 (mobile) to md:grid-cols-6 (desktop) for finer control
           - auto-rows-[160px] reduces the height of each block, making tiles smaller
           - gap-3 creates a tighter, cleaner look
        */}
        <div className="grid grid-cols-2 md:grid-cols-6 auto-rows-[160px] gap-3 overflow-x-hidden w-full">
          {gridItems.map((item, index) => (
             <GalleryItem 
               key={item.id} 
               item={item.image} 
               span={item.span}
               priority={index < 3} // Prioritize first 3 visible images
             />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Gallery;