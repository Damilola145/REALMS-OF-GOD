/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BeneficiaryStoriesSection } from './components/BeneficiaryStoriesSection';
import { QuickDonationSection } from './components/QuickDonationSection';
import { BeneficiaryDetailModal } from './components/BeneficiaryDetailModal';
import { DonationGatewayModal } from './components/DonationGatewayModal';
import { ReceiptViewModal } from './components/ReceiptViewModal';
import { EmailSimulatorModal } from './components/EmailSimulatorModal';
import { DonorPortalModal } from './components/DonorPortalModal';
import { ImpactTransparencySection } from './components/ImpactTransparencySection';
import { BlogPostModal } from './components/BlogPostModal';
import { TestimonialsSection } from './components/TestimonialsSection';
import { NominateMinisterModal } from './components/NominateMinisterModal';
import { PrayerWallSection } from './components/PrayerWallSection';
import { FieldOutreachSpotlightSection } from './components/FieldOutreachSpotlightSection';
import { ImpactMetricsSection } from './components/ImpactMetricsSection';
import { AboutMinistryModal } from './components/AboutMinistryModal';
import { Footer } from './components/Footer';

import { 
  INITIAL_BENEFICIARIES, 
  BLOG_POSTS, 
  TESTIMONIALS, 
  INITIAL_PRAYER_BLESSINGS 
} from './data/mockData';
import { Beneficiary, BlogPost, DonationRecord, MinisterNomination } from './types';
import { formatCurrency } from './utils/receiptGenerator';

