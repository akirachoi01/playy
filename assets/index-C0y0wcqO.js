import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home as HomeIcon, Play as PlayIcon, Book as BookIcon, Menu as MenuIcon,
  X as XIcon, ChevronLeft, ChevronRight, Search, SquareStack, Airplay, Video
} from 'lucide-react';

// --- Mock Data (from user's obfuscated code) ---
const za = [
  { id: 939243, url: "/posters/poster_939243.jpg" }, { id: 1241982, url: "/posters/poster_1241982.jpg" },
  { id: 539972, url: "/posters/poster_539972.jpg" }, { id: 993710, url: "/posters/poster_993710.jpg" },
  { id: 1249289, url: "/posters/poster_1249289.jpg" }, { id: 426063, url: "/posters/poster_426063.jpg" },
  { id: 1410082, url: "/posters/poster_1410082.jpg" }, { id: 85, url: "/posters/poster_85.jpg" },
  { id: 762509, url: "/posters/poster_762509.jpg" }, { id: 811941, url: "/posters/poster_811941.jpg" },
  { id: 426889, url: "/posters/poster_426889.jpg" }, { id: 1097549, url: "/posters/poster_1097549.jpg" },
  { id: 912649, url: "/posters/poster_912649.jpg" }, { id: 558449, url: "/posters/poster_558449.jpg" },
  { id: 933260, url: "/posters/poster_933260.jpg" }, { id: 604685, url: "/posters/poster_604685.jpg" },
  { id: 970450, url: "/posters/poster_970450.jpg" }, { id: 1255788, url: "/posters/poster_1255788.jpg" },
  { id: 1064213, url: "/posters/poster_1064213.jpg" }, { id: 1222248, url: "/posters/poster_1222248.jpg" },
  { id: 1035048, url: "/posters/poster_1035048.jpg" }, { id: 402431, url: "/posters/poster_402431.jpg" },
  { id: 1156593, url: "/posters/poster_1156593.jpg" }, { id: 845781, url: "/posters/poster_845781.jpg" },
  { id: 1081012, url: "/posters/poster_1081012.jpg" }, { id: 839033, url: "/posters/poster_839033.jpg" },
  { id: 1241320, url: "/posters/poster_1241320.jpg" }, { id: 1114894, url: "/posters/poster_1114894.jpg" },
  { id: 1222064, url: "/posters/poster_1222064.jpg" }, { id: 1184918, url: "/posters/poster_1184918.jpg" },
  { id: 1357633, url: "/posters/poster_1357633.jpg" }, { id: 1010581, url: "/posters/poster_1010581.jpg" },
  { id: 1064486, url: "/posters/poster_1064486.jpg" }, { id: 823219, url: "/posters/poster_823219.jpg" },
  { id: 533535, url: "/posters/poster_533535.jpg" }, { id: 1252309, url: "/posters/poster_1252309.jpg" },
  { id: 1043905, url: "/posters/poster_1043905.jpg" }, { id: 1022789, url: "/posters/poster_1022789.jpg" },
  { id: 519182, url: "/posters/poster_519182.jpg" }, { id: 1138194, url: "/posters/poster_1138194.jpg" },
  { id: 85231, url: "/posters/poster_85231.jpg" }, { id: 257064, url: "/posters/poster_257064.jpg" },
  { id: 257048, url: "/posters/poster_257048.jpg" }, { id: 93405, url: "/posters/poster_93405.jpg" },
  { id: 6489, url: "/posters/poster_6489.jpg" }, { id: 13008, url: "/posters/poster_13008.jpg" },
  { id: 237478, url: "/posters/poster_237478.jpg" }, { id: 23915, url: "/posters/poster_23915.jpg" },
  { id: 34860, url: "/posters/poster_34860.jpg" }, { id: 263050, url: "/posters/poster_263050.jpg" },
  { id: 80318, url: "/posters/poster_80318.jpg" }, { id: 36361, url: "/posters/poster_36361.jpg" },
  { id: 33238, url: "/posters/poster_33238.jpg" }, { id: 206559, url: "/posters/poster_206559.jpg" },
  { id: 243754, url: "/posters/poster_243754.jpg" }, { id: 3091, url: "/posters/poster_3091.jpg" },
  { id: 1770, url: "/posters/poster_1770.jpg" }, { id: 280749, url: "/posters/poster_280749.jpg" },
  { id: 5092, url: "/posters/poster_5092.jpg" }, { id: 3940, url: "/posters/poster_3940.jpg" },
  { id: 37971, url: "/posters/poster_37971.jpg" }, { id: 36301, url: "/posters/poster_36301.jpg" },
  { id: 252373, url: "/posters/poster_252373.jpg" }, { id: 66515, url: "/posters/poster_66515.jpg" },
  { id: 63809, url: "/posters/poster_63809.jpg" }, { id: 235484, url: "/posters/poster_235484.jpg" },
  { id: 80885, url: "/posters/poster_80885.jpg" }, { id: 291, url: "/posters/poster_291.jpg" },
  { id: 41018, url: "/posters/poster_41018.jpg" }, { id: 21502, url: "/posters/poster_21502.jpg" },
  { id: 13945, url: "/posters/poster_13945.jpg" }, { id: 64356, url: "/posters/poster_64356.jpg" },
  { id: 235493, url: "/posters/poster_235493.jpg" }, { id: 2912, url: "/posters/poster_2912.jpg" },
  { id: 6809, url: "/posters/poster_6809.jpg" }, { id: 261121, url: "/posters/poster_261121.jpg" },
  { id: 39084, url: "/posters/poster_39084.jpg" }, { id: 49036, url: "/posters/poster_49036.jpg" },
  { id: 212907, url: "/posters/poster_212907.jpg" }
];

