import { motion, useScroll, useTransform } from 'motion/react';
import { 
  ChevronDown, History, Sparkles, ShieldCheck, Compass, 
  Moon, Sun, Languages, Book, Download, ExternalLink, ScrollText,
  Award, Star, Zap, Search, Menu, X
} from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

type Language = 'en' | 'ru' | 'tm';

const translations = {
  en: {
    nav: { heritage: "Heritage", anatomy: "Anatomy", library: "Library", gallery: "Gallery" },
    hero: { subtitle: "The Celestial Heritage of the Steppe", slogan: "Turkmenistan — The Land of Gracious Stallions", cta: "View Gallery" },
    history: {
      tag: "Ancient Bloodline",
      title: "The \"Argamak\" of the Desert",
      p1: "The Akhal-Teke is widely considered the oldest horse breed on Earth, a living relic of the ancient \"Argamaks.\" For over 3,000 years, the Ahal and Teke tribes of Turkmenistan cultivated this breed in the isolation of the Karakum Desert. This isolation preserved a genetic purity that is unique among modern horses, making them predecessors to many of the world's finest thoroughbreds.",
      p2: "In 1935, the Akhal-Teke's legendary stamina was proven to the world during the historic ride from Ashgabat to Moscow. A group of riders covered 4,300 kilometers in 84 days, including a 360-kilometer stretch across the waterless Karakum Desert in just three days. This feat remains one of the most remarkable displays of endurance in equine history.",
      stat1: "Pure Heritage",
      stat2: "84 Days Raid"
    },
    anatomy: {
      tag: "Unique Anatomy",
      title: "A Physiological Marvel",
      feature1: { title: "Metallic Sheen", desc: "The hair shaft has an hollow core that reflects and refracts light, giving the coat its mythical golden or silver luminescence." },
      feature2: { title: "Thin Skin", desc: "Their skin is incredibly fine, with prominent veins that help regulate body temperature in extreme desert heat." },
      feature3: { title: "Agility", desc: "Characterized by long, elegant lines. Their gazelle-like neck and slanting shoulders provide an exceptionally smooth ride." },
      feature4: { title: "Metabolism", desc: "Adapted to perform on minimal water and forage, possessing a unique metabolism that prioritizes energy conservation." }
    },
    gallery: {
      tag: "Visual Splendor",
      title: "The Golden Gallery",
      cta: "Explore Archive"
    },
    library: {
      tag: "The written legacy",
      title: "Works of the Arkadag",
      desc: "Download and explore the profound literary works dedicated to the Akhal-Teke horses, authored by National Leader of the Turkmen People, Gurbanguly Berdimuhamedov (Arkadag).",
      book1: "Akhal-Teke: Our Pride and Glory",
      book2: "The Swift Step of the Steed",
      btn: "Download PDF"
    },
    news: {
      tag: "Featured",
      title: "Portal Highlights",
      items: [
        { tag: "UNESCO Heritage", title: "UNESCO recognition of Akhal-Teke breeding traditions", date: "May 15, 2026" },
        { tag: "Economy", title: "Export surge in elite Turkmen bloodlines to Europe", date: "May 14, 2026" },
        { tag: "Festival", title: "International Equestrian Complex prepares for major derby", date: "May 12, 2026" }
      ]
    },
    footer: { 
      text: "Honoring the Celestial Horses of Turkmenistan",
      desc: "\"The Akhal-Teke is our pride, our glory, and our fast-winged dream come true.\" — Dedicated to the preservation of the Turkmen celestial horses.",
      nav: "Navigation",
      contact: "Contact Portal"
    }
  },
  ru: {
    nav: { heritage: "Наследие", anatomy: "Анатомия", library: "Библиотека", gallery: "Галерея" },
    hero: { subtitle: "Небесное наследие степей", slogan: "Туркменистан — Обитель стремительных скакунов", cta: "Смотреть фото" },
    history: {
      tag: "Древняя кровь",
      title: "«Аргамак» пустыни",
      p1: "Ахалтекинская лошадь считается старейшей породой лошадей на Земле, живым реликтом древних «аргамаков». Более 3000 лет племена Ахал и Теке в Туркменистане культивировали эту породу в изоляции пустыни Каракумы. Эта изоляция сохранила генетическую чистоту, уникальную среди современных лошадей.",
      p2: "В 1935 году легендарная выносливость ахалтекинцев была доказана всему миру во время исторического пробега Ашхабад — Москва. Группа всадников преодолела 4300 километров за 84 дня, включая 360-километровый участок по безводной пустыне Каракумы всего за три дня.",
      stat1: "Чистая кровь",
      stat2: "Рейд 84 дня"
    },
    anatomy: {
      tag: "Уникальная анатомия",
      title: "Физиологическое чудо",
      feature1: { title: "Металлический блеск", desc: "Волосяной стержень имеет полую сердцевину, которая отражает свет, придавая шерсти мифическое золотистое или серебристое свечение." },
      feature2: { title: "Тонкая кожа", desc: "Их кожа невероятно тонкая, с выступающими венами, что помогает регулировать температуру тела в экстремальную жару." },
      feature3: { title: "Гибкость", desc: "Характеризуется длинными, элегантными линиями. Шея, похожая на шею газели, обеспечивает исключительно плавную езду." },
      feature4: { title: "Метаболизм", desc: "Адаптированы к работе при минимальном количестве воды и корма, обладая уникальным метаболизмом." }
    },
    gallery: {
      tag: "Визуальное величие",
      title: "Золотая галерея",
      cta: "Исследовать архив"
    },
    library: {
      tag: "Письменное наследие",
      title: "Труды Аркадага",
      desc: "Скачайте и изучите глубокие литературные труды, посвященные ахалтекинским коням, автором которых является Национальный Лидер туркменского народа Гурбангулы Бердимухамедов (Аркадаг).",
      book1: "Ахалтекинец — наша гордость и слава",
      book2: "Стремительный шаг скакуна",
      btn: "Скачать PDF"
    },
    news: {
      tag: "Популярные",
      title: "События Портала",
      items: [
        { tag: "Наследие ЮНЕСКО", title: "Признание ахалтекинского коневодства наследием ЮНЕСКО", date: "15 мая 2026 г." },
        { tag: "Экономика", title: "Рост экспорта элитных ахалтекинских кровей в Европу", date: "14 мая 2026 г." },
        { tag: "Фестиваль", title: "Международный конноспортивный комплекс готовится к дерби", date: "12 мая 2026 г." }
      ]
    },
    footer: { 
      text: "Чествование небесных коней Туркменистана",
      desc: "«Ахалтекинец — наша гордость, наша слава и наша быстрокрылая мечта, ставшая реальностью». — Посвящается сохранению небесных коней.",
      nav: "Навигация",
      contact: "Контактная информация"
    }
  },
  tm: {
    nav: { heritage: "Mirasymyz", anatomy: "Anatomiýasy", library: "Kitaphana", gallery: "Galereýa" },
    hero: { subtitle: "Sähra asman mirasy", slogan: "Türkmenistan Bedew Batly At Myradyň Mekany", cta: "Suratlara seret" },
    history: {
      tag: "Gadymy gan",
      title: "Saýraýan sähranyň «Argamagy»",
      p1: "Ahal-teke bedewi Ýer ýüzündäki iň gadymy at tohumy, gadymy «Argamaklaryň» janly mirasy hasaplanýar. 3000 ýyldan gowrak wagt bäri Türkmenistanyň Ahal we Teke taýpalary bu tohumy Garagum çölüniň çetinde saklap gelipdirler.",
      p2: "1935-nji ýylda Ahal-teke bedewleriniň rowaýaty çydamlylygy Aşgabat — Moskwa taryhy ýöreýişde dünýä subut edildi. Atlylar 4300 kilometr aralygy 84 günde, şol sanda Garagum çölüniň suwsuz 360 kilometrlik bölegini bary-ýogy üç günde geçdiler.",
      stat1: "Arassa nesil",
      stat2: "84 günlük ýöriş"
    },
    anatomy: {
      tag: "Üýtgeşik anatomiýa",
      title: "Fiziologiki gudrat",
      feature1: { title: "Metallaşdyrylan öwüşgin", desc: "Gylaryň gurluşy ýagtylygy serpikdirýän aýratynlyga eýe bolup, oňa altyn ýa-da kümüş öwüşginini berýär." },
      feature2: { title: "Inçe deri", desc: "Olaryň derisi örän inçe bolup, damarlaryň görünmegi bedeniň gyzgynlygyny kadalaşdyrmaga kömek edýär." },
      feature3: { title: "Çyzykly gurluş", desc: "Uzyn we owadan çyzyklar bilen tapawutlanýar. Keýigiňki ýaly boýny we eňňitli gerşi bedewiň ýüzüşini has ýumşak edýär." },
      feature4: { title: "Metabolizm", desc: "Az suw we ot-iým bilen uzak aralyklary geçmäge uýgunlaşan, energiýany tygşytlaýan madda çalşygyna eýedir." }
    },
    gallery: {
      tag: "Gözellik dünýäsi",
      title: "Altyn galereýa",
      cta: "Arhiwi öwren"
    },
    library: {
      tag: "Ýazylan miras",
      title: "Arkadagyň eserleri",
      desc: "Türkmen halkynyň Milli Lideri, Gahryman Arkadagymyz Gurbanguly Berdimuhamedowyň ahal-teke bedewlerine bagyşlan çuň mazmunly kitaplaryny ýükläp alyň.",
      book1: "Ahal-teke bedewi — biziň buýsanjymyz we şöhratymyz",
      book2: "Atda wepa-da bar, sapa-da",
      btn: "PDF Ýükle"
    },
    news: {
      tag: "Möhüm",
      title: "Portal Täzelikleri",
      items: [
        { tag: "ÝUNESKO Mirasy", title: "Ahal-teke atçylyk sungatynyň ÝUNESKO derejesinde ykrar edilmegi", date: "Maý 15, 2026" },
        { tag: "Ykdysadyýet", title: "Ýewropa ýurtlaryna elita ganly bedewleriň eksportynyň artmagy", date: "Maý 14, 2026" },
        { tag: "Baýramçylyk", title: "Halkara atçylyk sport toplumy uly çapyşyklara taýýarlyk görýär", date: "Maý 12, 2026" }
      ]
    },
    footer: { 
      text: "Türkmenistanyň asman bedewlerine hormat",
      desc: "«Ahal-teke bedewi — biziň buýsanjymyz, biziň şöhratymyz we amala aşan ganatly arzuwymyzdyr». — Türkmen asman bedewlerini gorap saklamaga bagyşlanýar.",
      nav: "Nawigasiýa",
      contact: "Habarlaşmak üçin"
    }
  }
};

