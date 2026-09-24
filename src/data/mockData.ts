import { Beneficiary, BlogPost, Testimonial, PrayerBlessing } from '../types';

import bishopPastorImg from '../assets/images/bishop_pastor_1788514831496.jpg';
import mamaEuniceImg from '../assets/images/mama_eunice_1788514851885.jpg';
import pastorTimothyImg from '../assets/images/pastor_timothy_1788514868493.jpg';
import ruralPastorsBlogImg from '../assets/images/rural_pastors_1788514883883.jpg';
import widowTailoringBlogImg from '../assets/images/widow_tailoring_1788514900296.jpg';
import auditStewardshipBlogImg from '../assets/images/audit_stewardship_1788514915510.jpg';

export const INITIAL_BENEFICIARIES: Beneficiary[] = [
  {
    id: 'ben-01',
    caseCode: 'ROGM-OYO-2026-081',
    presbyteryDistrict: 'Oyo Hinterlands Presbytery & UCH Registry',
    name: 'Pastor Emmanuel Adebayo',
    category: 'pastor',
    roleTitle: 'Rural Church Planter (24 Years Service)',
    location: 'Oyo State Hinterlands & Border Communities',
    yearsInMinistry: 24,
    familyMembersCount: 5,
    urgent: true,
    targetAmount: 3500000,
    raisedAmount: 2650000,
    donorsCount: 42,
    shortSummary: 'Dedicated minister serving remote agrarian villages without regular stipends, currently facing sudden kidney failure and needing urgent dialysis & medical stabilization.',
    fullStory: [
      'Pastor Emmanuel has faithfully planted and nurtured 6 rural congregations over 24 years, often trekking miles on foot to bring comfort, the gospel, and humanitarian relief to forgotten farming villages in Oyo State.',
      'Three months ago, severe exhaustion led to a clinical diagnosis of advanced kidney illness. With zero health insurance, no denominational pension, and a small congregation of subsistence farmers unable to bear the medical costs, his family is under extreme financial distress.',
      'The Realm of God Ministry field team visited Pastor Emmanuel and verified all clinical prescriptions. Funds raised go directly toward his 6-month dialysis protocol, emergency medications, and basic nutritional sustenance for his wife and children while he recovers.'
    ],
    immediateNeeds: [
      'Bi-weekly clinical dialysis sessions',
      'Hypertension & kidney maintenance medications',
      'Family food basket & shelter security for 6 months',
      'Transportation to University College Hospital (UCH) Ibadan'
    ],
    financialBreakdown: [
      { item: '6-Month Hospital Dialysis Sessions', cost: 1800000 },
      { item: 'Prescription Pharmaceuticals', cost: 850000 },
      { item: 'Family Nutritional & Living Stipend', cost: 600000 },
      { item: 'Emergency Clinical Travel Logistics', cost: 250000 }
    ],
    verificationStatus: 'Medical Board Verified',
    verifiedDate: 'August 14, 2026',
    updates: [
      {
        date: 'August 24, 2026',
        title: 'Second Dialysis Cycle Completed',
        note: 'Thanks to early contributions, Pastor Emmanuel successfully underwent his second dialysis treatment. Doctors report his blood pressure is stabilizing.'
      }
    ]
  },
  {
    id: 'ben-02',
    caseCode: 'ROGM-OGN-2026-042',
    presbyteryDistrict: 'Ogun Frontier Presbytery Outreach',
    name: 'Sister Grace Adebisi',
    category: 'widow',
    roleTitle: 'Widow of Late Pastor John Adebisi',
    location: 'Ogun State Frontier Outreach',
    yearsInMinistry: 18,
    familyMembersCount: 4,
    urgent: true,
    targetAmount: 2400000,
    raisedAmount: 1750000,
    donorsCount: 31,
    shortSummary: 'Following the sudden passing of her missionary husband, Sister Grace is raising 4 young children and requires emergency rent relief & tailoring equipment to launch a sustainable livelihood.',
    fullStory: [
      'Pastor John Adebisi passed away unexpectedly from a cardiac emergency during an evangelical mission in rural outposts. He left behind his faithful wife Grace and four children ages 5 to 13.',
      'With the pastoral parsonage needed for a new minister, Grace was forced to relocate. She is a skilled seamstress and garment maker, but lacks the capital to purchase commercial sewing machines, fabric rolls, and pay advance rent on a small workshop.',
      'Our ministry has stepped in to ensure Grace and her children do not become destitute. We are providing immediate housing stabilization and funding a sustainable micro-business so she can earn an independent, dignified income to feed and educate her children.'
    ],
    immediateNeeds: [
      '1-Year Housing & Workshop Lease',
      '2 Commercial Industrial Sewing Machines',
      'Bulk Fabric and Haberdashery Starter Stock',
      'Children school uniform & registration fees'
    ],
    financialBreakdown: [
      { item: '12-Month Safe Housing Rent', cost: 1000000 },
      { item: 'Industrial Sewing & Overlock Machines', cost: 750000 },
      { item: 'Textile Inventory Starter Kit', cost: 350000 },
      { item: 'School Fees & Supplies for 4 Children', cost: 300000 }
    ],
    verificationStatus: 'Fully Verified by District Presbytery',
    verifiedDate: 'August 18, 2026',
    updates: [
      {
        date: 'August 28, 2026',
        title: 'Temporary Shelter Secured',
        note: 'Grace has moved into a secure interim rental close to the elementary school. Tailoring vendor quotes have been officially finalized.'
      }
    ]
  },
  {
    id: 'ben-03',
    caseCode: 'ROGM-PLT-2026-019',
    presbyteryDistrict: 'Plateau & Middle Belt Outpost Council',
    name: 'Evangelist Silas & Miriam Akindele',
    category: 'evangelist',
    roleTitle: 'Pioneer Wilderness Evangelists',
    location: 'Plateau & Middle Belt Outposts',
    yearsInMinistry: 16,
    familyMembersCount: 3,
    urgent: false,
    targetAmount: 2850000,
    raisedAmount: 1950000,
    donorsCount: 27,
    shortSummary: 'Frontier missionaries whose rugged ministry terrain vehicle engine seized, halting vital weekly humanitarian food distribution and Sunday school outreach to 14 isolated hill settlements.',
    fullStory: [
      'For sixteen years, Silas and Miriam have brought hope, basic medical supplies, and the Word of God to remote highland settlements with no paved roads. Their old 4x4 pickup truck has been the lifeline for hundreds of villagers.',
      'Last month, the truck suffered catastrophic engine block failure in rough terrain. Without this vehicle, outreach to 14 villages has come to a standstill, and elderly villagers cannot receive their monthly ration deliveries.',
      'This campaign provides an overhauled diesel engine replacement, heavy-duty all-terrain suspension repair, and fuel support to immediately restart the mission routes.'
    ],
    immediateNeeds: [
      'Rebuilt diesel engine block & transmission',
      'Heavy-duty all-terrain tires (set of 4)',
      '3-Month community outreach fuel allowance',
      'Replacement Bible & relief supplies storage box'
    ],
    financialBreakdown: [
      { item: 'Engine & Gearbox Replacement', cost: 1750000 },
      { item: 'Heavy-Duty Mountain Tires & Suspension', cost: 600000 },
      { item: 'Outreach Logistics & Essential Aid Cargo', cost: 500000 }
    ],
    verificationStatus: 'Field Inspector Verified',
    verifiedDate: 'August 05, 2026'
  },
  {
    id: 'ben-04',
    caseCode: 'ROGM-ENG-2026-063',
    presbyteryDistrict: 'Enugu Presbytery Orphan Welfare Committee',
    name: 'Children of Late Pastor David Okafor',
    category: 'orphan',
    roleTitle: '3 Orphaned Siblings (Ages 8, 11, 14)',
    location: 'Enugu State Community',
    yearsInMinistry: 0,
    familyMembersCount: 3,
    urgent: true,
    targetAmount: 2100000,
    raisedAmount: 1920000,
    donorsCount: 49,
    shortSummary: 'Three bright young children left behind after both parents passed away in active ministry service. Funds cover 1 full academic year of schooling, boarding safety, and nutritional security.',
    fullStory: [
      'Pastor David Okafor served as an itinerant preacher and church planter for 19 years before succumbing to illness. His wife had passed two years prior from childbirth complications.',
      'Their three surviving children—Chisom (14), Daniel (11), and Joy (8)—are currently under the loving care of their elderly grandmother in Enugu, who has no retirement pension.',
      'Our Orphan Care Initiative guarantees that David\'s children are not forced out of school. We are financing their tuition, uniforms, textbooks, daily meals, and health checks for the entire upcoming school year.'
    ],
    immediateNeeds: [
      'Annual primary & secondary school tuition for 3 kids',
      'School uniforms, shoes, backpacks, and study books',
      'Daily nutritional meal basket support for grandma',
      'Pediatric medical and dental clearance'
    ],
    financialBreakdown: [
      { item: 'Annual Tuition & Examination Registrations', cost: 1100000 },
      { item: 'Books, Uniforms, & Educational Kits', cost: 350000 },
      { item: 'Monthly Household Food & Grocery Care Box', cost: 500000 },
      { item: 'Healthcare & Emergency Clinic Buffer', cost: 150000 }
    ],
    verificationStatus: 'Fully Verified by District Presbytery',
    verifiedDate: 'August 12, 2026'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-01',
    title: 'The Silent Sacrifice: Why So Many Rural Pastors Face Extreme Hardship',
    slug: 'the-silent-sacrifice-rural-pastors',
    category: 'Ministry Impact',
    excerpt: 'Behind every faithful rural pulpit lies a minister who frequently skips meals, walks without medical coverage, and ministers in silence. Here is how our covenant of care changes lives.',
    content: [
      'In many remote agrarian villages across Nigeria, thousands of pastors wake up before dawn to serve congregations of subsistence farmers and struggling families. Unlike metropolitan churches with established payrolls and health benefits, these frontline ministers often receive less than ₦25,000 a month in irregular love offerings.',
      'When an emergency strikes—a severe illness, a house fire, or the sudden loss of a spouse—the pastor is left with no financial cushion. Because of the cultural expectation that pastors must always be "strong providers," many suffer in silence for fear of burdening their flock.',
      'At The Realm of God Ministry, we believe in the biblical mandate of 1 Timothy 5:17 and Galatians 6:6. We believe the body of Christ must stand as a safety net for those who pour out their lives for the Kingdom.',
      'Through our systematic verification network and direct-to-beneficiary benevolence fund, we ensure that no faithful minister of the gospel is left to fight catastrophic medical crises or starvation alone.'
    ],
    author: {
      name: 'Rev. Dr. Samuel K. Adeyemi',
      role: 'Director of Pastoral Care & Field Vetting',
      avatar: bishopPastorImg
    },
    date: 'August 26, 2026',
    readTime: '4 min read',
    coverImage: ruralPastorsBlogImg,
    tags: ['Pastoral Care', 'Biblical Giving', 'Frontline Ministers', 'Field Updates'],
    scriptureAnchor: '“Let him who is taught the word share in all good things with him who teaches.” — Galatians 6:6'
  },
  {
    id: 'blog-02',
    title: 'Pure Religion in Action: Restoring Hope to the Widows of Departed Preachers',
    slug: 'pure-religion-pastor-widows-empowerment',
    category: 'Widow Care',
    excerpt: 'When a pastor passes away, his widow often loses both her life partner and the church housing simultaneously. Learn how our Widow Livelihood Grant creates lasting self-sufficiency.',
    content: [
      'James 1:27 defines pure and undefiled religion before God as visiting orphans and widows in their distress. Yet across many mission fields, when a pastor passes away unexpectedly, the surviving widow faces an immediate double trauma.',
      'In addition to grief, she is frequently asked to vacate the ministry residence to make way for the incoming minister. Without established savings or commercial trade skills, these mothers face sudden destitution with young children to feed.',
      'Our approach moves beyond temporary food handouts to sustainable empowerment. Through our "Widow Hope Grant," we combine 12 months of secured rental housing with seed capital for tailored small businesses—such as grocery kiosks, tailoring enterprises, and poultry micro-farms.',
      'Last year alone, 34 pastors\' widows achieved 100% financial self-reliance through this model, providing stable education for 82 children.'
    ],
    author: {
      name: 'Deaconess Martha Olufemi',
      role: 'Head of Widows & Orphans Initiative',
      avatar: mamaEuniceImg
    },
    date: 'August 21, 2026',
    readTime: '5 min read',
    coverImage: widowTailoringBlogImg,
    tags: ['Widow Empowerment', 'Micro-business', 'Orphan Care', 'Financial Dignity'],
    scriptureAnchor: '“Religion that God our Father accepts as pure and faultless is this: to look after orphans and widows in their distress...” — James 1:27'
  },
  {
    id: 'blog-03',
    title: 'Financial Integrity & 100% Transparency: How We Audit Every Naira Given',
    slug: 'financial-integrity-and-donor-transparency',
    category: 'Biblical Stewardship',
    excerpt: 'Trust is sacred. Here is a transparent look into our 4-stage vetting framework, direct hospital invoice settlements, and open financial receipts system.',
    content: [
      'In a world where donors are rightfully cautious about non-profit administrative waste, The Realm of God Ministry was founded upon uncompromised financial transparency and godly stewardship.',
      'We do not disburse cash blindly. Every prospective beneficiary case undergoes a rigorous 4-step verification protocol: (1) Presbytery or Denominational confirmation of ministerial standing, (2) Field inspector in-person home or hospital visit, (3) Direct settlement of hospital/landlord/vendor invoices rather than cash transfers, and (4) Quarterly progress tracking.',
      'Furthermore, 100% of designated gifts are routed strictly to the specific minister or widow specified by the donor, accompanied by instant automated tax receipts and direct impact reporting.'
    ],
    author: {
      name: 'Elder Jonathan Babatunde, FCA',
      role: 'Chief Compliance & Oversight Officer',
      avatar: pastorTimothyImg
    },
    date: 'August 15, 2026',
    readTime: '3 min read',
    coverImage: auditStewardshipBlogImg,
    tags: ['Accountability', 'Tax Receipts', 'Audited Stewardship', 'Vetting Protocol'],
    scriptureAnchor: '“Providing for honest things, not only in the sight of the Lord, but also in the sight of men.” — 2 Corinthians 8:21'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-02',
    name: 'Mama Eunice Adebisi',
    role: 'Widow of Late Rev. Daniel Adebisi',
    churchOrRegion: 'Ogun / Lagos District',
    category: 'WIDOW',
    quote: 'My late husband gave 30 years to rural ministry. When he died, I thought my children would drop out of school. The Realm of God Ministry gave us shelter and funded our grocery store.',
    fullTestimony: 'Losing my husband broke our world. But this ministry reminded me that God is truly the Husband to the widow and Father to the fatherless. They paid two years of rent for our home, covered my daughter\'s nursing school tuition, and stocked my provisions shop. I now earn enough to support my family and even help other widows in our local church.',
    avatar: '/Lady1.jpg',
    yearAssisted: '2025',
    aidType: 'Housing Rent & Micro-Store Startup'
  },
  {
    id: 'test-01',
    name: 'Mrs. Deborah Alabi',
    role: 'Widow of Late Pastor Stephen Alabi',
    churchOrRegion: 'Kogi / Benue Field Mission',
    category: 'WIDOW',
    quote: 'When my husband passed while pioneering a village church, we were left with empty hands. The Realm of God Ministry wrapped us in love, cleared our children\'s school arrears, and bought industrial sewing machines for my tailoring workshop.',
    fullTestimony: 'My late husband gave his entire life preaching across remote mission outposts. When sickness took him, the isolation and grief were unbearable. Then the Realm of God team arrived at our home. They didn\'t just speak comforting words—they cleared our children\'s school fees for two full academic sessions, provided nutritional food packs, and fully equipped my fashion design and tailoring workshop. Today, my daughters are back in class, and my business is thriving. We are living proof that God never abandons the family of His servants!',
    avatar: '/Lady2.jpg',
    yearAssisted: '2025',
    aidType: 'Orphan Education & Tailoring Enterprise Startup'
  },
  {
    id: 'test-03',
    name: 'Bishop Caleb O. Babatunde',
    role: 'Regional Overseer & Ministry Partner',
    churchOrRegion: 'United Evangelical Fellowship, Nigeria',
    category: 'Partner Church',
    quote: 'There is no ministry doing this level of compassionate, verified, direct-impact benevolence for frontline ministers. Every partner contribution is accounted for with absolute purity.',
    fullTestimony: 'I have personally inspected over twenty beneficiary cases handled by The Realm of God Ministry. Their speed of response in medical emergencies and their meticulous verification standards are unmatched. When our church network designates offerings here, we know every kobo directly lifts a suffering servant of God.',
    avatar: '/Missionary.jpg',
    yearAssisted: '2026 Partner',
    aidType: 'Institutional Ministry Partner'
  }
];

