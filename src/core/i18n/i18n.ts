import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ar: {
    translation: {
      appName: "مسلم",
      nav: {
        home: "الرئيسية",
        quran: "القرآن الكريم",
        quranRead: "قراءة القرآن",
        quranListen: "الاستماع للقرآن",
        azkar: "الأذكار",
        hadith: "الأحاديث",
        doaa: "الأدعية",
        radio: "الإذاعة",
      },
      prayers: {
        hadith: "«أَحَبُّ الأَعْمَالِ إِلَى اللهِ الصَّلاَةُ عَلَى وَقْتِهَا»",
        next_prayer: "الصلاة القادمة",
        title: "مواقيت الصلاة",
        remaining: "متبقي حتى صلاة",
        loading: "جاري التحميل...",
        Fajr: "الفجر",
        Sunrise: "الشروق",
        Dhuhr: "الظهر",
        Asr: "العصر",
        Maghrib: "المغرب",
        Isha: "العشاء"
      },
      cities: {
        cairo: "القاهرة",
        Riyadh: "الرياض",
        "Abu Dhabi": "أبو ظبي",
        Doha: "الدوحة",
        Amman: "عمان",
        Baghdad: "بغداد",
        Khartoum: "الخرطوم",
        Tunis: "تونس",
        Paris: "باريس",
        Berlin: "برلين",
        London: "لندن",
        Islamabad: "إسلام آباد"
      },
      quickCards: {
        hadith: "حديث اليوم",
        verse: "آية اليوم",
        mosque: "المساجد القريبة"
      },
      azkarPage: {
        badge: "الذِّكْرُ الحَكِيم",
        verse: "«فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ»",
        intro: "طُمأنينة القلب تبدأ من هنا. الأذكار ليست مجرد كلمات نرددها، بل هي حصن المسلم اليومي، ونور يضيء دربك، وصلة دائمية ببارئك تجلب لك السكينة في تقلبات الحياة.",
        sectionTitle: "أبواب الأذكار",
        viewMore: "عرض الأذكار والعدادات",
        backBtn: "العودة إلى قائمة الأذكار",
        dhikrUnit: "أذكار",
        buttons: {
          resetAll: "إعادة ضبط العدادات"
        },
        messages: {
          notFound: "القسم غير موجود"
        },
        categories: {
          morning: "أذكار الصباح",
          night: "أذكار المساء",
          wakeup: "أذكار الاستيقاظ",
          sleeping: "أذكار النوم",
          prayer: "أذكار بعد السلام من الصلاة المفروضة",
          tasbeeh: "تسابيح"
        }
      },
      doaaPage: {
        badge: "الدُّعَاءُ المُسْتَجَاب",
        verse: "«وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ»",
        intro: "الدعاء هو العبادة، وسهمك الذي لا يخطئ في ملمات الحياة. هنا جمعنا لك أصح الأدعية المأثورة من القرآن الكريم وسير الأنبياء الصالحين لتلهج بها روحك ليل نهار.",
        sectionTitle: "أبواب الأدعية",
        viewMore: "عرض الأدعية والأذكار المأثورة",
        backBtn: "العودة إلى قائمة الأدعية",
        categories: {
          quranic: "أدعية قرآنية",
          prophets: "أدعية الأنبياء"
        }
      },
      quranPage: {
        surah: "السورة:",
        chooseSurah: "اختر السورة...",
        page: "الصفحة",
        next: "التالي",
        prev: "السابق",
        footer: "مصحف المدينة المنورة الإلكتروني ثلاثي الأبعاد"
      },
      audioPlayer: {
        reciterLabel: "القارئ الشيخ:",
        surahLabel: "السورة الكريمة:",
        chooseSurah: "اختر السورة...",
        meccan: "مكية",
        medinan: "مدنية"
      },
      radioPage: {
        live: "البث المباشر",
        title: "الإذاعات الإسلامية",
        tuning: "جاري البث",
        standby: "وضع الاستعداد"
      },
      footer: {
        built_with: "صُنع بكل",
        for_muslims: "ليكون رفيقك الإيماني اليومي",
        about: "عن التطبيق",
        privacy: "سياسة الخصوصية",
        terms: "الشروط والأحكام",
        contact: "اتصل بنا",
        rights: "جميع الحقوق محفوظة."
      },
      azan: {
        title: "حان الآن موعد أذان",
        play: "تشغيل الأذان",
        stop: "إيقاف الأذان",
        close: "إغلاق"
      },
      staticPages: {
        about: {
          title: "عن تطبيق مسلم",
          p1: "تطبيق مسلم هو رفيقك الرقمي الإيماني، تم تصميمه بعناية فائقة ليوفر للمسلم المعاصر تجربة مستخدم سلسة وخالية من الإعلانات والمشتتات.",
          p2: "هدفنا هو تيسير الوصول إلى العبادات اليومية من قراءة واستماع للقرآن الكريم، ومتابعة الأذكار والأدعية، ومعرفة مواقيت الصلاة بدقة لكل المدن، ليكون الحصن الرقمي الذي يعينك على ذكر الله في تقلبات الحياة."
        },
        privacy: {
          title: "سياسة الخصوصية",
          updated: "آخر تحديث: مايو 2026",
          p1: "نحن في تطبيق مسلم نحترم خصوصيتك بالكامل. التطبيق لا يقوم بجمع، تخزين، أو مشاركة أي بيانات شخصية تخص المستخدمين.",
          p2: "يتم استخدام الصلاحيات الأساسية مثل (الموقع الجغرافي) محلياً فقط على جهازك لحساب مواقيت الصلاة بدقة، ولا يتم إرسال هذه البيانات إلى أي خوادم خارجية."
        },
        terms: {
          title: "الشروط والأحكام",
          p1: "باستخدامك لتطبيق مسلم، فإنك توافق على أن هذا التطبيق متاح بشكل مجاني بالكامل لجميع المسلمين، ويُمنع تماماً استغلال أي جزء منه أو كوده البرمجي لأغراض تجارية أو ربحية.",
          p2: "المحتوى المتوفر من مصاحف إلكترونية، إذاعات، وأذكار مأخوذ من مصادر علمية موثوقة ومراجعة بدقة لضمان سلامة النص الشرعي."
        },
        contact: {
          title: "اتصل بنا",
          subtitle: "يسعدنا دائماً تواصلك معنا لاستقبال استفساراتك أو مقترحاتك لتطوير التطبيق.",
          name: "الاسم الكامل",
          email: "البريد الإلكتروني",
          message: "رسالتك",
          send: "إرسال الرسالة",
          loading: "جاري الإرسال...",
          success: "تم إرسال رسالتك بنجاح! شكراً لتواصلك.",
          error: "فشل في إرسال الرسالة. الرجاء المحاولة مرة أخرى لاحقاً."
        }
      },
      telegramCard: {
        title: "بوابة الاشتراك في بوت تليجرام",
        description: "سيتم توجيهك إلى تليجرام للاشتراك في البوت الذكي ومشاركة موقعك لتلقي تنبيهات الأذان الدقيقة .",
        cta: "فتح البوت والاشتراك"
      }
    }
  },
  en: {
    translation: {
      appName: "Muslim",
      nav: {
        home: "Home",
        quran: "Holy Quran",
        quranRead: "Quran Reading",
        quranListen: "Quran Audio",
        hadith: "Hadith",
        azkar: "Azkar",
        radio: "Radio",
        doaa: "Du'a",
      },
      prayers: {
        hadith: "The most beloved of deeds to Allah is prayer at its proper time.",
        title: "Prayer Times",
        remaining: "Remaining until",
        next_prayer: "Next Prayer",
        loading: "Loading...",
        Fajr: "Fajr",
        Sunrise: "Sunrise",
        Dhuhr: "Dhuhr",
        Asr: "Asr",
        Maghrib: "Maghrib",
        Isha: "Isha"
      },
      cities: {
        cairo: "Cairo",
        Riyadh: "Riyadh",
        "Abu Dhabi": "Abu Dhabi",
        Doha: "Doha",
        Amman: "Amman",
        Baghdad: "Baghdad",
        Khartoum: "Khartoum",
        Tunis: "Tunis",
        Paris: "Paris",
        Berlin: "Berlin",
        London: "London",
        Islamabad: "Islamabad"
      },
      quickCards: {
        hadith: "Hadith of the Day",
        verse: "Verse of the Day",
        mosque: "Nearby Mosques"
      },
      azkarPage: {
        badge: "Remembrance",
        verse: "“So remember Me; I will remember you. And be grateful to Me and do not deny Me.”",
        intro: "Peace of mind begins here. Azkar is the Muslim’s daily fortress, a light that guides your path, and a continuous bond with your Creator.",
        sectionTitle: "Dhikr Categories",
        viewMore: "View dhikr & counters",
        backBtn: "Back to Categories",
        dhikrUnit: "Dhikr",
        buttons: {
          resetAll: "Reset Counters"
        },
        messages: {
          notFound: "Category not found"
        },
        categories: {
          morning: "Morning Remembrance",
          night: "Evening Remembrance",
          wakeup: "Remembrance Upon Waking Up",
          sleeping: "Remembrance Before Sleeping",
          prayer: "Remembrance After Prayer",
          tasbeeh: "Glorifications (Tasbeeh)"
        }
      },
      doaaPage: {
        badge: "Supplications",
        verse: "“And when My servants ask you concerning Me, indeed I am near. I respond to the invocation of the supplicant when he calls upon Me.”",
        intro: "Supplication is the essence of worship. Here we have gathered for you the most authentic supplications from the Holy Quran and the stories of the Prophets.",
        sectionTitle: "Du'a Categories",
        viewMore: "View prophetic prayers and supplications",
        backBtn: "Back to Categories",
        categories: {
          quranic: "Quranic Supplications",
          prophets: "Prophets' Supplications"
        }
      },
      quranPage: {
        surah: "Surah:",
        chooseSurah: "Select Surah...",
        page: "Page",
        next: "Next",
        prev: "Previous",
        footer: "3D Electronic Madina Mushaf"
      },
      audioPlayer: {
        reciterLabel: "Reciter:",
        surahLabel: "Surah:",
        chooseSurah: "Select Surah...",
        meccan: "Meccan",
        medinan: "Medinan"
      },
      radioPage: {
        live: "Live Stream",
        title: "Islamic Radio",
        tuning: "TUNING LIVE",
        standby: "STBY"
      },
      footer: {
        built_with: "Built with",
        for_muslims: "to be your daily spiritual companion",
        about: "About Us",
        privacy: "Privacy Policy",
        terms: "Terms & Conditions",
        contact: "Contact Us",
        rights: "All rights reserved."
      },
      azan: {
        title: "It is now time for",
        play: "Play Adhan",
        stop: "Stop Adhan",
        close: "Close"
      },
      staticPages: {
        about: {
          title: "About Muslim App",
          p1: "Muslim App is your digital spiritual companion, carefully designed to provide the modern Muslim with a seamless experience completely free of ads and distractions.",
          p2: "Our goal is to facilitate access to daily acts of worship, from reading and listening to the Holy Quran, to following Azkar and Du'as, and knowing precise prayer times for all cities."
        },
        privacy: {
          title: "Privacy Policy",
          updated: "Last updated: May 2026",
          p1: "We at Muslim App fully respect your privacy. The application does not collect, store, or share any personal data belonging to users.",
          p2: "Basic permissions such as (Location) are used purely locally on your device to calculate accurate prayer times and are never sent to external servers."
        },
        terms: {
          title: "Terms & Conditions",
          p1: "By using Muslim App, you agree that this application is available completely free of charge for all Muslims. It is strictly forbidden to exploit any part of it for commercial or profitable purposes.",
          p2: "The available content of electronic Mushafs, radio streams, and Azkar is sourced from trusted academic resources to ensure authentic texts."
        },
        contact: {
          title: "Contact Us",
          subtitle: "We are always happy to hear from you for your inquiries or suggestions to improve the app.",
          name: "Full Name",
          email: "Email Address",
          message: "Your Message",
          send: "Send Message",
          loading: "Sending...",
          success: "Your message has been sent successfully! Thank you.",
          error: "Failed to send message. Please try again later."
        }
      },
      telegramCard: {
        title: "Telegram Bot Subscription",
        description: "You will be redirected to Telegram to subscribe to the smart bot and share your location for accurate prayer alerts.",
        cta: "Open Bot & Subscribe"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "ar",
    fallbackLng: "ar",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;