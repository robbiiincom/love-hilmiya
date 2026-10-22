import React, { useState, useEffect } from 'react';
import { 
  Heart, Calendar, Clock, Volume2, 
  VolumeX, HeartHandshake, Gem, Flame,
  ChevronDown, Check, ChevronLeft, ChevronRight
} from 'lucide-react';

export default function App() {
  // ---------------- STATIC DATA & CONFIGURATION ----------------
  
  // 1. Relationship Start Date (Ubah langsung di sini)
  const startDate = "2025-10-10T17:25";

  // 2. Relationship Status Index (0: Saling Mengenal, 1: Pacaran, 2: Lamaran, 3: Menikah)
  const currentStatusIdx = 0;

  // 3. Status Levels Definitions
  const statusLevels = [
    { title: "Saling Mengenal", desc: "Perjalanan untuk saling mengenal satu sama lain", icon: HeartHandshake, badge: "Masa Perkenalan" },
    { title: "Pacaran", desc: "Resmi menjalin hubungan dan berkomitmen bersama", icon: Heart, badge: "Sedang Berjalan" },
    { title: "Lamaran", desc: "Mengikat janji suci menuju jenjang pernikahan", icon: Gem, badge: "Langkah Serius" },
    { title: "Menikah", desc: "Bersatu dalam ikatan suci pernikahan seumur hidup", icon: Flame, badge: "Abadi Selamanya" }
  ];

  // 4. Photos Data (Ubah/Tambah foto langsung di sini)
  const mainPhoto = 'https://cdn.phototourl.com/member/2026-10-22-e6489299-3a93-4c9f-ae7d-cf91a1191878.jpg';
  const heroPhoto = 'https://cdn.phototourl.com/member/2026-10-22-cc0ec550-b512-4dcc-96de-d7e082f12bce.jpg';

  const photos = [
    { id: '1', url: 'https://cdn.phototourl.com/member/2026-10-22-8bbdd593-f07c-4b39-9964-c5a5b170e3ee.jpg', caption: 'Beli Eskrim di pasar sederhana' },
    { id: '2', url: 'https://cdn.phototourl.com/member/2026-10-22-73c86722-85a7-4d26-b311-d3cc11d06b18.jpg', caption: 'Ngopi di kabuci' },
    { id: '3', url: 'https://cdn.phototourl.com/member/2026-10-22-40176a16-ce96-4cf6-959d-e2fda2a0e5f4.jpg', caption: 'Makan Eskrim' },
    { id: '4', url: 'https://cdn.phototourl.com/member/2026-10-22-cc0ec550-b512-4dcc-96de-d7e082f12bce.jpg', caption: 'Ngevlog dimotor' }
  ];

  // 5. 4 Love Messages (Ubah kata-kata cinta langsung di sini)
  const loveNotes = [
    {
      id: 1,
      title: "Aku Kagum Padamu",
      content: "Pertama kali aku melihatmu, ketertarikan itu mulai tumbuh. Aku coba menghubungimu lewat chat, tapi saat itu aku merasa bingung masih ragu dan sadar diri. Hingga suatu hari aku melihatmu di parkiran pondok di sanalah aku benar-benar jatuh cinta. Ditambah lagi kekagumanku setelah mendengar cerita tentangmu. Sejak itu, seakan tak ada rasa malu lagi untuk mengejarmu. Tapi apalah daya, cinta memang harus diperjuangkan."
    },
    {
      id: 2,
      title: "Rumah Tempatku Pulang",
      content: "Sejak mengenalmu, ada dorongan dalam diriku untuk berubah menjadi pribadi yang lebih baik, bukan karena kamu memintanya, tapi karena aku ingin layak berdiri di sampingmu."
    },
    {
      id: 3,
      title: "Doa & Harapan Indah",
      content: "Setiap langkah yang kita lewati mengajarkanku arti kesabaran dan ketulusan buat aku. Semoga hubungan kita senantiasa dipenuhi kehangatan, kebahagiaan, dan kemudahan hingga hari yang aku mimpikan itu terjadi."
    },
    {
      id: 4,
      title: "Janji Setia Bersamamu",
      content: "Tidak pernah ada penyesalan dalam memilihmu. Apapun rintangan yang menghadang kita, aku janji akan selalu ada di sampingmu, berjuang bersamamu, Aamin"
    }
  ];

  // ---------------- APP STATE ----------------
  const [activeNoteIdx, setActiveNoteIdx] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Live Timer State
  const [timeElapsed, setTimeElapsed] = useState({
    years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0, totalDays: 0
  });

  // ---------------- SCROLL REVEAL & HEADER OBSERVER ----------------
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // ---------------- LIVE COUNTER LOGIC ----------------
  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(startDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, now - start);

      const seconds = Math.floor((diff / 1000) % 60);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));

      const startObj = new Date(startDate);
      const nowObj = new Date();

      let years = nowObj.getFullYear() - startObj.getFullYear();
      let months = nowObj.getMonth() - startObj.getMonth();
      let days = nowObj.getDate() - startObj.getDate();

      if (days < 0) {
        months -= 1;
        const prevMonth = new Date(nowObj.getFullYear(), nowObj.getMonth(), 0);
        days += prevMonth.getDate();
      }
      if (months < 0) {
        years -= 1;
        months += 12;
      }

      setTimeElapsed({
        years: Math.max(0, years),
        months: Math.max(0, months),
        days: Math.max(0, days),
        hours,
        minutes,
        seconds,
        totalDays
      });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [startDate]);

  return (
    <div className="min-h-screen bg-[#f7f2ed] text-[#3d322c] font-sans selection:bg-[#b87355] selection:text-white relative overflow-x-hidden">
      
      {/* Google Fonts & Scroll Reveal CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

        .font-serif-headline { font-family: 'Playfair Display', Georgia, serif; }
        .font-serif-sub { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-script { font-family: 'Great Vibes', cursive; }
        .font-sans-clean { font-family: 'Plus Jakarta Sans', sans-serif; }

        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(35px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        .reveal-active {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* BGM Audio Player */}
      {isPlayingMusic && (
        <audio
          autoPlay
          loop
          src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3"
        />
      )}

      {/* =================================================== */}
      {/* TOP NAVIGATION BAR                                  */}
      {/* =================================================== */}
      <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 rounded-none border-b ${
        isScrolled 
          ? 'bg-[#2a1f1b]/95 backdrop-blur-md py-4 shadow-xl border-[#3d2f2a]' 
          : 'bg-black/30 backdrop-blur-sm py-5 border-white/10'
      }`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between text-white">
          
          <div className="flex items-center gap-4">
            <span className="font-serif-headline text-2xl tracking-wider text-amber-100 italic">H</span>
            <span className="text-xs uppercase tracking-[0.25em] text-white/90 font-light border-l border-white/30 pl-4">
              Robi & Hilmiya
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest text-white/90 font-medium">
            <a href="#hero" className="hover:text-amber-200 transition">Awal</a>
            <a href="#surat" className="hover:text-amber-200 transition">Pesan Cinta</a>
            <a href="#galeri" className="hover:text-amber-200 transition">Galeri</a>
            <a href="#counter" className="hover:text-amber-200 transition">Hitungan Waktu</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlayingMusic(!isPlayingMusic)}
              className="p-2.5 bg-white/10 hover:bg-white/20 text-white transition border border-white/20 flex items-center gap-2 px-4 text-xs tracking-wider rounded-lg"
              title="Musik Romantis"
            >
              {isPlayingMusic ? <Volume2 className="w-4 h-4 animate-pulse text-amber-300" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">{isPlayingMusic ? 'Musik Aktif' : 'Musik'}</span>
            </button>
          </div>

        </div>
      </header>

      {/* =================================================== */}
      {/* HERO BANNER SECTION                                 */}
      {/* =================================================== */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center p-6 sm:p-12">
        <div className="absolute inset-0 z-0">
          <img
            src={heroPhoto}
            alt="Hero Background"
            className="w-full h-full object-cover filter brightness-[0.65] contrast-[0.95]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2a1f1b] via-[#2a1f1b]/40 to-black/50" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6 pt-20 reveal-on-scroll">
          <span className="inline-block px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs uppercase tracking-[0.3em] text-amber-100 font-sans-clean font-medium">
            Sebuah Dedikasi Cinta Dariku
          </span>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif-headline text-white font-normal uppercase tracking-tight leading-none drop-shadow-2xl">
            UNTUK HILIMIYA HAZIMAH ZAELANI
          </h1>

          <p className="text-base sm:text-xl text-white/90 font-serif-sub italic max-w-xl mx-auto font-light leading-relaxed">
            "Setiap detik perjalanan ini ditulis dengan kasih sayang, ketulusan, dan harapan."
          </p>

          <div className="pt-4">
            <a
              href="#surat"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#b87355] hover:bg-[#a05f43] text-white text-xs uppercase tracking-[0.2em] font-medium transition-all rounded-2xl shadow-2xl hover:scale-105"
            >
              <span>Jelajahi Pesan Cinta</span>
              <Heart className="w-4 h-4 fill-current" />
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/60 animate-bounce">
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* =================================================== */}
      {/* STATEMENT BANNER                                   */}
      {/* =================================================== */}
      <section className="py-16 sm:py-20 px-6 max-w-6xl mx-auto reveal-on-scroll">
        <div className="bg-[#f3e3de] rounded-3xl p-8 sm:p-14 text-center space-y-4 border border-[#e5cfc6] shadow-sm">
          <span className="px-4 py-1.5 bg-[#8f5338]/10 text-[#8f5338] text-xs uppercase tracking-[0.25em] font-sans-clean font-semibold rounded-full inline-block">
           Kenangan Robi & Hilimiya
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif-headline text-[#3d322c] uppercase tracking-tight leading-snug">
            TERIMA KASIH TELAH HADIR DAN MEWARNAI SETIAP HARI-HARIKU.
          </h2>
          <p className="text-base sm:text-lg font-serif-sub italic text-[#6e584d] max-w-2xl mx-auto pt-2">
            Mencintaimu adalah hal terindah yang terjadi dalam hidupku. Halaman ini adalah tempat khusus untuk merayakan setiap langkah dan memori indah kita.
          </p>
        </div>
      </section>

      {/* =================================================== */}
      {/* SEGMENT 1: 4 LOVE MESSAGES (READ-ONLY)             */}
      {/* =================================================== */}
      <section id="surat" className="py-12 sm:py-20 px-6 sm:px-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Portrait Photo */}
          <div className="lg:col-span-5 relative reveal-on-scroll">
            <div className="relative group overflow-hidden rounded-3xl shadow-2xl border-8 border-white bg-white">
              <img
                src={mainPhoto}
                alt="Hilimiya"
                className="w-full h-[480px] sm:h-[580px] object-cover filter contrast-[1.02] group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Right Column: 4 Love Messages Container */}
          <div className="lg:col-span-7 space-y-6 lg:pl-4 reveal-on-scroll">
            
            <div className="space-y-2">
              <span className="font-script text-4xl sm:text-5xl text-[#b87355] block">
                Dengan Sepenuh Hati,
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif-headline text-[#3d322c] uppercase tracking-wide leading-tight">
                UNTUKMU HILIMIYA HAZIMAH ZAELANI
              </h3>
            </div>

            {/* Tab Selector for 4 Love Messages */}
            <div className="flex flex-wrap gap-2 pt-2">
              {loveNotes.map((note, idx) => (
                <button
                  key={note.id}
                  onClick={() => setActiveNoteIdx(idx)}
                  className={`px-4 py-2.5 rounded-full text-xs font-sans-clean font-semibold tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                    activeNoteIdx === idx
                      ? 'bg-[#b87355] text-white shadow-md scale-105'
                      : 'bg-[#efe5dd] text-[#6e584d] hover:bg-[#e2d3c7]'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${activeNoteIdx === idx ? 'fill-current text-white' : 'text-[#b87355]'}`} />
                  <span>Pesan {idx + 1}</span>
                </button>
              ))}
            </div>

            {/* Active Love Message Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e2d3c7] shadow-xl space-y-5 transition-all duration-500">
              
              <div className="border-b border-[#f3e3de] pb-4">
                <span className="text-[11px] uppercase tracking-widest text-[#8f5338] font-bold block mb-1">
                  Pesan {activeNoteIdx + 1} dari 4
                </span>
                <h4 className="text-xl font-serif-headline font-bold text-[#3d322c]">
                  {loveNotes[activeNoteIdx].title}
                </h4>
              </div>

              <div className="space-y-4">
                <p className="text-base sm:text-lg font-serif-sub italic text-[#52433b] leading-relaxed">
                  "{loveNotes[activeNoteIdx].content}"
                </p>
                <p className="text-xs font-sans-clean font-semibold text-[#8f5338] not-italic pt-2">
                  — Robi Kurniawan❤️
                </p>
              </div>

              {/* Navigation Arrows for Messages */}
              <div className="flex items-center justify-between pt-2 text-xs text-[#8f5338]">
                <button
                  onClick={() => setActiveNoteIdx((prev) => (prev === 0 ? 3 : prev - 1))}
                  className="flex items-center gap-1 font-semibold hover:text-[#3d322c] transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Pesan Sebelumnya</span>
                </button>
                <button
                  onClick={() => setActiveNoteIdx((prev) => (prev === 3 ? 0 : prev + 1))}
                  className="flex items-center gap-1 font-semibold hover:text-[#3d322c] transition"
                >
                  <span>Pesan Selanjutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =================================================== */}
      {/* PHOTO GALLERY GRID                                  */}
      {/* =================================================== */}
      <section id="galeri" className="py-16 bg-[#efe5dd] border-y border-[#e2d3c7]">
        <div className="max-w-6xl mx-auto px-6 space-y-8 reveal-on-scroll">
          <div>
            <span className="px-3.5 py-1 bg-[#8f5338]/10 text-[#8f5338] text-xs uppercase tracking-[0.25em] font-sans-clean font-semibold rounded-full inline-block">
              Koleksi Foto Bersama
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif-headline text-[#3d322c] uppercase mt-1">
              Galeri Kenangan Indah
            </h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {photos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="group relative h-64 sm:h-80 bg-white p-2 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-[#d8c8bd] reveal-on-scroll"
              >
                <div className="w-full h-full overflow-hidden rounded-2xl relative">
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                </div>
                
                <div className="absolute bottom-4 inset-x-4 p-3 bg-white/90 backdrop-blur-md rounded-2xl transition-all text-center">
                  <p className="text-xs font-serif-sub font-semibold text-[#3d322c] truncate">{photo.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================== */}
      {/* SEGMENT 2: LIVE COUNTER & STATUS                    */}
      {/* =================================================== */}
      <section id="counter" className="py-20 sm:py-28 px-6 sm:px-12 max-w-6xl mx-auto space-y-20">
        
        {/* LIVE TIME COUNTER */}
        <div className="space-y-8 text-center reveal-on-scroll">
          <div className="space-y-3">
            <span className="px-4 py-1.5 bg-[#8f5338]/10 text-[#8f5338] text-xs uppercase tracking-[0.25em] font-sans-clean font-semibold rounded-full inline-block">
              Setiap Detik Yang Berharga
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif-headline text-[#3d322c] uppercase">
              Hitungan Waktu Kita Bersama
            </h2>
            <p className="text-xs sm:text-sm text-[#6e584d] pt-1">
              Dimulai Sejak: <strong>{new Date(startDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</strong>
            </p>
          </div>

          {/* Time Display Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {[
              { label: 'Tahun', value: timeElapsed.years },
              { label: 'Bulan', value: timeElapsed.months },
              { label: 'Hari', value: timeElapsed.days },
              { label: 'Jam', value: timeElapsed.hours },
              { label: 'Menit', value: timeElapsed.minutes },
              { label: 'Detik', value: timeElapsed.seconds }
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 bg-white rounded-3xl border border-[#e2d3c7] shadow-md text-center space-y-1 hover:border-[#b87355] transition"
              >
                <div className="text-3xl sm:text-4xl font-serif-headline text-[#b87355] font-semibold">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-[11px] uppercase tracking-widest text-[#8f5338] font-bold">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs font-serif-sub text-xl italic text-[#6e584d]">
            Total perjalanan kita telah berlangsung selama <strong className="text-[#b87355] font-semibold">{timeElapsed.totalDays} hari</strong> ❤️
          </p>
        </div>

        {/* RELATIONSHIP STATUS TRACKER (READ-ONLY DISPLAY) */}
        <div className="space-y-10 pt-10 border-t border-[#e2d3c7] reveal-on-scroll">
          <div>
            <span className="px-3.5 py-1 bg-[#8f5338]/10 text-[#8f5338] text-xs uppercase tracking-[0.25em] font-sans-clean font-semibold rounded-full inline-block">
              Jejak Perjalanan Kita
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif-headline text-[#3d322c] uppercase mt-1">
              Status Hubungan Saat Ini
            </h3>
          </div>

          {/* Status Display Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statusLevels.map((lvl, index) => {
              const IconComp = lvl.icon;
              const isActive = index === currentStatusIdx;
              const isPassed = index <= currentStatusIdx;

              return (
                <div
                  key={index}
                  className={`p-6 rounded-3xl bg-white border transition-all duration-300 relative space-y-4 ${
                    isActive 
                      ? 'border-[#b87355] ring-4 ring-[#b87355]/20 shadow-xl -translate-y-1' 
                      : isPassed
                      ? 'border-[#d4a373]/50 opacity-90'
                      : 'border-[#e2d3c7] opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`p-3.5 rounded-2xl ${isActive ? 'bg-[#b87355] text-white' : 'bg-[#f3e3de] text-[#b87355]'}`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    {isActive && (
                      <span className="px-3 py-1 bg-[#b87355] text-white text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>Aktif</span>
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#8f5338] font-bold block">{lvl.badge}</span>
                    <h4 className="text-xl font-serif-headline text-[#3d322c] font-bold mt-0.5">{lvl.title}</h4>
                    <p className="text-xs text-[#6e584d] mt-2 leading-relaxed">{lvl.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="bg-[#2a1f1b] text-white/80 py-12 px-6 text-center border-t border-[#3d2f2a] space-y-4">
        <div className="font-serif-headline text-2xl tracking-widest text-white italic">
          Robi & Hilmiya
        </div>
        <p className="text-xs text-white/60 font-sans-clean tracking-wider max-w-md mx-auto">
          Dibuat dengan segenap kasih sayang untuk merayakan setiap momen berharga bersamamu.
        </p>
        <div className="pt-2 text-[10px] uppercase tracking-widest text-white/40">
          © {new Date().getFullYear()} • Selamanya Bersama
        </div>
      </footer>

      {/* PHOTO LIGHTBOX MODAL */}
      {selectedPhoto && (
        <div 
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative max-w-3xl w-full bg-white p-3 rounded-3xl shadow-2xl"
          >
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.caption}
              className="w-full max-h-[75vh] object-contain rounded-2xl bg-black"
            />
            <div className="p-4 bg-white text-center">
              <p className="text-base font-serif-headline text-[#3d322c] font-bold">{selectedPhoto.caption}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}