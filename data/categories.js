// categories.js
// What this is: mock category + subcategory data shown across the homepage
// (category grid, mega menu) until the real backend is connected. Each
// category has bilingual (en/ar) labels and an icon name from lucide-react.
// services/categories.js reads from here automatically when the API is empty.

const categories = [
  {
    id: "lighting",
    slug: "lighting-spotlights",
    icon: "Lightbulb",
    image: "/images/categories/lighting.jpg",
    name: { en: "Lighting & Spotlights", ar: "الإضاءة والكشافات" },
    subcategories: [
      {
        id: "spotlights",
        slug: "spotlights",
        name: { en: "Spotlights", ar: "الكشافات" },
      },
      {
        id: "control-panels",
        slug: "control-panels",
        name: { en: "Control Panels", ar: "لوحات التحكم" },
      },
      {
        id: "spotlight-accessories",
        slug: "spotlight-accessories",
        name: { en: "Spotlight Accessories", ar: "إكسسوارات الكشافات" },
      },
      {
        id: "lighting-supplies",
        slug: "lighting-supplies",
        name: { en: "Lighting Supplies", ar: "مستلزمات الإضاءة" },
      },
    ],
  },
  {
    id: "trip-supplies",
    slug: "trip-supplies",
    icon: "Tent",
    image: "/images/categories/trip-supplies.jpg",
    name: { en: "Trip Supplies", ar: "مستلزمات الرحلات" },
    subcategories: [
      {
        id: "batteries",
        slug: "batteries",
        name: { en: "Batteries", ar: "البطاريات" },
      },
      {
        id: "tanks",
        slug: "tanks",
        name: { en: "Tanks", ar: "خزانات الوقود والمياه" },
      },
      {
        id: "chassis-protection",
        slug: "chassis-protection",
        name: { en: "Chassis Protection", ar: "حماية الشاسيه" },
      },
      {
        id: "trip-essentials",
        slug: "trip-essentials",
        name: { en: "Trip Essentials", ar: "مستلزمات الرحلة" },
      },
      {
        id: "air-compressors",
        slug: "air-compressors",
        name: { en: "Air Compressors", ar: "ضواغط الهواء" },
      },
      {
        id: "recovery-wires",
        slug: "recovery-wires",
        name: { en: "Recovery Wires", ar: "حبال الإنقاذ" },
      },
    ],
  },
  {
    id: "performance",
    slug: "performance-suspension",
    icon: "Gauge",
    image: "/images/categories/performance.jpg",
    name: { en: "Performance & Suspension", ar: "الأداء والعزم" },
    subcategories: [
      {
        id: "shocks",
        slug: "shocks",
        name: { en: "Shocks & Coilovers", ar: "مساعدات أمامية" },
      },
      {
        id: "lift-kits",
        slug: "lift-kits",
        name: { en: "Lift Kits", ar: "أطقم رفع السيارة" },
      },
      {
        id: "exhaust",
        slug: "exhaust",
        name: { en: "Exhaust Systems", ar: "أنظمة العادم" },
      },
    ],
  },
  {
    id: "tires-wheels",
    slug: "tires-wheels",
    icon: "CircleDot",
    image: "/images/categories/tires.jpg",
    name: { en: "Tires & Wheels", ar: "الإطارات والجنوط" },
    subcategories: [
      {
        id: "off-road-tires",
        slug: "off-road-tires",
        name: { en: "Off-Road Tires", ar: "إطارات وعرة" },
      },
      { id: "wheels", slug: "wheels", name: { en: "Wheels", ar: "الجنوط" } },
    ],
  },
  {
    id: "apparel",
    slug: "apparel-accessories",
    icon: "Shirt",
    image: "/images/categories/apparel.jpg",
    name: { en: "Apparel & Accessories", ar: "الملابس والإكسسوارات" },
    subcategories: [
      { id: "caps", slug: "caps", name: { en: "Caps", ar: "القبعات" } },
      {
        id: "jackets",
        slug: "jackets",
        name: { en: "Jackets", ar: "الجاكيتات" },
      },
    ],
  },
  {
    id: "suspension",
    slug: "suspension",
    icon: "Caravan",
    image: "/images/categories/suspension.jpg",
    name: { en: "Suspension", ar: "العزم" },
    subcategories: [
      {
        id: "roof-tents",
        slug: "roof-tents",
        name: { en: "Roof Top Tents", ar: "خيام السطح" },
      },
      {
        id: "awnings",
        slug: "awnings",
        name: { en: "Awnings", ar: "المظلات" },
      },
    ],
  },
];

export default categories;
