export const navigation = [
  { label: 'Home', href: '/' },
  { 
    label: 'Our Company', 
    href: '/about',
    dropdown: [
      { label: 'ABOUT US', href: '/about' },
      { label: 'VISION & MISSION', href: '/vision-mission' },
      { label: 'R&D', href: '/rnd' },
      { label: 'OUR PARTNER', href: '/our-partner' },
      { label: 'DOCUMENT & DOWNLOAD', href: '/document' }
    ]
  },
  { label: 'Services', href: '/services' },
  { label: 'Product', href: '/product', megaMenu: 'products' },
  { label: 'Projects', href: '/projects', megaMenu: 'projects' },
  { label: 'Artikel', href: '/artikel', megaMenu: 'articles' },
  { label: 'Contact', href: '/contact' }
];

export const heroCards = [
  { icon: 'TbWrench', title: 'AC Sentral', description: 'Chiller, AHU, FCU untuk gedung skala besar' },
  { icon: 'TbWind', title: 'Ventilasi', description: 'Sistem ventilasi mekanis dan alami yang efisien' },
  { icon: 'TbSnowflake', title: 'Cold Room', description: 'Ruang pendingin untuk food & pharmaceutical' },
  { icon: 'TbSettingsAutomation', title: 'BMS/Otomasi', description: 'Building automation & monitoring system' }
];

export const achievements = [
  { icon: 'TbBuildingSkyscraper', value: '800+', label: 'Proyek Selesai' },
  { icon: 'TbUsers', value: '500+', label: 'Klien Puas' },
  { icon: 'TbCertificate', value: '12', label: 'Sertifikasi Brand' },
  { icon: 'TbMap2', value: '20+', label: 'Kota di Indonesia' },
  { icon: 'TbStar', value: '15+', label: 'Tahun Berpengalaman' },
  { icon: 'TbAward', value: '8', label: 'Penghargaan Nasional' }
];

export const brands = [
  { name: 'BRIESE', image: '/brand-briese.png' },
  { name: 'ShitShudo', image: '/3-1-rm0lbl4q6hbnbh1i26ix93j519w36rxakbeg70dfio-removebg-preview.png', style: { width: '190px', maxWidth: 'none', maxHeight: 'none', objectFit: 'contain' } },
  { name: 'MizuAir', image: '/IMG-20241108-WA0019-e1732524764559-rm0lbl4q6hbnbh1i26ix93j519w36rxakbeg70dfio-removebg-preview.png', style: { width: '220px', maxWidth: 'none', maxHeight: 'none', objectFit: 'contain' } },
  { name: 'BOREAS', image: '/brand-boreas.png' },
  { name: 'WarmerHeat', image: '/woao-re50u2ew6r3laj9o5wg0ofsusfrp4mdyl2y2prbwdc-removebg-preview.png', style: { width: '200px', maxWidth: 'none', maxHeight: 'none', objectFit: 'contain' } },
  { name: 'Nichias', image: '/images__1_-removebg-preview.png', style: { width: '200px', maxWidth: 'none', maxHeight: 'none', objectFit: 'contain' } },
  { name: 'ShitShudo WET', image: '/7y-re50u2ew6r3laj9o5wg0ofsusfrp4mdyl2y2prbwdc-removebg-preview.png', style: { width: '200px', maxWidth: 'none', maxHeight: 'none', objectFit: 'contain' } },
  { name: 'ORI', image: '/brand-ori.png' },
  { name: 'YORK', image: '/brand-york.png' },
  { name: 'PANASONIC', image: '/brand-panasonic.png' },
  { name: 'DAIKIN', image: '/brand-daikin.png' }
];