export default function App() {
  // State
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>(INITIAL_BENEFICIARIES);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Modals
  const [selectedBeneficiaryDetail, setSelectedBeneficiaryDetail] = useState<Beneficiary | null>(null);
  
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [donateBeneficiaryId, setDonateBeneficiaryId] = useState<string | undefined>(undefined);
  const [presetDonateAmount, setPresetDonateAmount] = useState<number | undefined>(undefined);

  const [activeReceipt, setActiveReceipt] = useState<DonationRecord | null>(null);
  const [activeEmailPreview, setActiveEmailPreview] = useState<DonationRecord | null>(null);
  const [isDonorPortalOpen, setIsDonorPortalOpen] = useState(false);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [isNominateOpen, setIsNominateOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Notification Banner
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4500);
  };

  const handleOpenDonate = (beneficiaryId?: string, beneficiaryName?: string, presetAmount?: number) => {
    setDonateBeneficiaryId(beneficiaryId);
    setPresetDonateAmount(presetAmount);
    setIsDonateOpen(true);
  };

  const handleDonationSuccess = (donation: DonationRecord) => {
    // If beneficiary was targeted, update their raised amount and donor count
    if (donation.beneficiaryId) {
      setBeneficiaries((prev) =>
        prev.map((b) => {
          if (b.id === donation.beneficiaryId) {
            return {
              ...b,
              raisedAmount: b.raisedAmount + donation.amount,
              donorsCount: b.donorsCount + 1,
            };
          }
          return b;
        })
      );
    }

    // Open receipt modal right after donation
    setActiveReceipt(donation);
    showNotification(`Thank you! Your donation of ${formatCurrency(donation.totalCharged, donation.currency)} was processed and Receipt #${donation.receiptNumber} generated.`);
  };

  const handleNominationSubmitted = (nomination: MinisterNomination) => {
    showNotification(`Nomination for ${nomination.nomineeName} received. Our field presbytery will begin confidential vetting.`);
  };

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[#0B1E37] selection:bg-[#F6864C] selection:text-white">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-14 right-4 z-50 bg-[#0B1E37] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#F6864C] text-xs sm:text-sm font-medium flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F6864C] animate-ping" />
          <span className="text-white">{notification}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        onOpenDonate={() => handleOpenDonate()}
        onOpenReceipts={() => setIsDonorPortalOpen(true)}
        onOpenNominate={() => setIsNominateOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Hero Section with Live Giving Widget */}
      <HeroSection
        onOpenDonate={(bId, bName, amt) => handleOpenDonate(bId, bName, amt)}
        onExploreStories={() => scrollTo('stories')}
      />

      {/* Field Outreach Spotlight: Being Present with Pastors' Widows */}
      <FieldOutreachSpotlightSection
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenDonate={() => handleOpenDonate()}
      />

      {/* Live Impact Metrics (₦48.6M+, 184+, 420+, 100%) */}
      <ImpactMetricsSection />

      {/* Prospective Beneficiary Stories Directory */}
      <BeneficiaryStoriesSection
        beneficiaries={beneficiaries}
        onSelectBeneficiary={(b) => setSelectedBeneficiaryDetail(b)}
        onDonateToBeneficiary={(b) => handleOpenDonate(b.id, b.name)}
      />

      {/* Direct Giving & Immediate Benevolence Section */}
      <QuickDonationSection
        onOpenDonate={(bId, bName, amt) => handleOpenDonate(bId, bName, amt)}
      />

      {/* Impact & Financial Accountability Section */}
      <ImpactTransparencySection />

      {/* Testimonials & Words of Gratitude */}
      <TestimonialsSection
        testimonials={TESTIMONIALS}
        onOpenDonate={() => handleOpenDonate()}
      />

      {/* Footer */}
      <Footer
        onOpenDonate={() => handleOpenDonate()}
        onOpenReceipts={() => setIsDonorPortalOpen(true)}
        onOpenNominate={() => setIsNominateOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* MODALS */}
      {/* 1. Beneficiary Detail Full Biography Modal */}
      {selectedBeneficiaryDetail && (
        <BeneficiaryDetailModal
          beneficiary={selectedBeneficiaryDetail}
          onClose={() => setSelectedBeneficiaryDetail(null)}
          onDonate={(b) => {
            setSelectedBeneficiaryDetail(null);
            handleOpenDonate(b.id, b.name);
          }}
        />
      )}

      {/* 2. Interactive Donation Gateway Modal */}
      <DonationGatewayModal
        isOpen={isDonateOpen}
        onClose={() => {
          setIsDonateOpen(false);
          setDonateBeneficiaryId(undefined);
          setPresetDonateAmount(undefined);
        }}
        beneficiaries={beneficiaries}
        selectedBeneficiaryId={donateBeneficiaryId}
        presetAmount={presetDonateAmount}
        onDonationSuccess={handleDonationSuccess}
      />

      {/* 3. Official 501(c)(3) Tax Receipt Modal */}
      {activeReceipt && (
        <ReceiptViewModal
          donation={activeReceipt}
          onClose={() => setActiveReceipt(null)}
          onOpenEmailPreview={(don) => {
            setActiveReceipt(null);
            setActiveEmailPreview(don);
          }}
        />
      )}

      {/* 4. Automated Email Receipt Simulator Modal */}
      {activeEmailPreview && (
        <EmailSimulatorModal
          donation={activeEmailPreview}
          onClose={() => setActiveEmailPreview(null)}
          onViewOfficialReceipt={(don) => {
            setActiveEmailPreview(null);
            setActiveReceipt(don);
          }}
        />
      )}

      {/* 5. Donor Receipts Ledger & Portal */}
      <DonorPortalModal
        isOpen={isDonorPortalOpen}
        onClose={() => setIsDonorPortalOpen(false)}
        onSelectReceipt={(rec) => {
          setIsDonorPortalOpen(false);
          setActiveReceipt(rec);
        }}
        onDonateAgain={() => {
          setIsDonorPortalOpen(false);
          handleOpenDonate();
        }}
      />

      {/* 6. Blog Post Reader Modal */}
      {selectedBlogPost && (
        <BlogPostModal
          post={selectedBlogPost}
          onClose={() => setSelectedBlogPost(null)}
          onOpenDonate={() => {
            setSelectedBlogPost(null);
            handleOpenDonate();
          }}
        />
      )}

      {/* 7. Nominate a Minister in Need Modal */}
      <NominateMinisterModal
        isOpen={isNominateOpen}
        onClose={() => setIsNominateOpen(false)}
        onSubmitted={handleNominationSubmitted}
      />

      {/* 8. About Realms of God Ministry & 1-Year Journey Modal */}
      <AboutMinistryModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        onOpenDonate={() => handleOpenDonate()}
        onOpenNominate={() => setIsNominateOpen(true)}
      />

    </div>
  );
}
