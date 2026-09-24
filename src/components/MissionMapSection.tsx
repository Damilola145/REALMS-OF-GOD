import React, { useState } from 'react';
import { 
  MapPin, 
  Users, 
  Heart, 
  CheckCircle2, 
  ArrowRight, 
  Activity, 
  Building2, 
  ShieldCheck 
} from 'lucide-react';

interface MissionMapSectionProps {
  onOpenDonate: (beneficiaryId?: string, beneficiaryName?: string) => void;
  onExploreBeneficiaries: () => void;
}

export const MissionMapSection: React.FC<MissionMapSectionProps> = ({
  onOpenDonate,
  onExploreBeneficiaries,
}) => {
  const [selectedZoneId, setSelectedZoneId] = useState<string>('zone-1');

  const zones = [
    {
      id: 'zone-1',
      region: 'Oyo',
      state: 'Oyo, Osun & Ogun Border Settlements',
      category: 'Rural Church Planters & Medical Dialysis',
      activeCases: 4,
      totalDisbursed: '₦14.2M',
      beneficiariesHelped: 48,
      leadCoordinator: 'Rev. Dr. Samuel K. Arthur',
      description: 'Frontier farming communities where pastors serve remote church outposts without regular stipends. Currently coordinating dialysis stabilization for Pastor Emmanuel Adebayo.',
      openNeeds: ['Kidney Dialysis Transport', 'Family Food Security Packs', 'Church Parsonage Well Water'],
      featuredBeneficiaryId: 'ben-01',
      featuredBeneficiaryName: 'Pastor Emmanuel Adebayo'
    },
    {
      id: 'zone-2',
      region: 'Enugub',
      state: 'Enugu, Anambra & Ebonyi Communities',
      category: 'Orphan Scholarships & Widow Empowerment',
      activeCases: 3,
      totalDisbursed: '₦11.8M',
      beneficiariesHelped: 42,
      leadCoordinator: 'Deaconess Martha Osei',
      description: 'Educational sponsorship center for orphaned children of deceased gospel ministers, alongside tailoring livelihood tool grants for surviving pastor widows.',
      openNeeds: ['3 Orphan Tuition Scholarships', 'Industrial Sewing Machines', 'Nutritional Care Boxes'],
      featuredBeneficiaryId: 'ben-04',
      featuredBeneficiaryName: 'Children of Late Pastor David Okafor'
    },
    {
      id: 'zone-3',
      region: 'Middle Belt & Benue Basin',
      state: 'Benue, Plateau & Southern Kaduna Outposts',
      category: 'Crisis Relocation & Parsonage Shelter Restoration',
      activeCases: 3,
      totalDisbursed: '₦9.6M',
      beneficiariesHelped: 36,
      leadCoordinator: 'Pastor Timothy N. Kalu',
      description: 'Emergency shelter rehabilitation and livelihood grants for pastoral families displaced by regional unrest and storm damage.',
      openNeeds: ['Galvanized Roof Repair', 'Poultry Micro-Farm Starter Stock', 'Clean Drinking Water Tank'],
      featuredBeneficiaryId: 'ben-02',
      featuredBeneficiaryName: 'Sister Grace Adebisi'
    },
    {
      id: 'zone-4',
      region: 'Highland Frontier Mission',
      state: 'Eastern Cape & Mountain Outposts',
      category: 'Pioneer Evangelist Mobility & Widows Fund',
      activeCases: 2,
      totalDisbursed: '₦7.4M',
      beneficiariesHelped: 29,
      leadCoordinator: 'Bishop Caleb M. Thorne',
      description: 'Supporting wilderness pioneer evangelists with vehicle engine overhauls and micro-business grants for widowed missionary spouses.',
      openNeeds: ['4x4 Diesel Engine Overhaul', 'Mountain Terrain Tires', '12-Month Housing Lease'],
      featuredBeneficiaryId: 'ben-03',
      featuredBeneficiaryName: 'Evangelist Silas & Miriam Akindele'
    },
    {
      id: 'zone-5',
      region: 'Ashanti & West African Hub',
      state: 'Kumasi & Ashanti Regional Outposts',
      category: 'Frontline Ministers Medical Support',
      activeCases: 2,
      totalDisbursed: '₦5.6M',
      beneficiariesHelped: 29,
      leadCoordinator: 'Elder Jonathan Edwards, CPA',
      description: 'Providing dignified clinical dialysis, medications, and nutritional stipends for ministers who served decades in rural obscurity.',
      openNeeds: ['Clinical Dialysis Care', 'Prescription Meds', 'Living Support'],
      featuredBeneficiaryId: 'ben-01',
      featuredBeneficiaryName: 'Pastor Emmanuel Adebayo'
    }
  ];

  const activeZone = zones.find((z) => z.id === selectedZoneId) || zones[0];

  return (
    <section id="mission-map" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1E37] tracking-tight">
              Where Hope Reaches: Active Mission Zones
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
              Our regional field presbyters inspect every village case in person. Explore our active relief hubs across rural Nigeria and West African frontier mission fields.
            </p>
          </div>

          <button
            onClick={onExploreBeneficiaries}
            className="px-5 py-2.5 rounded-full border border-slate-200 bg-slate-50 text-[#0B1E37] text-xs sm:text-sm font-semibold hover:border-[#F6864C] hover:bg-white transition-all flex items-center gap-1.5 whitespace-nowrap self-start md:self-auto cursor-pointer"
          >
            <span>View All Open Profiles</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
          </button>
        </div>

        {/* Interactive Zone Navigator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Zone Buttons */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
              Select an Active Field Hub
            </span>

            {zones.map((zone) => {
              const isSelected = zone.id === selectedZoneId;
              return (
                <button
                  key={zone.id}
                  onClick={() => setSelectedZoneId(zone.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all flex items-center justify-between gap-4 cursor-pointer ${
                    isSelected
                      ? 'bg-[#0B1E37] text-white border-[#0B1E37] shadow-md ring-2 ring-[#F6864C]'
                      : 'bg-white/80 text-[#0B1E37] border-slate-200 hover:border-[#F6864C] hover:bg-slate-50'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#F6864C]' : 'bg-[#F6864C]'}`} />
                      <h3 className="font-bold text-sm sm:text-base">
                        {zone.region}
                      </h3>
                    </div>
                    <p className={`text-xs ${isSelected ? 'text-white/90' : 'text-slate-600'}`}>
                      {zone.category}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className={`font-serif text-sm sm:text-base font-bold block ${isSelected ? 'text-[#F6864C]' : 'text-[#0B1E37]'}`}>
                      {zone.totalDisbursed}
                    </span>
                    <span className={`text-[10px] uppercase tracking-wider block ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                      Disbursed
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Zone Detailed Card */}
          <div className="lg:col-span-7 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 flex flex-col justify-between space-y-6 shadow-sm">
            
            <div className="space-y-5">
              
              {/* Top Banner */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
                <div>
                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                    Regional Operational Outpost
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#0B1E37] mt-0.5">
                    {activeZone.region}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">
                    {activeZone.state}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-white text-[#0B1E37] font-semibold text-xs border border-slate-200 shadow-2xs">
                    {activeZone.activeCases} Active Open Cases
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-[#0B1E37] text-sm leading-relaxed font-light">
                {activeZone.description}
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-center">
                  <span className="font-serif text-lg sm:text-xl font-bold text-slate-600 block">
                    {activeZone.beneficiariesHelped}
                  </span>
                  <span className="text-[10px] text-slate-600 font-semibold uppercase tracking-wider">
                    Ministers Aided
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-center">
                  <span className="font-serif text-lg sm:text-xl font-bold text-slate-600 block">
                    {activeZone.totalDisbursed}
                  </span>
                  <span className="text-[10px] text-slate-600 font-semibold uppercase tracking-wider">
                    Total Relief Sent
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-center">
                  <span className="font-serif text-lg sm:text-xl font-bold text-slate-600 block">
                    100%
                  </span>
                  <span className="text-[10px] text-slate-600 font-semibold uppercase tracking-wider">
                    Field Audited
                  </span>
                </div>
              </div>

              {/* Priority Needs Pills */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#0B1E37] uppercase tracking-wider block">
                  Priority Needs Under Vetting:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeZone.openNeeds.map((need, i) => (
                    <span key={i} className="px-3 py-1 rounded-xl bg-white text-[#0B1E37] text-xs font-medium border border-slate-200 flex items-center gap-1.5 shadow-2xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-slate-600" />
                      {need}
                    </span>
                  ))}
                </div>
              </div>

              {/* Coordinator */}
              <div className="p-3.5 rounded-2xl bg-[#0B1E37] text-white flex items-center justify-between text-xs border border-[#F6864C]/30">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#F6864C] shrink-0" />
                  <div>
                    <span className="text-[#F6864C] font-medium block text-[10px] uppercase tracking-wider">
                      Regional Field Coordinator
                    </span>
                    <span className="font-bold text-white">
                      {activeZone.leadCoordinator}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] text-slate-300 font-mono">
                  Verified District Presbytery
                </span>
              </div>

            </div>

            {/* Action Row */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-600">
                Help fund critical needs in this zone today
              </span>

              <button
                onClick={() => onOpenDonate(activeZone.featuredBeneficiaryId, activeZone.featuredBeneficiaryName)}
                className="px-5 py-2.5 rounded-2xl bg-[#F6864C] hover:bg-[#0B1E37] text-white font-bold text-xs transition-all flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 fill-white text-[#F6864C]" />
                <span>Sponsor {activeZone.featuredBeneficiaryName.split(' ')[0]}'s Region</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