export const services = [
  {
    icon: 'TbAirConditioning',
    title: 'AC Split & VRV/VRF',
    description: 'Instalasi sistem AC split unit, multi split, VRV dan VRF untuk hunian dan gedung komersial dengan brand terkemuka.',
    tags: ['Split System', 'VRV', 'Multi Split']
  },
  {
    icon: 'TbBuilding',
    title: 'AC Sentral Chiller',
    description: 'Perancangan dan instalasi sistem chiller, cooling tower, AHU, dan FCU untuk gedung perkantoran dan pusat perbelanjaan.',
    tags: ['Chiller', 'AHU', 'FCU']
  },
  {
    icon: 'TbWind',
    title: 'Sistem Ventilasi',
    description: 'Perencanaan dan instalasi ventilasi mekanis, exhaust fan, fresh air unit dan pressurization system untuk kualitas udara optimal.',
    tags: ['Exhaust Fan', 'Fresh Air', 'Pressurization']
  },
  {
    icon: 'TbSnowflake',
    title: 'Cold Storage & Cold Room',
    description: 'Instalasi ruang pendingin untuk industri makanan, farmasi, dan distribusi dengan teknologi pendinginan presisi tinggi.',
    tags: ['Cold Room', 'Blast Freezer', 'Walk-in']
  },
  {
    icon: 'TbSettingsAutomation',
    title: 'BMS & Otomasi',
    description: 'Implementasi Building Management System untuk monitoring dan kontrol otomatis sistem HVAC secara terpusat dan efisien.',
    tags: ['BMS', 'SCADA', 'IoT']
  },
  {
    icon: 'TbTool',
    title: 'Maintenance & Servis',
    description: 'Layanan perawatan berkala, perbaikan, dan overhaul sistem HVAC untuk menjaga performa optimal dan umur panjang peralatan.',
    tags: ['Preventif', 'Korektif', 'Annual Contract']
  }
];

export const projects = [
  { image: '/009465700_1672818990-soho.jpg', badge: 'Farmasi', category: 'Healthcare', title: 'PT. SOHO Global Health', description: 'Instalasi sistem HVAC & tata udara presisi untuk fasilitas produksi farmasi.', popular: true },
  { image: '/business1.jpg', badge: 'Industri', category: 'Infrastruktur', title: 'Instalasi Chiller & Piping Sentral', description: 'Pemasangan sistem perpipaan chiller dan sistem pendingin sentral terintegrasi.', popular: true },
  { image: '/mayora.jpg', badge: 'Manufaktur', category: 'FMCG', title: 'MAYORA GROUP (PT. Tirta Fresindo)', description: 'Instalasi sistem pendingin ruangan pabrik berskala besar dan pemeliharaan.' },
  { image: '/capri.jpg', badge: 'Komersial', category: 'Building', title: 'Fasilitas Gedung CAPRI', description: 'Sistem sentralisasi pendingin ruangan dan distribusi tata udara komersial.' }
];

export const whyList = [
  { icon: 'TbCertificate', title: 'Bersertifikat Resmi', description: 'Authorized dealer 12+ brand ternama: Daikin, York, Carrier, LG, Mitsubishi, dan lainnya.' },
  { icon: 'TbUsersGroup', title: 'Tim Profesional', description: '100+ teknisi bersertifikat STTK & SKA dengan pengalaman rata-rata 10 tahun di bidang HVAC.' },
  { icon: 'TbShieldCheck', title: 'Garansi Resmi', description: 'Garansi instalasi & spare part resmi serta kontrak perawatan berkala yang terstruktur.' },
  { icon: 'TbClock24', title: 'Layanan 24/7', description: 'Tim emergency siap 24 jam untuk menangani kendala sistem HVAC di lokasi Anda.' },
  { icon: 'TbLeaf', title: 'Ramah Lingkungan', description: 'Solusi HVAC hemat energi dengan refrigeran green generation dan teknologi inverter terkini.' },
  { icon: 'TbChartLine', title: 'Efisiensi Energi', description: 'Audit dan optimasi sistem HVAC untuk penghematan energi hingga 40% dari konsumsi normal.' }
];

export const contactInfo = [
  { icon: 'TbMapPin', title: 'Kantor Pusat Karawang', text: 'ECOSPACE Bussines Park Rolling Hills, Jalan North Ecosapace 2 No.001 Kawasan, RW.KIIC, Margakaya, Kec. Telukjambe Bar., Karawang, Jawa Barat 41363' },
  { icon: 'TbPhone', title: 'Telepon & WhatsApp', text: '+62 857-8163-1205' },
  { icon: 'TbMail', title: 'Email Resmi', text: 'official@dwimitrateknindo.co.id' },
  { icon: 'TbClock', title: 'Jam Operasional', text: 'Senin – Jumat: 08.00 – 17.00 WIB\nEmergency: 24 Jam / 7 Hari' }
];

