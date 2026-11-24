// كل محتوى الموقع هنا. لتعديل عنوان أو إضافة عمل، عدّل هذا الملف فقط.
window.SITE = {
  contact: {
    whatsapp: "966590662800",
    phone: "0590662800",
    email: "ryan1al8ar7e@gmail.com",
  },

  // أقسام الأعمال: كل قسم = مجلد من مجلدات ملف الأعمال
  sections: [
    {
      id: "other",
      short: "تصوير ميداني ومحتوى للعملاء",
      title: "تصوير ميداني ومحتوى للعملاء",
      en: "Other Work",
      desc: "محتوى ريلز لعملاء في المقاولات والتكييف والضيافة: تصوير، مونتاج، ونصوص على الشاشة.",
      videos: [
        { src: "other/other-02", title: "جولة تأسيس التكييف", dur: "0:59" },
        { src: "other/other-01", title: "قبل اللياسة: نصيحة المقاول", dur: "0:31" },
        { src: "other/other-05", title: "الغرب البارد: ما عندنا شي نخبيه", dur: "0:40" },
        { src: "other/other-07", title: "جولة في حي حراء", dur: "2:02" },
        { src: "other/other-03", title: "الغرب البارد: خلص الشتاء", dur: "0:28" },
      ],
    },
    {
      id: "hiraa",
      short: "تدريب مستشفى حراء",
      title: "تصويري ومونتاجي في تدريب مستشفى حراء",
      en: "Hera General Hospital Internship",
      desc: "تغطيات صوّرتها ومنتجتها خلال فترة تدريبي في مستشفى حراء العام بمكة المكرمة: فعاليات، حملات توعوية، ومحاضرات.",
      note: { img: "certs/hiraa-thanks", label: "شهادة شكر وتقدير من مستشفى حراء العام" },
      videos: [
        { src: "hiraa/hiraa-01", title: "تغطية حفل اليوم الوطني 95", dur: "1:54" },
        { src: "hiraa/hiraa-02", title: "تعاون stc ومستشفى حراء", dur: "0:43" },
        { src: "hiraa/hiraa-03", title: "تغطية المعرض", dur: "3:04" },
        { src: "hiraa/hiraa-04", title: "حملة التوعية بمرض السيلياك", dur: "1:14" },
        { src: "hiraa/hiraa-05", title: "تغطية محاضرة توعوية", dur: "0:56" },
      ],
    },
    {
      id: "ai",
      short: "إعلانات AI",
      title: "مونتاج وصناعة إعلانات AI",
      en: "AI Ads & Editing",
      desc: "لقطات وإعلانات منتجات صنعتها بأدوات الذكاء الاصطناعي، ثم ركّبتها ومنتجتها لين صارت جاهزة للنشر.",
      disclaim: "نماذج تصورية مستقلة، غير تابعة للعلامات التجارية الظاهرة فيها.",
      videos: [
        { src: "ai/ai-01", title: "كوكاكولا", dur: "0:19" },
        { src: "ai/ai-06", title: "زوي آيس تي", dur: "0:15" },
        { src: "ai/ai-04", title: "زايروس", dur: "0:15" },
        { src: "ai/ai-02", title: "بيرين", dur: "0:19" },
        { src: "ai/ai-03", title: "بلاك دايموند للبخور", dur: "0:15" },
        { src: "ai/ai-05", title: "ديمة", dur: "0:15" },
        { src: "ai/ai-07", title: "أسراف", dur: "0:15" },
        { src: "ai/ai-09", title: "كابو", dur: "0:14" },
      ],
    },
    {
      id: "motion",
      short: "موشن جرافيك",
      title: "إعلانات الموشن جرافيك",
      en: "Motion Graphics Ads",
      desc: "إعلانات قصيرة بالموشن جرافيك للسوشال ميديا: فكرة، نص، حركة، وإيقاع يمسك المشاهد من أول ثانية.",
      videos: [
        { src: "motion/motion-01", title: "أول إعلان في التاريخ", dur: "1:20" },
        { src: "motion/motion-02", title: "ليش الشركات تدفع ملايين؟", dur: "0:52" },
        { src: "motion/motion-03", title: "واللي ما عنده أفكار", dur: "0:41" },
        { src: "motion/motion-04", title: "إعلان فولكسفاغن", dur: "1:19" },
        { src: "motion/motion-05", title: "إعلان واحد كلّف 15 ألف", dur: "0:51" },
        { src: "motion/motion-06", title: "صرف ميزانيته على الإعلان", dur: "0:32" },
        { src: "motion/motion-07", title: "الغرب البارد: هذا الإعلان مو لك", dur: "0:35" },
        { src: "motion/motion-08", title: "لو غطّينا شعارك", dur: "0:39" },
      ],
    },
  ],

  // الهويات البصرية
  identities: [
    { title: "لاذ ستوديو", en: "LATH Studio", desc: "نظام هوية كامل: الشعار، الألوان، الخطوط، وتطبيقاتها.", prefix: "identity/lath-", pages: 27 },
    { title: "الغرب البارد", en: "Cold West", desc: "دليل هوية بصرية لشركة تكييف: نموذج أولي.", prefix: "identity/gharb-", pages: 30 },
    { title: "دارفيو", en: "DarView", desc: "دليل هوية كامل لمتجر ديكور ومشغولات يدوية: الشعار، الألوان، الخطوط، والتطبيقات.", prefix: "identity/darview-", pages: 17 },
  ],

  // المواقع
  sites: [
    { title: "لاذ ستوديو", domain: "lathstudio.tech", url: "https://lathstudio.tech/", img: "sites/lath", desc: "موقع استديو إعلاني سعودي: معرض أعمال متحرك في الواجهة، الخدمات، ودراسة إبداعية، بالعربي والإنجليزي." },
    { title: "الغرب البارد", domain: "coldwest.sa", url: "https://coldwest.sa/", img: "sites/cw", desc: "موقع لشركة صيانة مكيفات في مكة: العميل يختار مشكلة مكيفه، يشوف أسبابها الشائعة، ويرسلها للفني على واتساب برسالة جاهزة." },
  ],

  // الشهادات: الرخصة المهنية والشهادة الجامعية أولاً
  featuredCerts: [
    { img: "certs/license", title: "شهادة التسجيل المهني للإعلاميين", by: "الهيئة العامة لتنظيم الإعلام", detail: "اختصاصي دعاية وإعلان، اختصاصي إعلامي" },
    { img: "certs/graduation", title: "بكالوريوس الإعلام: العلاقات العامة", by: "جامعة أم القرى، كلية العلوم الاجتماعية", detail: "خريج 2026" },
  ],
  certs: [
    { img: "certs/google-ai", title: "Google AI Professional Certificate", by: "Google · Coursera", group: "google" },
    { img: "certs/coursera-1", title: "AI for Writing and Communicating", by: "Google · Coursera", group: "google" },
    { img: "certs/coursera-2", title: "AI for App Building", by: "Google · Coursera", group: "google" },
    { img: "certs/coursera-3", title: "AI for Data Analysis", by: "Google · Coursera", group: "google" },
    { img: "certs/coursera-4", title: "AI for Research and Insights", by: "Google · Coursera", group: "google" },
    { img: "certs/coursera-5", title: "AI for Content Creation", by: "Google · Coursera", group: "google" },
    { img: "certs/coursera-6", title: "AI for Brainstorming and Planning", by: "Google · Coursera", group: "google" },
    { img: "certs/coursera-7", title: "AI for App Deployment", by: "Google · Coursera", group: "google" },
    { img: "certs/coursera-8", title: "AI Fundamentals", by: "Google · Coursera", group: "google" },
    { img: "certs/monshaat-plans", title: "الخطط التسويقية", by: "منشآت", group: "monshaat" },
    { img: "certs/monshaat-emarketing", title: "التسويق الإلكتروني بأقل التكاليف", by: "منشآت", group: "monshaat" },
    { img: "certs/monshaat-campaigns", title: "الحملات الإعلانية الإلكترونية", by: "منشآت", group: "monshaat" },
    { img: "certs/monshaat-content", title: "تطوير المحتوى الرقمي", by: "منشآت", group: "monshaat" },
    { img: "certs/hiraa-thanks", title: "شكر وتقدير: حفل اليوم الوطني 95", by: "مستشفى حراء العام", group: "other" },
    { img: "certs/photography", title: "مقدمة في فن التصوير الفوتوغرافي", by: "إدراك", group: "other" },
    { img: "certs/events", title: "إدارة وتنظيم الفعاليات في سوق العمل السعودي", by: "الهيئة العامة للترفيه · دروب", group: "other" },
    { img: "certs/img8175", title: "الفجوة الرقمية: أسبابها وتأثيراتها", by: "جامعة أم القرى · قسم الإعلام", group: "uqu" },
    { img: "certs/img8176", title: "محو الأمية الرقمية والمواطنة الرقمية", by: "جامعة أم القرى · قسم الإعلام", group: "uqu" },
    { img: "certs/tamkeen-selfmarketing", title: "كيف تسوّق لنفسك في سوق العمل", by: "عيادات التمكين", group: "tamkeen" },
    { img: "certs/tamkeen-ethics", title: "أخلاقيات العمل", by: "عيادات التمكين", group: "tamkeen" },
    { img: "certs/tamkeen-finance", title: "الإدارة المالية", by: "عيادات التمكين", group: "tamkeen" },
  ],
};
