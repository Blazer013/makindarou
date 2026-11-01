export type ProductCategory = 'vaccines' | 'drugs' | 'biologicals' | 'supplements' | 'disinfectants' | 'feed' | 'concentrates' | 'equipment';
export type AnimalType = 'poultry' | 'livestock' | 'aquatic' | 'all';

export interface Product {
  id: string;
  slug: string;
  title: string;
  titleFa: string;
  titleEn: string;
  titleAr: string;
  category: ProductCategory;
  shortDescription: string;
  shortDescriptionFa: string;
  shortDescriptionEn: string;
  shortDescriptionAr: string;
  fullDescriptionFa: string;
  fullDescriptionEn: string;
  fullDescriptionAr: string;
  specifications: Array<{
    name: string;
    nameFa: string;
    nameEn: string;
    nameAr: string;
    value: string;
  }>;
  certifications: Array<{
    name: string;
    nameFa: string;
    nameEn: string;
    nameAr: string;
    icon: string;
  }>;
  animalType: AnimalType;
  featured: boolean;
  image?: string;
}

export const products: Product[] = [
  {
    id: 'newcastle-vaccine',
    slug: 'newcastle-vaccine',
    title: 'واکسن نیوکاسل لاژیو',
    titleFa: 'واکسن نیوکاسل لاژیو',
    titleEn: 'Newcastle LaSota Vaccine',
    titleAr: 'لقاح نيوكاسل لاسوتا',
    category: 'vaccines',
    shortDescription: 'واکسن زنده تقویت نشده ضد بیماری نیوکاسل مرغ‌ها',
    shortDescriptionFa: 'واکسن زنده تقویت نشده ضد بیماری نیوکاسل مرغ‌ها',
    shortDescriptionEn: 'Live attenuated vaccine against Newcastle disease in poultry',
    shortDescriptionAr: 'لقاح حي مخفف ضد مرض نيوكاسل في الدواجن',
    fullDescriptionFa: 'واکسن نیوکاسل لاژیو یک واکسن زنده تقویت نشده برای پیشگیری از بیماری نیوکاسل (Ranikhet) در مرغ و طیور می‌باشد. این واکسن از شاخه لاژیو (LaSota) تهیه شده و برای واکسیناسیون بویلرها، لایه‌ها و پرستاران مادری به کار می‌رود. روش مصرف: قطره چشمی، دهانی، یا آب آشامیدنی. دوز: ۱ دز به ازای هر مرغ.',
    fullDescriptionEn: 'Newcastle LaSota Vaccine is a live attenuated vaccine for prevention of Newcastle disease (Ranikhet) in poultry. Prepared from LaSota strain, used for vaccination of broilers, layers, and breeders. Administration: Eye drop, oral, or drinking water. Dose: 1 dose per bird.',
    fullDescriptionAr: 'لقاح نيوكاسل لاسوتا هو لقاح حي مخفف للوقاية من مرض نيوكاسل (رانيخيت) في الدواجن. تم تحضيره من سلالة لاسوتا، ويستخدم لتطعيم الدجاج اللاحم، والبياض، والأمهات. طريقة الاستعمال: قطرة عين، فموية، أو مياه الشرب. الجرعة: 1 جرعة لكل طائر.',
    specifications: [
      { name: 'نوع واکسن', nameFa: 'نوع واکسن', nameEn: 'Vaccine Type', nameAr: 'نوع اللقاح', value: 'زنده تقویت نشده (Live Attenuated)' },
      { name: 'شاخه', nameFa: 'شاخه', nameEn: 'Strain', nameAr: 'السلالة', value: 'لاژیو (LaSota)' },
      { name: 'دوز', nameFa: 'دوز', nameEn: 'Dose', nameAr: 'الجرعة', value: '۱ دز / مرغ' },
      { name: 'روش مصرف', nameFa: 'روش مصرف', nameEn: 'Administration', nameAr: 'طريقة الاستعمال', value: 'قطره چشمی، دهانی، آب آشامیدنی' },
      { name: 'حجم ظروف', nameFa: 'حجم ظروف', nameEn: 'Vial Sizes', nameAr: 'أحجام القوارير', value: '۵۰۰، ۱۰۰۰، ۲۰۰۰ دز' },
      { name: 'شرایط نگهداری', nameFa: 'شرایط نگهداری', nameEn: 'Storage', nameAr: 'التخزين', value: '۲ تا ۸ درجه سانتی‌گراد' },
      { name: 'تاریخ انقضا', nameFa: 'تاریخ انقضا', nameEn: 'Expiry', nameAr: 'تاريخ الانتهاء', value: '۲۴ ماه از تاریخ تولید' },
      { name: 'مجوز', nameFa: 'مجوز', nameEn: 'License', nameAr: 'الترخيص', value: 'مجوز سازمان دامپزشکی ایران' },
    ],
    certifications: [
      { name: 'GMP', nameFa: 'GMP', nameEn: 'GMP', nameAr: 'GMP', icon: '📜' },
      { name: 'ISO 9001', nameFa: 'ISO 9001', nameEn: 'ISO 9001', nameAr: 'ISO 9001', icon: '📋' },
      { name: 'مجوز سازمان دامپزشکی', nameFa: 'مجوز سازمان دامپزشکی', nameEn: 'Veterinary Org License', nameAr: 'ترخيص المنظمة البيطرية', icon: '✅' },
    ],
    animalType: 'poultry',
    featured: true,
  },
  {
    id: 'gumboro-vaccine',
    slug: 'gumboro-vaccine',
    title: 'واکسن گامبورو',
    titleFa: 'واکسن گامبورو',
    titleEn: 'Gumboro Vaccine',
    titleAr: 'لقاح غامبورو',
    category: 'vaccines',
    shortDescription: 'واکسن ضد بیماری Bursal مرغ‌های بویلر',
    shortDescriptionFa: 'واکسن ضد بیماری Bursal مرغ‌های بویلر',
    shortDescriptionEn: 'Vaccine against Infectious Bursal Disease in broilers',
    shortDescriptionAr: 'لقاح ضد مرض بورسال المعدي في الدجاج اللاحم',
    fullDescriptionFa: 'واکسن گامبورو برای پیشگیری از بیماری عفونی بورسال (IBD) در مرغ‌های بویلر طراحی شده است.',
    fullDescriptionEn: 'Gumboro vaccine for prevention of Infectious Bursal Disease (IBD) in broilers.',
    fullDescriptionAr: 'لقاح غامبورو للوقاية من مرض بورسال المعدي (IBD) في دجاج اللحم.',
    specifications: [
      { name: 'نوع واکسن', nameFa: 'نوع واکسن', nameEn: 'Vaccine Type', nameAr: 'نوع اللقاح', value: 'زنده تقویت نشده (Live Attenuated)' },
      { name: 'شاخه', nameFa: 'شاخه', nameEn: 'Strain', nameAr: 'السلالة', value: 'میفلا (Mild)' },
      { name: 'دوز', nameFa: 'دوز', nameEn: 'Dose', nameAr: 'الجرعة', value: '۱ دز / مرغ' },
      { name: 'روش مصرف', nameFa: 'روش مصرف', nameEn: 'Administration', nameAr: 'طريقة الاستعمال', value: 'آب آشامیدنی' },
      { name: 'شرایط نگهداری', nameFa: 'شرایط نگهداری', nameEn: 'Storage', nameAr: 'التخزين', value: '۲ تا ۸ درجه سانتی‌گراد' },
    ],
    certifications: [
      { name: 'GMP', nameFa: 'GMP', nameEn: 'GMP', nameAr: 'GMP', icon: '📜' },
      { name: 'ISO 9001', nameFa: 'ISO 9001', nameEn: 'ISO 9001', nameAr: 'ISO 9001', icon: '📋' },
    ],
    animalType: 'poultry',
    featured: true,
  },
  {
    id: 'antibiotic-powder',
    slug: 'antibiotic-powder',
    title: 'پودر آنتی‌بیوتیک دوکسی‌سیکلین',
    titleFa: 'پودر آنتی‌بیوتیک دوکسی‌سیکلین',
    titleEn: 'Doxycycline Antibiotic Powder',
    titleAr: 'مسحوق مضاد حيوي دوكسيسايكلين',
    category: 'drugs',
    shortDescription: 'آنتی‌بیوتیک طیف وسیع برای عفونت‌های تنفسی و دستگاه گوارش',
    shortDescriptionFa: 'آنتی‌بیوتیک طیف وسیع برای عفونت‌های تنفسی و دستگاه گوارش',
    shortDescriptionEn: 'Broad-spectrum antibiotic for respiratory and GI infections',
    shortDescriptionAr: 'مضاد حيوي واسع الطيف للعدوى التنفسية والمعوية',
    fullDescriptionFa: 'پودر دوکسی‌سیکلین یک آنتی‌بیوتیک طیف وسیع از گروه تتراسیکلین‌ها برای درمان عفونت‌های باکتریایی در مرغ، طیور و دام می‌باشد.',
    fullDescriptionEn: 'Doxycycline powder is a broad-spectrum tetracycline antibiotic for treatment of bacterial infections in poultry and livestock.',
    fullDescriptionAr: 'مسحوق دوكسيسايكلين هو مضاد حيوي واسع الطيف من مجموعة التتراسايكلين لعلاج الالتهابات البكتيرية في الدواجن والمواشي.',
    specifications: [
      { name: 'ماده فعال', nameFa: 'ماده فعال', nameEn: 'Active Ingredient', nameAr: 'المادة الفعالة', value: 'دوکسی‌سیکلین هیکلات' },
      { name: 'غلظت', nameFa: 'غلظت', nameEn: 'Concentration', nameAr: 'التركيز', value: '۲۰٪ و ۵۰٪' },
      { name: 'دوز مصرف', nameFa: 'دوز مصرف', nameEn: 'Dosage', nameAr: 'الجرعة', value: '۱۰-۲۰ мг/kg وزن بدن' },
      { name: 'دوره درمان', nameFa: 'دوره درمان', nameEn: 'Treatment Duration', nameAr: 'مدة العلاج', value: '۳-۵ روز' },
      { name: 'زمان انتظار', nameFa: 'زمان انتظار', nameEn: 'Withdrawal Period', nameAr: 'فترة الانتظار', value: '۷ روز برای گوشت، ۵ روز برای تخم' },
    ],
    certifications: [
      { name: 'GMP', nameFa: 'GMP', nameEn: 'GMP', nameAr: 'GMP', icon: '📜' },
      { name: 'ISO 9001', nameFa: 'ISO 9001', nameEn: 'ISO 9001', nameAr: 'ISO 9001', icon: '📋' },
    ],
    animalType: 'livestock',
    featured: false,
  },
  {
    id: 'vitamin-premix',
    slug: 'vitamin-premix',
    title: 'پری‌میکس ویتامین-کانسانتره',
    titleFa: 'پری‌میکس ویتامین-کانسانتره',
    titleEn: 'Vitamin Concentrate Premix',
    titleAr: 'بريميكس فيتامين مركز',
    category: 'supplements',
    shortDescription: 'مکمل ویتامین و معدنی کامل برای رشد و پرورش بهینه',
    shortDescriptionFa: 'مکمل ویتامین و معدنی کامل برای رشد و پرورش بهینه',
    shortDescriptionEn: 'Complete vitamin-mineral supplement for optimal growth',
    shortDescriptionAr: 'مكمل فيتامينات ومعادن كامل للنمو الأمثل',
    fullDescriptionFa: 'پری‌میکس ویتامین-کانسانتره حاوی ویتامین‌های A، D3، E، K3، گروه B و معادن مورد نیاز برای رشد، تقویت ایمنی و افزایش تولید می‌باشد.',
    fullDescriptionEn: 'Vitamin concentrate premix containing vitamins A, D3, E, K3, B-complex and essential minerals for growth, immunity and production.',
    fullDescriptionAr: 'بريميكس فيتامين مركز يحتوي على فيتامينات A، D3، E، K3، مجموعة B والمعادن الأساسية للنمو والمناعة والإنتاج.',
    specifications: [
      { name: 'ویتامین A', nameFa: 'ویتامین A', nameEn: 'Vitamin A', nameAr: 'فيتامين A', value: '۱۰،۰۰۰،۰۰۰ IU/kg' },
      { name: 'ویتامین D3', nameFa: 'ویتامین D3', nameEn: 'Vitamin D3', nameAr: 'فيتامين D3', value: '۲،۰۰۰،۰۰۰ IU/kg' },
      { name: 'ویتامین E', nameFa: 'ویتامین E', nameEn: 'Vitamin E', nameAr: 'فيتامين E', value: '۱۵،۰۰۰ мг/kg' },
      { name: 'ویتامین K3', nameFa: 'ویتامین K3', nameEn: 'Vitamin K3', nameAr: 'فيتامين K3', value: '۲،۰۰۰ мг/kg' },
      { name: 'معدن‌ها', nameFa: 'معدن‌ها', nameEn: 'Minerals', nameAr: 'المعادن', value: 'Mn, Zn, Fe, Cu, I, Se, Co' },
      { name: 'نرخ مصرف', nameFa: 'نرخ مصرف', nameEn: 'Inclusion Rate', nameAr: 'معدل الإضافة', value: '۱-۲ kg در تن خوراک' },
    ],
    certifications: [
      { name: 'GMP', nameFa: 'GMP', nameEn: 'GMP', nameAr: 'GMP', icon: '📜' },
      { name: 'ISO 9001', nameFa: 'ISO 9001', nameEn: 'ISO 9001', nameAr: 'ISO 9001', icon: '📋' },
      { name: 'HACCP', nameFa: 'HACCP', nameEn: 'HACCP', nameAr: 'HACCP', icon: '🔬' },
    ],
    animalType: 'all',
    featured: true,
  },
  {
    id: 'disinfectant-virkon',
    slug: 'disinfectant-virkon',
    title: 'ضدعفونی‌کننده ورکون اس',
    titleFa: 'ضدعفونی‌کننده ورکون اس',
    titleEn: 'Virkon S Disinfectant',
    titleAr: 'مطهر فيركون اس',
    category: 'disinfectants',
    shortDescription: 'ضدعفونی‌کننده طیف وسیع برای سالن‌های مرغداری و دامداری',
    shortDescriptionFa: 'ضدعفونی‌کننده طیف وسیع برای سالن‌های مرغداری و دامداری',
    shortDescriptionEn: 'Broad-spectrum disinfectant for poultry and livestock houses',
    shortDescriptionAr: 'مطهر واسع الطيف لقاعات الدواجن والمواشي',
    fullDescriptionFa: 'ورکون اس یک ضدعفونی‌کننده طیف وسیع مبتنی بر پراکسید است که علیه ویروس‌ها، باکتری‌ها، قارچ‌ها و میکوبلاسماها موثر می‌باشد. مناسب برای ضدعفونی کردن سالن‌ها، تجهیزات، وسائل نقلیه و آب آشامیدنی.',
    fullDescriptionEn: 'Virkon S is a broad-spectrum peroxide-based disinfectant effective against viruses, bacteria, fungi and mycoplasmas. Suitable for disinfecting houses, equipment, vehicles and drinking water.',
    fullDescriptionAr: 'فيركون اس هو مطهر واسع الطيف يعتمد على البيروكسيد فعال ضد الفيروسات والبكتيريا والفطريات والميكوبلازما. مناسب لتطهير القاعات والمعدات والمركبات ومياه الشرب.',
    specifications: [
      { name: 'ترکیب', nameFa: 'ترکیب', nameEn: 'Composition', nameAr: 'التركيب', value: 'پتاسیم پراکسید مونو سولفاته، اسید سولفامیک، سدیم کلرید' },
      { name: 'نرخ مصرف', nameFa: 'نرخ مصرف', nameEn: 'Dilution Rate', nameAr: 'معدل التخفيف', value: '۱٪ (۱۰ گرم در ۱ لیتر آب)' },
      { name: 'زمان تماس', nameFa: 'زمان تماس', nameEn: 'Contact Time', nameAr: 'وقت التلامس', value: '۱۰ دقیقه' },
      { name: 'pH محلول', nameFa: 'pH محلول', nameEn: 'Solution pH', nameAr: 'pH المحلول', value: '۲.۶-۲.۸' },
      { name: 'بسته‌بندی', nameFa: 'بسته‌بندی', nameEn: 'Packaging', nameAr: 'التعبئة', value: 'ظرف ۵ کیلوگرمی و ۱۰ کیلوگرمی' },
    ],
    certifications: [
      { name: 'EPA Registered', nameFa: 'EPA Registered', nameEn: 'EPA Registered', nameAr: 'مسجل في EPA', icon: '🌍' },
      { name: 'DEFRA Approved', nameFa: 'DEFRA Approved', nameEn: 'DEFRA Approved', nameAr: 'معتمد من DEFRA', icon: '🇬🇧' },
      { name: 'GMP', nameFa: 'GMP', nameEn: 'GMP', nameAr: 'GMP', icon: '📜' },
    ],
    animalType: 'all',
    featured: false,
  },
  {
    id: 'biological-probiotic',
    slug: 'biological-probiotic',
    title: 'بیولوژیک پروبیوتیک چند سلولی',
    titleFa: 'بیولوژیک پروبیوتیک چند سلولی',
    titleEn: 'Multi-strain Probiotic Biological',
    titleAr: 'بيولوجي بروبيوتيك متعدد السلالات',
    category: 'biologicals',
    shortDescription: 'پروبیوتیک حاوی شاخه‌های مفید برای سلامت روده و ایمنی',
    shortDescriptionFa: 'پروبیوتیک حاوی شاخه‌های مفید برای سلامت روده و ایمنی',
    shortDescriptionEn: 'Probiotic containing beneficial strains for gut health and immunity',
    shortDescriptionAr: 'بروبيوتيك يحتوي على سلالات مفيدة لصحة الأمعاء والمناعة',
    fullDescriptionFa: 'بیولوژیک پروبیوتیک چند سلولی حاوی لاکتوباسیلوس، باسیفوس و ساکرومیسیس برای بهبود تعادل میکروفلورای روده، افزایش هضم و تقویت سیستم ایمنی می‌باشد.',
    fullDescriptionEn: 'Multi-strain probiotic biological containing Lactobacillus, Bacillus and Saccharomyces for improved gut microflora, digestion and immunity.',
    fullDescriptionAr: 'بروبيوتيك بيولوجي متعدد السلالات يحتوي على لاكتوباسيلوس، باسيلوس وساكاروميسيس لتحسين ميكروفلورا الأمعاء والهضم والمناعة.',
    specifications: [
      { name: 'شاخه‌ها', nameFa: 'شاخه‌ها', nameEn: 'Strains', nameAr: 'السلالات', value: 'Lactobacillus spp., Bacillus spp., Saccharomyces cerevisiae' },
      { name: 'تعداد CFU', nameFa: 'تعداد CFU', nameEn: 'CFU Count', nameAr: 'عدد CFU', value: 'حداقل ۱×۱۰⁹ CFU/g' },
      { name: 'نرخ مصرف', nameFa: 'نرخ مصرف', nameEn: 'Inclusion Rate', nameAr: 'معدل الإضافة', value: '۵۰۰-۱۰۰۰ گرم در تن خوراک' },
      { name: 'شکل', nameFa: 'شکل', nameEn: 'Form', nameAr: 'الشكل', value: 'پودر قابل حل در آب یا خوراک' },
      { name: 'ثبات', nameFa: 'ثبات', nameEn: 'Stability', nameAr: 'الثبات', value: 'ثابت در دمای اتاق تا ۲۴ ماه' },
    ],
    certifications: [
      { name: 'GMP', nameFa: 'GMP', nameEn: 'GMP', nameAr: 'GMP', icon: '📜' },
      { name: 'ISO 9001', nameFa: 'ISO 9001', nameEn: 'ISO 9001', nameAr: 'ISO 9001', icon: '📋' },
      { name: 'Non-GMO', nameFa: 'Non-GMO', nameEn: 'Non-GMO', nameAr: 'Non-GMO', icon: '🌱' },
    ],
    animalType: 'all',
    featured: false,
  },
];

export const categories = [
  { id: 'vaccines', nameFa: 'واکسن‌ها', nameEn: 'Vaccines', nameAr: 'اللقاحات', icon: '💉' },
  { id: 'drugs', nameFa: 'داروهای دامپزشکی', nameEn: 'Veterinary Drugs', nameAr: 'الأدوية البيطرية', icon: '💊' },
  { id: 'biologicals', nameFa: 'مواد بیولوژیک', nameEn: 'Biologicals', nameAr: 'المواد البيولوجية', icon: '🧬' },
  { id: 'supplements', nameFa: 'مکمل‌ها', nameEn: 'Supplements', nameAr: 'المكملات', icon: '💊' },
  { id: 'disinfectants', nameFa: 'ضدعفونی‌کننده‌ها', nameEn: 'Disinfectants', nameAr: 'المطهرات', icon: '🧴' },
  { id: 'feed', nameFa: 'غذا و کنسانتره', nameEn: 'Feed & Concentrates', nameAr: 'الأعلاف والتركيزات', icon: '🌾' },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter(p => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured);
}

export function getProductsByAnimalType(animalType: AnimalType): Product[] {
  if (animalType === 'all') return products;
  return products.filter(p => p.animalType === animalType || p.animalType === 'all');
}