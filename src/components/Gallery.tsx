import { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Instagram, Zap } from 'lucide-react';

type ImageItem = {
  id: string;
  src: string;
  category: string;
  title: string;
  importer?: () => Promise<string>;
};

type LayoutConfig = {
  id: string;
  span: string;
  height: string;
  image?: ImageItem;
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

// Define the Bento Grid Layout
// spans define how much space each item takes (col-span, row-span)
const layoutConfig: Omit<LayoutConfig, 'image'>[] = [
  { id: 'slot-1', span: 'md:col-span-2 md:row-span-2', height: 'h-64 md:h-full' }, // Big Feature (Top Left)
  { id: 'slot-2', span: 'md:col-span-1 md:row-span-1', height: 'h-64' },            // Standard
  { id: 'slot-3', span: 'md:col-span-1 md:row-span-1', height: 'h-64' },            // Standard
  { id: 'slot-4', span: 'md:col-span-1 md:row-span-2', height: 'h-64 md:h-full' }, // Tall Feature (Right)
  { id: 'slot-5', span: 'md:col-span-2 md:row-span-1', height: 'h-64' },            // Wide
  { id: 'slot-6', span: 'md:col-span-1 md:row-span-1', height: 'h-64' },            // Standard
];

const GalleryItem = ({ item, config, priority = false }: { item: ImageItem; config: Omit<LayoutConfig, 'image'>; priority?: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [loadedSrc, setLoadedSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
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
        rootMargin: priority ? '0px' : '100px', // Load priority images immediately, others when 100px away
        threshold: 0.1,
      }
    );

    observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, [loadedSrc, priority]);

  // Load image when visible or if priority
  useEffect(() => {
    if (item.importer && !loadedSrc && (isVisible || priority)) {
      setIsLoading(true);
      item.importer()
        .then(src => {
          setLoadedSrc(src);
          setIsLoading(false);
        })
        .catch(err => {
          setIsLoading(false);
          if (import.meta.env.DEV) {
            console.error('Failed to load gallery image', err);
          }
        });
    }
  }, [item.importer, loadedSrc, isVisible, priority]);

  return (
    <div 
      ref={itemRef}
      className={`relative group overflow-hidden rounded-3xl bg-slate-100 ${config.span} ${config.height} w-full`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Layer - Smooth Zoom Effect */}
      {loadedSrc ? (
        <img 
          src={loadedSrc} 
          alt={item.title}
          className={`w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "low"}
        />
      ) : (
        <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center" aria-hidden="true">
          {isLoading && (
            <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          )}
        </div>
      )}

      {/* Overlay: Minimalist Dark Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>

      {/* Content Layer */}
      <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end transform transition-transform duration-500">
        
        {/* Category Label - Animated Slide Up */}
        <div className={`overflow-hidden mb-1 transition-all duration-500 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
           <span className="text-[#005eD2] bg-white px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest shadow-sm">
             {item.category}
           </span>
        </div>

        {/* Title & Icon Row */}
        <div className="flex justify-between items-end">
           <h3 className="text-white font-bold text-lg md:text-xl leading-tight drop-shadow-md">
             {item.title}
           </h3>
           
           {/* Corner Arrow Action */}
           <div className={`bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20 transition-all duration-500 ${
              isHovered ? 'bg-[#005eD2] border-[#005eD2] rotate-45' : ''
           }`}>
             <ArrowUpRight className="text-white w-5 h-5" />
           </div>
        </div>
      </div>
    </div>
  );
};

const Gallery = () => {
  // Initialize with images for each layout slot
  const [gridItems, setGridItems] = useState(() => {
    // Shuffle images to show variety
    const shuffled = [...allImages].sort(() => Math.random() - 0.5);
    return layoutConfig.map((config, index) => ({
      ...config,
      image: shuffled[index % shuffled.length] || shuffled[0]
    }));
  });

  // "Live" Swapping Effect - swaps images every 5 seconds
  useEffect(() => {
    if (allImages.length <= layoutConfig.length) {
      return; // Don't swap if we don't have enough images
    }

    const interval = setInterval(() => {
      // Pick a random slot to update
      const randomIndex = Math.floor(Math.random() * gridItems.length);
      
      // Pick a random new image that isn't currently visible
      const visibleIds = new Set(gridItems.map(item => item.image.id));
      const availableImages = allImages.filter(img => !visibleIds.has(img.id));
      
      if (availableImages.length > 0) {
        const newImage = availableImages[Math.floor(Math.random() * availableImages.length)];
        
        setGridItems(prevItems => {
          const newItems = [...prevItems];
          newItems[randomIndex] = { ...newItems[randomIndex], image: newImage };
          return newItems;
        });
      }
    }, 5000); // Swap every 5 seconds

    return () => clearInterval(interval);
  }, [gridItems]);

  return (
    <section id="gallery" className="py-32 bg-white relative overflow-x-hidden">
       {/* Background Decoration - Contained to prevent horizontal scroll */}
       <div className="absolute right-0 top-0 w-1/3 h-full bg-slate-50 -skew-x-12 z-0 opacity-50 origin-top-right" style={{ maxWidth: '100%', transform: 'skewX(-12deg) translateX(0)' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 overflow-x-hidden">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
             <div className="flex items-center space-x-2 mb-3">
                <Zap className="text-[#005eD2] w-4 h-4 fill-current" />
                <span className="text-[#ff1d1d] font-bold tracking-[0.2em] uppercase text-xs">Visual Archive</span>
             </div>
             <h3 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">
               Inside <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005eD2] to-[#ff1d1d]">The Lab</span>
             </h3>
          </div>
          
          <div className="mt-8 md:mt-0 flex gap-4">
             <button className="text-slate-500 hover:text-[#005eD2] font-medium text-sm transition-colors">
                View All
             </button>
             <button className="flex items-center space-x-2 bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-[#005eD2] transition-all shadow-lg hover:shadow-blue-500/30">
                <Instagram size={16} />
                <span className="font-bold text-xs uppercase tracking-wide">Follow Us</span>
             </button>
          </div>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-fr overflow-x-hidden">
          {gridItems.map((item, index) => (
             <GalleryItem 
               key={`${item.id}-${item.image.id}`} // Force re-render for smooth swap
               item={item.image} 
               config={item}
               priority={index < 3} // Prioritize first 3 visible images
             />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Gallery;