const pt = [
  { value: "72K+", label: "MOVIES", gradient: "from-blue-400 via-blue-500 to-blue-600", shadowColor: "rgba(59, 130, 246, 0.5)" },
  { value: "14K+", label: "TV SHOWS", gradient: "from-purple-400 via-purple-500 to-purple-600", shadowColor: "rgba(147, 51, 234, 0.5)" },
  { value: "30+", label: "SUBTITLES", gradient: "from-emerald-400 via-emerald-500 to-emerald-600", shadowColor: "rgba(16, 185, 129, 0.5)" },
  { value: "1K+", label: "4K MOVIES", gradient: "from-rose-400 via-rose-500 to-rose-600", shadowColor: "rgba(244, 63, 94, 0.5)" },
  { value: "4K+", label: "ANIME", gradient: "from-orange-400 via-orange-500 to-orange-600", shadowColor: "rgba(251, 146, 60, 0.5)" }
];

const Qa = [ // Movies
  { id: "299534", title: "Avengers: Endgame" },
  { id: "278", title: "The Shawshank Redemption" },
  { id: "155", title: "The Dark Knight" },
];

const Ya = [ // TV Shows
  { id: "1399", title: "Game of Thrones" },
  { id: "1396", title: "Breaking Bad" },
  { id: "66732", title: "Stranger Things" },
];

const Ka = [ // Anime
  { id: "21", title: "ONE PIECE", type: "show" },
  { id: "177709", title: "SAKAMOTO DAYS", type: "show" },
  { id: "1535", title: "DEATH NOTE", type: "show" },
  { id: "114129", title: "Gintama: THE FINAL", type: "movie" },
  { id: "16870", title: "THE-LAST-NARUTO-THE-MOVIE", type: "movie" },
];

// --- Navigation Links ---
const navLinks = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "Player", href: "/player", icon: PlayIcon },
  { name: "FreeTV", href: "/FreeTV", icon: Airplay }, // New link
  { name: "Docs", href: "/docs", icon: BookIcon },
];