export const INITIAL_PRAYER_BLESSINGS: PrayerBlessing[] = [
  {
    id: 'pb-01',
    donorName: 'David & Sarah Jenkins',
    location: 'Dallas, TX',
    forWhom: 'Pastor Emmanuel Adebayo',
    message: 'Pastor Emmanuel, we are praying for complete cellular regeneration in your kidneys! The Lord who called you to the remote fields will sustain your strength and finish your course with joy.',
    scriptureRef: 'Isaiah 40:31',
    heartsCount: 28,
    createdAt: '2 hours ago'
  },
  {
    id: 'pb-02',
    donorName: 'Grace Community Fellowship',
    location: 'London, UK',
    forWhom: 'Sister Grace Adebisi & Family',
    message: 'Sister Grace, we stand with you and your 4 precious children. God is your fortress and provider. May the tailoring shop flourish beyond your highest expectations!',
    scriptureRef: 'Psalm 68:5',
    heartsCount: 34,
    createdAt: '5 hours ago'
  },
  {
    id: 'pb-03',
    donorName: 'Dr. Michael & Esther Chen',
    location: 'Toronto, Canada',
    forWhom: 'Children of Pastor David Okafor',
    message: 'To Chisom, Daniel, and little Joy: Your father’s labor in the Lord was never in vain. We are blessed to sponsor your schooling this year. Shine brightly in your studies!',
    scriptureRef: '1 Corinthians 15:58',
    heartsCount: 42,
    createdAt: '1 day ago'
  }
];

