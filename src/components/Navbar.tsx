import React, { useState, useEffect } from 'react';
import { 
  Heart 
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  onOpenDonate: (beneficiaryId?: string, beneficiaryName?: string) => void;
  onOpenReceipts?: () => void;
  onOpenNominate?: () => void;
  onOpenAbout?: () => void;
  activeSection?: string;
  setActiveSection?: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenDonate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Main Navigation Bar */}
      <nav 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-md py-2.5' 
            : 'bg-white border-b border-[#E2E8F0] py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Brand */}
          <button 
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2 text-left group focus:outline-none cursor-pointer"
            aria-label="Realms of God Ministry Home"
          >
            <BrandLogo size="md" variant="horizontal" theme="dark-on-light" />
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1.5">
            <button
              onClick={() => onOpenDonate()}
              className="bg-[#F6864C] hover:bg-[#e07238] active:bg-[#c95f29] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>Donate Now</span>
            </button>
          </div>

          {/* Mobile Action */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => onOpenDonate()}
              className="bg-[#F6864C] hover:bg-[#e07238] active:bg-[#c95f29] text-white px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors shadow-xs"
            >
              Donate Now
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

