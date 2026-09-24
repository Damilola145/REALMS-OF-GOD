import React from 'react';
import { 
  Heart, 
  Mail, 
  Phone 
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onOpenDonate: () => void;
  onOpenReceipts?: () => void;
  onOpenNominate?: () => void;
  onOpenAbout?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenDonate,
  onOpenAbout,
}) => {
  return (
    <footer className="bg-[#0B1E37] text-slate-200 border-t border-[#173760]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-[#1A3860]">
          
          {/* Column 1: Organization & Identity */}
          <div className="lg:col-span-5 space-y-4">
            <BrandLogo size="md" variant="horizontal" theme="light-on-dark" />

            <p className="text-xs text-slate-400 leading-relaxed font-normal max-w-md">
              A registered non-governmental Christian benevolence ministry dedicated to sustaining struggling ministers of the gospel, underfunded evangelists, and the surviving widows and orphans of faithful pastors across Nigeria.
            </p>
          </div>

          {/* Column 2: Quick Links & Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#F6864C]">
              Relief Programs & Story
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a href="#outreach-story" className="hover:text-white transition-colors">Field Encounters & Presence</a>
              </li>
              <li>
                <a href="#stories" className="hover:text-white transition-colors">Emergency Medical Fund</a>
              </li>
              <li>
                <a href="#stories" className="hover:text-white transition-colors">Widow Tailoring Grants</a>
              </li>
              <li>
                <a href="#stories" className="hover:text-white transition-colors">Orphan School Scholarships</a>
              </li>
              <li>
                <a href="#stories" className="hover:text-white transition-colors">Frontier Evangelist Aid</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Field Contact & Support */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#F6864C]">
              Official Secretariat
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#F6864C] shrink-0" />
                <a href="mailto:relief@realmsofgodministry.org" className="hover:text-white">relief@realmsofgodministry.org</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#F6864C] shrink-0" />
                <span>+234 (0) 803 555 7291</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={onOpenDonate}
                className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-[#F6864C] hover:bg-[#e07238] active:bg-[#c95f29] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 fill-white text-white" />
                <span>Make a Benevolence Gift</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Security Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-normal">
          <div>
            &copy; {new Date().getFullYear()} Realms of God Ministry. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Constitution &amp; Bylaws</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
