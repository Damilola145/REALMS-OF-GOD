import React, { useState } from 'react';
import { 
  X, 
  UserPlus, 
  ShieldCheck, 
  CheckCircle2
} from 'lucide-react';
import { BeneficiaryCategory, MinisterNomination } from '../types';

interface NominateMinisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitted: (nomination: MinisterNomination) => void;
}

export const NominateMinisterModal: React.FC<NominateMinisterModalProps> = ({
  isOpen,
  onClose,
  onSubmitted,
}) => {
  const [nomineeName, setNomineeName] = useState('');
  const [category, setCategory] = useState<BeneficiaryCategory>('pastor');
  const [location, setLocation] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [churchAffiliation, setChurchAffiliation] = useState('');
  const [currentStruggle, setCurrentStruggle] = useState('');
  const [urgentMedicalNeeds, setUrgentMedicalNeeds] = useState('');
  const [estimatedFinancialNeed, setEstimatedFinancialNeed] = useState('');

  const [submitterName, setSubmitterName] = useState('');
  const [submitterRole, setSubmitterRole] = useState('');
  const [submitterEmail, setSubmitterEmail] = useState('');
  const [submitterPhone, setSubmitterPhone] = useState('');

  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomineeName || !currentStruggle || !submitterEmail) {
      alert('Please fill in the required fields to submit this nomination.');
      return;
    }

    const nomination: MinisterNomination = {
      id: 'nom-' + Date.now(),
      nomineeName,
      category,
      location,
      contactNumber,
      churchAffiliation,
      currentStruggle,
      urgentMedicalNeeds,
      estimatedFinancialNeed: parseFloat(estimatedFinancialNeed) || 0,
      submitterName,
      submitterRole,
      submitterEmail,
      submitterPhone,
      status: 'Received',
      submittedAt: new Date().toLocaleDateString()
    };

    onSubmitted(nomination);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-base sm:text-lg text-[#0B1E37]">
              Nominate a Minister, Widow, or Orphan
            </h3>
            <p className="text-[11px] text-slate-600 font-mono">
              Confidential Verification by Regional Field Presbyters
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-600 hover:text-[#0B1E37] hover:bg-slate-200/50 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 bg-white/70">
          {isSuccess ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-600 border border-[#F6864C] flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-lg text-[#0B1E37]">
                Nomination Successfully Logged
              </h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto font-light leading-relaxed">
                Thank you for bringing this case to our attention. Our field oversight team will review the details and initiate respectful direct verification.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#0B1E37] flex items-start gap-2 font-light">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-600 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-relaxed">
                  <strong className="font-bold text-[#0B1E37]">Confidentiality Protocol:</strong> All personal health records and financial distress details are treated with utmost privacy and dignity during verification.
                </span>
              </div>

              {/* SECTION 1: NOMINEE DETAILS */}
              <div className="space-y-3">
                <h4 className="font-mono text-xs uppercase tracking-wider text-slate-600 font-bold border-b border-slate-200 pb-1">
                  1. Nominee Details
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-[#0B1E37] mb-1 font-semibold">
                      Full Name of Nominee *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Pastor John Doe / Sister Mary..."
                      value={nomineeName}
                      onChange={(e) => setNomineeName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white/40 text-[#0B1E37] focus:outline-none focus:ring-2 focus:ring-[#F6864C] focus:bg-white placeholder:text-slate-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#0B1E37] mb-1 font-semibold">
                      Beneficiary Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as BeneficiaryCategory)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white/40 text-[#0B1E37] focus:outline-none focus:ring-2 focus:ring-[#F6864C] focus:bg-white"
                    >
                      <option value="pastor">Struggling Pastor</option>
                      <option value="widow">Widow of a Pastor</option>
                      <option value="orphan">Orphan(s) of a Minister</option>
                      <option value="evangelist">Rural / Frontier Evangelist</option>
                      <option value="emergency_medical">Emergency Medical Crisis</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-[#0B1E37] mb-1 font-semibold">
                      Location / Region *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Oyo State, Rural Outpost..."
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white/40 text-[#0B1E37] focus:outline-none focus:ring-2 focus:ring-[#F6864C] focus:bg-white placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#0B1E37] mb-1 font-semibold">
                      Church Affiliation
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Baptist, Independent..."
                      value={churchAffiliation}
                      onChange={(e) => setChurchAffiliation(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white/40 text-[#0B1E37] focus:outline-none focus:ring-2 focus:ring-[#F6864C] focus:bg-white placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#0B1E37] mb-1 font-semibold">
                    Describe Critical Need & Hardship *
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe their ministry service, living conditions, hospital needs, or family situation..."
                    value={currentStruggle}
                    onChange={(e) => setCurrentStruggle(e.target.value)}
                    className="w-full p-3 text-xs rounded-xl border border-slate-200 bg-white/40 text-[#0B1E37] focus:outline-none focus:ring-2 focus:ring-[#F6864C] focus:bg-white placeholder:text-slate-400"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-[#0B1E37] mb-1 font-semibold">
                      Estimated Need Amount (USD)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 1500"
                      value={estimatedFinancialNeed}
                      onChange={(e) => setEstimatedFinancialNeed(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white/40 text-[#0B1E37] focus:outline-none focus:ring-2 focus:ring-[#F6864C] focus:bg-white placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#0B1E37] mb-1 font-semibold">
                      Nominee Contact Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      placeholder="+234 ... / +1 ..."
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white/40 text-[#0B1E37] focus:outline-none focus:ring-2 focus:ring-[#F6864C] focus:bg-white placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: SUBMITTER DETAILS */}
              <div className="space-y-3 pt-2">
                <h4 className="font-mono text-xs uppercase tracking-wider text-slate-600 font-bold border-b border-slate-200 pb-1">
                  2. Submitter Contact (For Field Verification)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-[#0B1E37] mb-1 font-semibold">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Pastor Samuel..."
                      value={submitterName}
                      onChange={(e) => setSubmitterName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white/40 text-[#0B1E37] focus:outline-none focus:ring-2 focus:ring-[#F6864C] focus:bg-white placeholder:text-slate-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#0B1E37] mb-1 font-semibold">
                      Relationship to Nominee
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Fellow Pastor, Deacon..."
                      value={submitterRole}
                      onChange={(e) => setSubmitterRole(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white/40 text-[#0B1E37] focus:outline-none focus:ring-2 focus:ring-[#F6864C] focus:bg-white placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-[#0B1E37] mb-1 font-semibold">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      placeholder="youremail@example.com"
                      value={submitterEmail}
                      onChange={(e) => setSubmitterEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white/40 text-[#0B1E37] focus:outline-none focus:ring-2 focus:ring-[#F6864C] focus:bg-white placeholder:text-slate-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#0B1E37] mb-1 font-semibold">
                      Your Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={submitterPhone}
                      onChange={(e) => setSubmitterPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white/40 text-[#0B1E37] focus:outline-none focus:ring-2 focus:ring-[#F6864C] focus:bg-white placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-[#F6864C] hover:bg-[#0B1E37] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer border border-[#F6864C]/50"
                >
                  <UserPlus className="w-3.5 h-3.5 text-[#F6864C]" />
                  <span>Submit Nomination for Presbyterial Review</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