export const products = [
  {
    image: '/produk-mufy.png.jpg',
    title: 'Mufy Dust Collector',
    description: 'Sistem pengumpulan debu industri untuk menjaga kualitas udara ruang produksi.',
    tags: ['Filtration', 'Industrial'],
    popular: true
  },
  {
    image: '/1.png.jpg',
    title: 'ShitSudo Dry',
    description: 'Dehumidifier portabel untuk mengontrol kelembapan ruangan dengan efisien.',
    tags: ['Dehumidifier', 'Portable'],
    popular: true
  },
  {
    image: '/Chiller.png.jpg',
    title: 'Briese Air Chiller',
    description: 'Sistem pendingin udara sentral kapasitas besar untuk kebutuhan industri.',
    tags: ['Chiller', 'Industrial'],
    popular: true
  },
  {
    image: '/2.png.jpg',
    title: 'ShitSudo Wet',
    description: 'Humidifier industri dengan material stainless steel untuk ketahanan maksimal.',
    tags: ['Humidifier', 'Industrial'],
    popular: true
  },
  {
    image: '/3.png.jpg',
    title: 'ShitSudo Dry Cabinet',
    description: 'Dehumidifier tipe kabinet untuk kontrol kelembapan presisi skala besar.',
    tags: ['Dehumidifier', 'Cabinet']
  },
  {
    image: '/adi-Chiller.png.jpg',
    title: 'MizuAir Chiller',
    description: 'Air Cooled Modular Chiller efisiensi tinggi untuk kebutuhan HVAC dan industri skala besar.',
    tags: ['Chiller', 'Industrial', 'MizuAir']
  },
  {
    image: '/3-1.png.jpg',
    title: 'ShitSudo Dry (Compact)',
    description: 'Dehumidifier portabel yang ringkas dan tangguh untuk mengatur tingkat kelembapan ruangan secara optimal.',
    tags: ['Dehumidifier', 'Portable']
  },
  {
    image: '/4-2.png.jpg',
    title: 'ShitSudo Dry Cabinet (Pro)',
    description: 'Dehumidifier kabinet industri premium untuk mengontrol kelembapan secara presisi pada lingkungan kritis.',
    tags: ['Dehumidifier', 'Cabinet', 'Industrial']
  }
];

export const articles = [
  {
    image: '/business1.jpg',
    date: '12 Agustus 2025',
    category: 'Edukasi',
    title: 'Pentingnya Perawatan AC Berkala',
    description: 'Menjaga kebersihan dan performa sistem tata udara Anda agar tetap optimal dan hemat energi.',
    popular: true
  },
  {
    image: '/mayora.jpg',
    date: '05 September 2025',
    category: 'Teknologi',
    title: 'Mengenal Sistem VRV/VRF',
    description: 'Solusi pendinginan modern yang menawarkan efisiensi tinggi untuk gedung komersial.',
    popular: true
  },
  {
    image: '/capri.jpg',
    date: '20 Oktober 2025',
    category: 'Industri',
    title: 'Memilih Chiller yang Tepat',
    description: 'Panduan menentukan spesifikasi chiller industri sesuai dengan kebutuhan fasilitas Anda.'
  }
];

export const events = [
  {
    id: 1,
    title: 'HVAC & Refrigeration Expo',
    date: '10 Sep - 12 Sep 2026',
    location: 'Jakarta, Indonesia',
    type: 'Exhibition',
    logo: '/images__1_-removebg-preview.png', 
    flag: '🇮🇩' 
  },
  {
    id: 2,
    title: 'PharmaTech Expo & LabTech Expo',
    date: '20 Aug - 22 Aug 2026',
    location: 'Gandhi Nagar, India',
    type: 'Exhibition',
    logo: '/brand-panasonic.png', 
    flag: '🇮🇳'
  },
  {
    id: 3,
    title: 'The Battery Show Asia',
    date: '02 Sep - 05 Sep 2026',
    location: 'Indonesia',
    type: 'Conference',
    logo: '/brand-daikin.png', 
    flag: '🇮🇩'
  },
  {
    id: 4,
    title: 'Pharmaconex Egypt',
    date: '01 Sep - 03 Sep 2026',
    location: 'Cairo, Egypt',
    type: 'Conference',
    logo: '/brand-york.png', 
    flag: '🇪🇬'
  }
];
