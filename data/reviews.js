// reviews.js
// What this is: mock customer testimonials shown in the homepage reviews
// section. Bilingual text so the same data renders in both languages.

const reviews = [
  {
    id: "r1",
    name: "Faisal Al-Otaibi",
    location: { en: "Riyadh", ar: "الرياض" },
    rating: 5,
    text: {
      en: "Ordered a full suspension kit, arrived fast and the team helped me pick exactly what my Jeep needed.",
      ar: "طلبت طقم تعليق كامل، وصل بسرعة والفريق ساعدني أختار بالظبط اللي عربيتي محتاجاه.",
    },
  },
  {
    id: "r2",
    name: "Sara Al-Qahtani",
    location: { en: "Jeddah", ar: "جدة" },
    rating: 5,
    text: {
      en: "Best off-road shop in the Kingdom. Genuine parts, real experts, and the lighting kit completely transformed my night drives.",
      ar: "أفضل محل أوف رود في المملكة. قطع أصلية وخبرة حقيقية، وطقم الإضاءة غيّر رحلاتي الليلية تمامًا.",
    },
  },
  {
    id: "r3",
    name: "Khalid Al-Ghamdi",
    location: { en: "Dammam", ar: "الدمام" },
    rating: 4,
    text: {
      en: "Great selection of recovery gear for desert trips. Support team answered every question before I bought.",
      ar: "تشكيلة ممتازة من معدات الإنقاذ لرحلات الصحراء. فريق الدعم رد على كل أسئلتي قبل الشراء.",
    },
  },
];

export default reviews;