export default function App() {
  const [lang, setLang] = useState<Language>('tm');
  const [isDark, setIsDark] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const t = translations[lang];

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div ref={containerRef} className="relative min-h-screen selection:bg-accent/30 selection:text-white transition-colors duration-500 bg-background text-foreground">
      {/* Turkmenportal Style Header */}
      <header className="fixed top-0 left-0 w-full z-[100] bg-white border-b border-gray-100 transition-all duration-300">
        {/* Top Utility Ticker Bar */}
        <div className="bg-accent text-white/90 py-2 px-6 text-[10px] uppercase font-bold tracking-[0.2em] hidden md:flex overflow-hidden relative">
          <div className="animate-ticker flex whitespace-nowrap gap-12 items-center">
             <span>⚡ {lang === 'tm' ? 'Täze nesil bedewleriň gözleg merkezi açyldy' : 'New generation horse research center opened'}</span>
             <span>⭐ {lang === 'tm' ? 'Halkara bedew baýramyna taýýarlyk' : 'Preparation for International Horse Festival'}</span>
             <span>🏆 {lang === 'tm' ? 'Bedew — Türkmeniň ganaty we buýsanjy' : 'Bedew — The wings and pride of the Turkmen'}</span>
             <span>⚡ {lang === 'tm' ? 'Täze nesil bedewleriň gözleg merkezi açyldy' : 'New generation horse research center opened'}</span>
             <span>⭐ {lang === 'tm' ? 'Halkara bedew baýramyna taýýarlyk' : 'Preparation for International Horse Festival'}</span>
             <span>🏆 {lang === 'tm' ? 'Bedew — Türkmeniň ganaty we buýsanjy' : 'Bedew — The wings and pride of the Turkmen'}</span>
          </div>
        </div>

        {/* Info Bar */}
        <div className="bg-gray-50 border-b border-gray-100 py-2 px-6 hidden md:flex justify-between items-center text-[10px] font-bold text-foreground/50">
          <div className="flex gap-6">
            <span>{new Date().toLocaleDateString(lang === 'ru' ? 'ru-RU' : lang === 'en' ? 'en-US' : 'tm-TM', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
            <span className="flex items-center gap-1"><Zap size={10} fill="currentColor" className="text-tm-gold"/> Ashgabat +32°C</span>
          </div>
          <div className="flex gap-6">
             <div className="flex gap-4 border-r border-gray-200 pr-6 mr-6">
                <span>USD: 3.50</span>
                <span>EUR: 3.82</span>
             </div>
             <div className="flex gap-4">
                <a href="#" className="hover:text-accent transition-colors">RSS</a>
                <a href="#" className="hover:text-accent transition-colors">ADVERTISING</a>
                <a href="#" className="hover:text-accent transition-colors">CONTACT</a>
             </div>
          </div>
        </div>

        {/* Main Header Area */}
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 cursor-pointer shrink-0"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center text-white shadow-xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" />
              <Award size={32} className="relative z-10 group-hover:rotate-12 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif italic text-3xl font-black text-accent-deep leading-none tracking-tight">BEDEW</span>
              <div className="flex items-center gap-2 mt-1">
                 <span className="h-0.5 w-4 bg-tm-red rounded-full" />
                 <span className="text-[10px] font-black tracking-[0.3em] text-foreground/40 uppercase">Heritage Portal</span>
              </div>
            </div>
          </motion.div>

          {/* Search Bar - Turkmenportal like */}
          <div className="hidden lg:flex flex-grow max-w-md relative">
            <input 
              type="text" 
              placeholder={lang === 'tm' ? 'Gözleg...' : lang === 'ru' ? 'Поиск...' : 'Search...'}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/30 hover:text-accent transition-colors">
              <Search size={16} />
            </button>
          </div>

          {/* Controls & Mini Nav */}
          <div className="flex items-center gap-3">
            <nav className="hidden xl:flex items-center gap-1">
              {[
                { label: t.nav.heritage, href: "#history" },
                { label: t.nav.anatomy, href: "#traits" },
                { label: t.nav.gallery, href: "#gallery" }
              ].map((item) => (
                <a 
                  key={item.href} 
                  href={item.href} 
                  className="px-4 py-2 text-[10px] font-black tracking-widest uppercase text-foreground/60 hover:text-accent transition-all"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="h-6 w-px bg-gray-100 mx-2 hidden xl:block" />

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsDark(!isDark)}
                className="p-2.5 rounded-xl border border-gray-100 bg-gray-50 text-foreground/60 hover:text-accent transition-all hidden sm:block"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <div className="relative">
                <button 
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50 text-[10px] font-black tracking-widest uppercase text-foreground/60 hover:border-accent transition-all"
                >
                  <Languages size={14} />
                  <span>{lang}</span>
                </button>
                {showLangMenu && (
                  <div className="absolute right-0 top-full mt-2 flex flex-col gap-1 bg-white rounded-xl p-2 shadow-2xl min-w-[140px] border border-gray-100 z-[110] text-foreground animate-in slide-in-from-top-2">
                    {(['tm', 'ru', 'en'] as Language[]).map((l) => (
                      <button
                        key={l}
                        onClick={() => { setLang(l); setShowLangMenu(false); }}
                        className={`px-4 py-2 text-[10px] tracking-widest uppercase rounded-lg text-left font-black ${lang === l ? 'bg-accent text-white' : 'hover:bg-accent/10 hover:text-accent opacity-60'}`}
                      >
                        {l === 'tm' ? 'Türkmen' : l === 'ru' ? 'Русский' : 'English'}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2.5 rounded-xl bg-accent text-white hover:bg-accent-deep transition-all lg:hidden"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 p-6 flex flex-col gap-4 shadow-2xl"
          >
            {[
              { label: t.nav.heritage, href: "#history" },
              { label: t.nav.anatomy, href: "#traits" },
              { label: t.nav.gallery, href: "#gallery" },
              { label: t.nav.library, href: "#library" }
            ].map((item) => (
              <a 
                key={item.href} 
                href={item.href} 
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-black tracking-widest uppercase text-foreground/70 hover:text-accent flex items-center justify-between"
              >
                {item.label}
                <ChevronDown size={14} className="-rotate-90" />
              </a>
            ))}
            <div className="pt-4 border-t border-gray-100 flex gap-4">
               <button onClick={() => setIsDark(!isDark)} className="p-3 bg-gray-50 rounded-xl flex-1 flex justify-center">
                 {isDark ? <Sun size={20} /> : <Moon size={20} />}
               </button>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden mt-20">
        <motion.div 
          style={{ y: yHero, opacity: opacityHero }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://www.mfa.gov.tm/unesco/photos/at/11.jpg?v=2"
            alt="Akhal-Teke Horse"
            className="w-full h-full object-cover brightness-[0.4]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-accent-deep/50" />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-6xl w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="flex flex-col items-center gap-6 mb-12"
          >
            <div className="flex items-center gap-6">
              <span className="h-[3px] w-16 bg-tm-gold rounded-full" />
              <p className="text-tm-gold font-black text-xl md:text-3xl tracking-[0.4em] uppercase drop-shadow-lg">
                {t.hero.subtitle}
              </p>
              <span className="h-[3px] w-16 bg-tm-gold rounded-full" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1.2, ease: "circOut" }}
            className="relative"
          >
            <h1 className="relative text-white font-serif text-5xl md:text-7xl lg:text-9xl leading-[0.85] tracking-tighter drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] mb-12">
              <span className="block text-white opacity-95">{lang === 'tm' ? 'Sähra asman' : 'Celestial'}</span>
              <span className="block text-tm-gold italic">{lang === 'tm' ? 'mirasy' : 'Heritage'}</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex flex-col items-center gap-8"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-tm-gold rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
              <a 
                href="#gallery"
                className="relative px-16 py-7 bg-white text-accent rounded-full font-black text-sm tracking-[0.6em] uppercase hover:bg-tm-gold hover:text-white transition-all duration-500 shadow-2xl flex items-center gap-4"
              >
                {t.hero.cta}
                <ChevronDown className="animate-bounce" size={18} />
              </a>
            </div>
            
            {lang !== 'tm' && (
              <p className="text-white/60 text-[10px] tracking-[0.7em] uppercase font-bold bg-black/20 px-6 py-2 rounded-full backdrop-blur-sm border border-white/10">
                — {t.hero.slogan} —
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Flag Carpet Inspired Divider */}
      <div className="h-6 w-full flex overflow-hidden shadow-2xl relative z-20">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`flex-1 h-full border-r border-tm-gold/20 ${i % 3 === 0 ? 'bg-accent' : i % 3 === 1 ? 'bg-tm-red' : 'bg-white'}`} />
        ))}
      </div>

      {/* Featured News Section - Portal Style */}
      <section className="py-16 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12 border-b border-gray-200 pb-6">
             <div className="bg-tm-red text-white px-6 py-2 rounded-lg text-xs font-black tracking-widest uppercase">
               {t.news.tag}
             </div>
             <h3 className="text-xl font-black text-foreground/80 tracking-tight">{t.news.title}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.news.items.map((news, i) => {
              const images = [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfOQma7w-WkYfW-1AAQSW6ZBqYwkdz-IsOBw&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdrmk7rz6EoqZHn0AY-6BNjUwFMkjxQC1LZA&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI9Allbt6OMs5y1al9FnqeyB6W1HBky_JEtA&s"
              ];
              return (
                <motion.div 
                  key={i}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img src={images[i]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                    <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider">
                      {news.tag}
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] text-foreground/40 font-bold mb-2 block">{news.date}</span>
                    <h4 className="font-bold text-lg leading-snug group-hover:text-accent transition-colors">
                      {news.title}
                    </h4>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


      {/* History Section */}
      <section id="history" className="py-16 md:py-28 px-6 bg-surface transition-colors duration-500 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-tm-red/5 rounded-full blur-3xl -ml-48 -mb-48" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
          >
            <div className="lg:col-span-12 mb-6">
               <span className="inline-block px-4 py-1 bg-accent/10 text-accent text-[10px] font-bold tracking-[0.4em] uppercase rounded-full mb-4">
                 {t.history.tag}
               </span>
               <h2 className="text-4xl md:text-6xl font-serif leading-[1.1] text-foreground italic">
                 {t.history.title}
               </h2>
            </div>
            
            <div className="lg:col-span-7 space-y-6 text-foreground/80 leading-relaxed text-lg font-light">
              <p className="first-letter:text-6xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-accent">
                {t.history.p1}
              </p>
              <p>{t.history.p2}</p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 gap-6">
              <div className="p-8 rounded-[2rem] bg-accent text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                <span className="block text-4xl md:text-5xl font-serif mb-2">{t.history.stat1}</span>
                <span className="text-[11px] uppercase tracking-[0.3em] font-bold opacity-80">Genetic Purity</span>
              </div>
              <div className="p-8 rounded-[2rem] bg-tm-red text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                <span className="block text-4xl md:text-5xl font-serif mb-2">{t.history.stat2}</span>
                <span className="text-[11px] uppercase tracking-[0.3em] font-bold opacity-80">Ashgabat - Moscow</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Traits Grid */}
      <section id="traits" className="py-16 md:py-24 bg-accent transition-colors duration-500 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-tm-gold text-xs font-bold tracking-[0.5em] uppercase block mb-4">{t.anatomy.tag}</span>
            <h2 className="text-4xl md:text-6xl font-serif text-white">{t.anatomy.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Sparkles />, title: t.anatomy.feature1.title, desc: t.anatomy.feature1.desc, color: 'bg-white' },
              { icon: <ShieldCheck />, title: t.anatomy.feature2.title, desc: t.anatomy.feature2.desc, color: 'bg-tm-gold text-accent' },
              { icon: <Compass />, title: t.anatomy.feature3.title, desc: t.anatomy.feature3.desc, color: 'bg-tm-red text-white' },
              { icon: <History />, title: t.anatomy.feature4.title, desc: t.anatomy.feature4.desc, color: 'bg-white' }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`${feature.color} p-8 rounded-[2rem] shadow-2xl transition-all duration-500 group cursor-default h-full flex flex-col`}
              >
                <div className="mb-6 transform group-hover:rotate-12 transition-transform duration-500">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-black/5">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-serif mb-4">{feature.title}</h3>
                <p className="opacity-80 text-xs leading-relaxed flex-grow">
                  {feature.desc}
                </p>
                <div className="mt-6 pt-4 border-t border-black/5">
                   <div className="text-[9px] font-bold tracking-widest uppercase opacity-40">Detail 0{idx + 1}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 md:py-32 px-6 bg-white transition-colors duration-500 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[40%] h-full bg-accent/3 -skew-x-12 translate-x-24 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-3xl text-left border-l-[8px] border-accent pl-8">
              <span className="text-accent text-[10px] font-black tracking-[0.6em] uppercase block mb-6">{t.gallery.tag}</span>
              <h2 className="text-5xl md:text-8xl font-serif italic text-accent-deep tracking-tighter leading-none mb-3">
                {t.gallery.title}
              </h2>
              <div className="h-1.5 w-24 bg-tm-gold rounded-full" />
            </div>
            <div className="flex gap-4">
               <button className="group relative px-10 py-5 bg-accent-deep text-white rounded-xl font-black text-[10px] tracking-widest uppercase overflow-hidden shadow-xl shadow-accent/30">
                 <div className="absolute inset-0 bg-tm-red translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                 <span className="relative z-10">{t.gallery.cta || 'Explore Archive'}</span>
               </button>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "https://www.ussatnews.com/storage/posts/1323/original-160be530d37ae9.jpeg",
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfOQma7w-WkYfW-1AAQSW6ZBqYwkdz-IsOBw&s",
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdrmk7rz6EoqZHn0AY-6BNjUwFMkjxQC1LZA&s",
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI9Allbt6OMs5y1al9FnqeyB6W1HBky_JEtA&s",
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoYRWeXYCLkx988_ILVbeIK4ItbazV1090qA&s",
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5djbDLw9wVXO7nTEv5d3klYT5x2pdKZQXyg&s"
            ].map((url, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] group cursor-pointer shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] bg-gray-50 border border-gray-100 hover:shadow-[0_40px_80px_-20px_rgba(0,146,63,0.2)] transition-all duration-500"
              >
                <img
                  src={url}
                  alt={`Akhal-Teke HD ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent-deep/95 via-accent-deep/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-10 text-white translate-y-4 group-hover:translate-y-0">
                   <div className="flex items-center gap-4">
                     <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-2xl flex items-center justify-center border border-white/20 shadow-xl">
                        <Star size={24} className="text-tm-gold" fill="currentColor" />
                     </div>
                     <div className="flex flex-col">
                       <span className="font-black tracking-[0.4em] text-[9px] uppercase text-tm-gold mb-1">Heritage Asset</span>
                       <span className="font-serif text-2xl italic leading-none">Celestial Spirit 0{idx + 1}</span>
                     </div>
                   </div>
                   <div className="mt-8 flex gap-3">
                      {['Endurance', 'Elegance', 'Purity'].map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-[9px] font-bold uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Library Section */}
      <section id="library" className="py-16 md:py-32 px-6 bg-tm-gold/10 transition-colors duration-500 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-surface to-transparent" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <span className="inline-block px-4 py-1 bg-tm-red/10 text-tm-red text-[10px] font-bold tracking-[0.4em] uppercase rounded-full mb-6">{t.library.tag}</span>
              <h2 className="text-4xl md:text-6xl font-serif mb-8 text-foreground italic leading-tight">{t.library.title}</h2>
              <p className="text-foreground/70 text-lg mb-10 leading-relaxed font-light">
                {t.library.desc}
              </p>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-white shadow-xl">
                  <Book size={24} />
                </div>
                <div>
                   <span className="block font-bold text-foreground">Available in 3 Languages</span>
                   <span className="text-sm opacity-60">Digital Archives</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 w-full space-y-6">
              {[
                { title: t.library.book1, url: "https://maslahat.gov.tm/api/v1/uploads/books/1679100756182234067.pdf", icon: <Award className="text-tm-gold" /> },
                { title: t.library.book2, url: "https://maslahat.gov.tm/api/v1/uploads/books/1682487482595996212.pdf", icon: <Star className="text-tm-red" /> }
              ].map((book, i) => (
                <motion.a
                  key={i}
                  href={book.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, x: 10 }}
                  className="flex items-center justify-between p-10 rounded-[2.5rem] border border-white bg-white shadow-xl hover:shadow-2xl hover:border-accent group transition-all"
                >
                  <div className="flex items-center gap-8">
                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                      {book.icon}
                    </div>
                    <div>
                      <h4 className="font-serif text-2xl mb-2 text-foreground">{book.title}</h4>
                      <span className="text-[10px] uppercase tracking-[0.3em] font-black text-accent">{t.library.btn}</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all">
                    <Download size={20} />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-accent-deep text-white pt-24 pb-12 transition-colors duration-500 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-tm-red via-tm-gold to-accent" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/10">
                    <Award size={32} className="text-tm-gold" />
                 </div>
                 <div className="flex flex-col">
                   <h4 className="font-serif text-4xl italic font-bold leading-none">BEDEW</h4>
                   <span className="text-[10px] font-black tracking-[0.4em] text-tm-gold uppercase mt-2">National Heritage Portal</span>
                 </div>
              </div>
              <p className="text-white/40 text-lg leading-relaxed max-w-md font-light italic">
                {t.footer.desc}
              </p>
              <div className="flex gap-4 mt-10">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-accent-deep transition-all cursor-pointer">
                    <Sparkles size={16} />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-8">
               <h5 className="text-[10px] uppercase tracking-[0.4em] font-black text-tm-gold">{t.footer.nav}</h5>
               <ul className="space-y-4 text-white/50 text-sm font-bold tracking-wider">
                 <li><a href="#history" className="hover:text-white transition-colors">{t.nav.heritage}</a></li>
                 <li><a href="#traits" className="hover:text-white transition-colors">{t.nav.anatomy}</a></li>
                 <li><a href="#gallery" className="hover:text-white transition-colors">{t.nav.gallery}</a></li>
                 <li><a href="#library" className="hover:text-white transition-colors">{t.nav.library}</a></li>
               </ul>
            </div>
 
            <div className="space-y-8">
               <h5 className="text-[10px] uppercase tracking-[0.4em] font-black text-tm-gold">{t.footer.contact}</h5>
               <ul className="space-y-4 text-white/50 text-sm font-bold tracking-wider">
                 <li className="flex items-center gap-3">
                   <Compass size={16} className="text-tm-red" />
                   <span>Ashgabat, Turkmenistan</span>
                 </li>
                 <li>International Association</li>
                 <li className="flex items-center gap-3 text-accent transition-colors hover:text-white cursor-pointer">
                   <ExternalLink size={16} />
                   <span>Access Gov.TM</span>
                 </li>
                 <li className="pt-4">
                   <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                     <span className="text-[9px] block mb-2 opacity-50 uppercase">Helpline</span>
                     <span className="text-white font-black">+993 12 00-00-00</span>
                   </div>
                 </li>
               </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-black">
              © 2026 Bedew Heritage — {t.footer.text}
            </p>
            <div className="flex gap-10 text-white/20 text-[10px] font-black uppercase tracking-[0.2em]">
              <a href="#" className="hover:text-tm-gold transition-colors">Legal Policy</a>
              <a href="#" className="hover:text-tm-gold transition-colors">Terms of Usage</a>
              <a href="#" className="hover:text-tm-gold transition-colors">Portal Map</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