// --- Components ---

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full z-50 px-3 py-2 transition-all duration-500"
    >
      <div
        className={`container mx-auto rounded-2xl transition-all duration-500 ${
          scrolled ?
            "bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl shadow-lg border border-white/20 dark:border-white/5" :
            "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2 px-2">
          {/* Logo */}
          <div className="flex items-center min-w-[90px] sm:min-w-[120px]">
            <Link to="/" className="relative group w-full">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative flex flex-col items-center"
              >
                <span className="text-base sm:text-xl font-black tracking-wider bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 dark:from-purple-400 dark:via-purple-300 dark:to-purple-200 bg-clip-text text-transparent relative">
                  MARUYATV
                </span>
              </motion.div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 flex justify-center max-w-[45%] sm:max-w-none px-2">
            <div className="flex items-center bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full p-1.5 w-full sm:w-auto border border-purple-100 dark:border-purple-900/50 shadow-lg">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.href} className={`flex-1 px-2.5 sm:px-4 py-1.5 rounded-full transition-all duration-200 relative flex items-center justify-center gap-1.5 sm:gap-2 ${
                  location.pathname === link.href ? "text-white" : "text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                }`}>
                  {location.pathname === link.href && (
                    <motion.div
                      layoutId="navPill"
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-500 dark:from-purple-500 dark:to-purple-400 rounded-full"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">
                    <link.icon className="w-5 h-5" />
                  </span>
                  <span className="relative z-10 tracking-wide hidden lg:block text-sm font-medium">
                    {link.name}
                  </span>
                </Link>
              ))}
            </div>
          </nav>

          {/* External Links */}
          <div className="flex items-center min-w-[90px] sm:min-w-[120px] justify-end">
            <div className="flex items-center bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full border border-purple-100 dark:border-purple-900/50 shadow-lg w-full h-[34px] sm:h-[38px]">
              <div className="flex items-center justify-between w-full px-3 h-full">
                <a href="https://bitcine.app" target="_blank" rel="noopener noreferrer" className="flex items-center hover:opacity-80 transition-all duration-200 h-full">
                  <img src="https://placehold.co/24x24/8B5CF6/ffffff?text=BC" alt="Bitcine" className="h-5 sm:h-6 w-auto"/>
                </a>
                <div className="h-4 w-px bg-purple-200 dark:bg-purple-800/50" />   <a href="https://cineby.app" target="_blank" rel="noopener noreferrer" className="flex items-center hover:opacity-80 transition-all duration-200 h-full">
                  <img src="https://placehold.co/24x24/8B5CF6/ffffff?text=CB" alt="Cineby" className="h-5 sm:h-6 w-auto"/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

const Home = () => {
  const [posters, setPosters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const randomizedPosters = [...za].sort(() => Math.random() - 0.5).map(item => item.url);
    setPosters([...randomizedPosters, ...randomizedPosters].slice(0, 96));
    setLoading(false);
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] relative pt-16 sm:pt-20 pb-6">
      <div className="relative h-full container mx-auto px-2 md:px-3">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className={`absolute top-[6rem] md:top-[6.5rem] left-2 right-2 md:left-4 md:right-4 bottom-[1rem] md:bottom-4 rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-br from-white/80 via-purple-50/80 to-white/80 dark:from-gray-900/90 dark:via-purple-900/80 dark:to-gray-950/90 backdrop-blur-md border border-purple-100/50 dark:border-purple-800/20 shadow-[0_0_40px_-15px_rgba(139,92,246,0.3)] dark:shadow-[0_0_40px_-15px_rgba(139,92,246,0.2)]`}>
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <div className="absolute w-[250%] h-[250%] sm:w-[180%] sm:h-[180%] left-1/2 top-[100%] sm:top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-full h-full grid grid-cols-12 sm:grid-cols-14 md:grid-cols-16 lg:grid-cols-18 auto-rows-min gap-1.5 sm:gap-3 md:gap-4 p-3 transform -rotate-6 scale-[1.3] sm:scale-[0.70]">
                {!loading && posters.map((url, i) => (
                  <motion.div
                    key={`${url}-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: [0, 0.8, 0.6], y: 0, transition: { duration: 0.6, delay: Math.min(i * 0.01, 0.4) } }}
                    className={`relative aspect-[2/3] rounded-xl overflow-hidden ${i % 2 === 0 ? "translate-y-0.5" : "-translate-y-0.5"} hover:translate-y-0 hover:scale-105 transition-all duration-500 ease-out shadow-[0_4px_10px_-4px_rgba(139,92,246,0.3)] dark:shadow-[0_4px_10px_-4px_rgba(0,0,0,0.4)] group`}
                  >
                    <img src={url} alt="" className="w-full h-full object-cover transform transition-transform duration-500 rounded-xl group-hover:scale-110" loading="lazy" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        
        <div className="relative z-20 h-full flex flex-col justify-center items-center pt-24 pb-4 md:pt-28 md:pb-0 min-h-[calc(100vh-5rem)] md:min-h-0">
          <div className="max-w-4xl w-full text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-6 md:mb-12">
              <div className="relative inline-block">
                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold relative z-10 flex flex-col items-center gap-3">
                  <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl bg-gradient-to-r from-white via-purple-100 to-white dark:from-purple-200 dark:via-purple-100 dark:to-purple-200 bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
                    Discover Endless Possibilities
                  </span>
                  <div className="flex items-center bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full px-4 py-1.5 border border-purple-100 dark:border-purple-900/50 shadow-lg">
                    <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-wider bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 dark:from-purple-400 dark:via-purple-300 dark:to-purple-200 bg-clip-text text-transparent relative">
                      VIDEASY
                    </span>
                  </div>
                </h1>
                <div className="absolute -inset-3 md:-inset-4 bg-gradient-to-r from-purple-500 to-purple-700 blur-3xl opacity-20 -z-10" />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 mb-6 md:mb-12 mx-auto max-w-[calc(100%-1rem)]">
              {pt.map((item, i) => (
                <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 + 0.3 }} whileHover={{ scale: 1.05, y: -5 }} className="relative group">
                  <div className={`absolute -inset-1 bg-gradient-to-r ${item.gradient} rounded-xl md:rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300`} />
                  <div className="relative bg-white/10 dark:bg-gray-900/50 backdrop-blur-md rounded-xl md:rounded-2xl p-2 sm:p-2.5 md:p-3 lg:p-4 border border-white/20 dark:border-white/10 shadow-[0_8px_20px_-6px_rgba(139,92,246,0.5)] overflow-hidden">
                    <div className="relative">
                      <div className={`text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent mb-0.5 sm:mb-1 tracking-tight`}>{item.value}</div>
                      <div className="text-[10px] sm:text-xs md:text-sm font-medium text-white/90 tracking-wider">{item.label}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="flex flex-col sm:flex-row justify-center gap-2 md:gap-4 mx-auto max-w-[calc(100%-1rem)]">
              <Link to="/player" className="w-full sm:w-auto">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative group w-full px-4 md:px-6 py-2.5 md:py-3 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-400" />
                  <span className="relative flex items-center justify-center text-sm md:text-base font-semibold text-white group-hover:text-white/90 transition-colors">Test our player</span>
                </motion.button>
              </Link>
              <Link to="/docs" className="w-full sm:w-auto">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative group w-full px-4 md:px-6 py-2.5 md:py-3 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
                  <span className="relative flex items-center justify-center text-sm md:text-base font-semibold text-white group-hover:text-white/90 transition-colors">Documentation</span>
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Player = () => {
  const [contentType, setContentType] = useState("movie");
  const [contentId, setContentId] = useState("299534");
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);
  const [isDubbed, setIsDubbed] = useState(false);
  const [animeContentType, setAnimeContentType] = useState("show");
  const [selectedColor, setSelectedColor] = useState("#8B5CF6");

  const playerUrl = () => {
    const base = "https://player.videasy.net/"  const colorParam = `?color=${selectedColor.replace("#", "")}`; const featuresParams = `&nextEpisode=true&episodeSelector=true&autoplayNextEpisode=true`;

    switch (contentType) {
      case "movie":
        return `${base}movie/${contentId}${colorParam}`;
      case "tv":
        return `${base}tv/${contentId}/${season}/${episode}${colorParam}${featuresParams}`;
      case "anime":
        const dubParam = `&dub=${isDubbed}`;
        if (animeContentType === "show") {
          return `${base}anime/${contentId}/${episode}${colorParam}${dubParam}${featuresParams}`;
        } else {
          return `${base}anime/${contentId}${colorParam}${dubParam}`;
        }
      default:
        return "";
    }
  };

  const handleSelectContent = (type) => {
    setContentType(type);
    if (type === "movie") setContentId(Qa[0].id);
    if (type === "tv") setContentId(Ya[0].id);
    if (type === "anime") {
      if (animeContentType === "show") setContentId(Ka.filter(c => c.type === "show")[0].id);
      if (animeContentType === "movie") setContentId(Ka.filter(c => c.type === "movie")[0].id);
    }
  };

  const handleSelectAnimeType = (type) => {
    setAnimeContentType(type);
    if (type === "show") setContentId(Ka.filter(c => c.type === "show")[0].id);
    if (type === "movie") setContentId(Ka.filter(c => c.type === "movie")[0].id);
  };

  const colorOptions = [
    { name: "Purple", value: "#8B5CF6" }, { name: "Blue", value: "#3B82F6" },
    { name: "Green", value: "#10B981" }, { name: "Red", value: "#EF4444" },
    { name: "Pink", value: "#EC4899" }
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] relative pt-16 sm:pt-20 pb-6">
      <div className="container mx-auto px-2 sm:px-3">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 min-h-[calc(100vh-8rem)]">
          
          {/* Controls Sidebar */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="order-2 lg:order-1 w-full lg:w-96 rounded-2xl sm:rounded-3xl overflow-hidden shrink-0 bg-gradient-to-br from-white/10 to-white/5 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-[0_8px_32px_-15px_rgba(139,92,246,0.2)]">
            <div className="p-4 lg:p-6 flex flex-col gap-4 lg:gap-8">
              {/* Content Type Selector */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center bg-gray-900/80 rounded-full p-1 border border-white/5 shadow-lg">
                  {["movie", "tv", "anime"].map(type => (
                    <motion.button key={type} onClick={() => handleSelectContent(type)} className={`flex-1 flex items-center justify-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 font-medium text-sm ${
                      contentType === type ? "bg-purple-600 text-white" : "text-gray-400 hover:text-gray-200"
                    }`}>
                      {type === "movie" && <Video className="text-lg" />}
                      {type === "tv" && <SquareStack className="text-lg" />}
                      {type === "anime" && <Airplay className="text-lg" />}
                      <span>{type === "movie" ? "Movies" : type === "tv" ? "TV" : "Anime"}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* ID Input and controls */}
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                <div className="col-span-2">
                  <div className="relative">
                    <input type="text" value={contentId} onChange={(e) => setContentId(e.target.value)} placeholder="Enter TMDB ID" className="w-full px-4 py-3 pl-11 rounded-full bg-white/50 dark:bg-gray-800/50 border border-purple-100 dark:border-purple-900/50 text-gray-600 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"/>
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg" />
                  </div>
                </div>

                {/* Anime specific controls */}
                {contentType === "anime" && (
                  <div className="col-span-2">
                    <div className="bg-white/50 dark:bg-gray-800/50 rounded-full p-1.5 border border-purple-100 dark:border-purple-900/50 shadow-lg">
                      <div className="flex items-center">
                        <button onClick={() => handleSelectAnimeType("show")} className={`flex-1 py-2 px-4 rounded-full font-medium text-sm lg:text-base transition-all duration-300 ${
                          animeContentType === "show" ? "bg-gradient-to-r from-purple-600 to-purple-400 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50"
                        }`}>Show</button>
                        <button onClick={() => handleSelectAnimeType("movie")} className={`flex-1 py-2 px-4 rounded-full font-medium text-sm lg:text-base transition-all duration-300 ${
                          animeContentType === "movie" ? "bg-gradient-to-r from-purple-600 to-purple-400 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50"
                        }`}>Movie</button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Season and Episode controls */}
                {(contentType === "tv" || (contentType === "anime" && animeContentType === "show")) && (
                  <>
                    <div className="bg-white/50 dark:bg-gray-800/50 rounded-full p-1.5 border border-purple-100 dark:border-purple-900/50 shadow-lg">
                      <div className="flex items-center">
                        <button onClick={() => setSeason(s => Math.max(1, s - 1))} disabled={season === 1} className="p-2 rounded-full text-gray-600 dark:text-gray-300 disabled:text-gray-400 dark:disabled:text-gray-600 hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all duration-300"><ChevronLeft className="w-5 h-5" /></button>
                        <div className="flex-1 text-center font-medium text-gray-600 dark:text-gray-300">S {season}</div>
                        <button onClick={() => setSeason(s => s + 1)} className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all duration-300"><ChevronRight className="w-5 h-5" /></button>
                      </div>
                    </div>
                    <div className="bg-white/50 dark:bg-gray-800/50 rounded-full p-1.5 border border-purple-100 dark:border-purple-900/50 shadow-lg">
                      <div className="flex items-center">
                        <button onClick={() => setEpisode(e => Math.max(1, e - 1))} disabled={episode === 1} className="p-2 rounded-full text-gray-600 dark:text-gray-300 disabled:text-gray-400 dark:disabled:text-gray-600 hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all duration-300"><ChevronLeft className="w-5 h-5" /></button>
                        <div className="flex-1 text-center font-medium text-gray-600 dark:text-gray-300">E {episode}</div>
                        <button onClick={() => setEpisode(e => e + 1)} className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all duration-300"><ChevronRight className="w-5 h-5" /></button>
                      </div>
                    </div>
                  </>
                )}

                {/* Color and other feature controls can be added here */}
                <div className="col-span-2 flex gap-2 justify-center lg:justify-start">
                  {colorOptions.map(color => (
                    <button key={color.name} onClick={() => setSelectedColor(color.value)} className={`group relative rounded-full p-0.5 transition-all duration-300 ${selectedColor === color.value ? "scale-110 shadow-lg" : "hover:scale-105"}`} style={{ backgroundColor: color.value }}>
                      <div className="w-8 h-8 rounded-full border-2 transition-all duration-300" style={{ borderColor: selectedColor === color.value ? "white" : "transparent" }}></div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Content List */}
              <div className="flex-1 overflow-hidden">
                <h3 className="text-base font-medium text-white/70 px-1 mb-2">Popular {contentType === "movie" ? "Movies" : contentType === "tv" ? "TV Shows" : animeContentType === "movie" ? "Anime Movies" : "Anime Shows"}</h3>
                <div className="grid grid-cols-3 lg:grid-cols-1 gap-2 lg:gap-2 lg:overflow-y-auto lg:pr-2 scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent">
                  {(contentType === "movie" ? Qa : contentType === "tv" ? Ya : Ka.filter(c => c.type === animeContentType)).map(item => (
                    <motion.button key={item.id} onClick={() => setContentId(item.id)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`flex flex-col lg:flex-row items-center gap-1.5 lg:gap-2 p-1.5 lg:p-4 rounded-2xl text-center lg:text-left transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-purple-100 dark:border-purple-900/50 shadow-lg group`}>
                      <div className="text-xs lg:text-base font-medium truncate">{item.title}</div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Player Iframe */}
          <div className="order-1 lg:order-2 flex-1 rounded-2xl sm:rounded-3xl overflow-hidden bg-black/90 border border-white/10">
            <div className="w-full h-[45vh] sm:h-[60vh] lg:h-[calc(100vh-8rem)]">
              <iframe
                src={playerUrl()}
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
                allow="encrypted-media"
                title="VIDEASY Player"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Docs = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] pt-16 sm:pt-20 pb-6 relative">
      <div className="container mx-auto px-2 sm:px-3">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="relative rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-br from-white/80 via-purple-50/80 to-white/80 dark:from-gray-900/90 dark:via-purple-900/80 dark:to-gray-950/90 backdrop-blur-md border border-purple-100/50 dark:border-purple-800/20 shadow-[0_0_40px_-15px_rgba(139,92,246,0.3)] dark:shadow-[0_0_40px_-15px_rgba(139,92,246,0.2)]">
          <div className="relative z-20 px-3 py-6 sm:px-4 sm:py-8 md:p-8">
            <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-3 sm:space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 dark:from-purple-400 dark:via-purple-300 dark:to-purple-200 bg-clip-text text-transparent">
                  Documentation
                </h1>
                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300">
                  Welcome to VIDEASY documentation. Our player can be easily integrated into any website using simple iframe embeds. Follow the guide below to get started.
                </p>
              </motion.div>
              
              <section id="quick-start" className="space-y-6 scroll-mt-32">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Quick Start</h2>
                <div className="grid gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Add the Player</h3>
                    <p className="text-gray-700 dark:text-gray-300">Copy and paste this code into your HTML where you want the player to appear:</p>
                    <pre className="p-4 rounded-lg bg-gray-800 text-gray-300 overflow-auto">
                      <code>
{`<iframe
  src="https://player.videasy.net/movie/299534"
  width="100%"
  height="100%"
  frameborder="0"
  allowfullscreen
  allow="encrypted-media"
></iframe>`}
                      </code>
                    </pre>
                  </div>
                </div>
              </section>

              <section id="url-structure" className="space-y-6 scroll-mt-32">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">URL Structure</h2>
                <p className="text-gray-600 dark:text-gray-400">Understanding how to construct the player URL</p>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-400">Movies</h3>
                  <pre className="p-4 rounded-lg bg-gray-800 text-gray-300 overflow-auto">
                    <code>
https://player.videasy.net/movie/{/*movie_id*/}
                    </code>
                  </pre>
                </div>
              </section>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  return (
    <HashRouter>
      <div className="dark">
        <div className="min-h-screen w-full bg-gradient-to-b from-gray-950 via-purple-950 to-gray-950">
          <div className="fixed inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none" />
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-purple-400/10 rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <Header />
            <main className="relative min-h-[calc(100vh-4rem)]">
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<Home />} />
                  <Route path="/player" element={<Player />} />
                  <Route path="/FreeTV" element={<Home />} /> {/* New Route */}
                  <Route path="/docs" element={<Docs />} />
                </Routes>
              </AnimatePresence>
            </main>
          </div>
        </div>
      </div>
    </HashRouter>
  );
}
