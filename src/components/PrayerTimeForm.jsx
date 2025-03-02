import { motion } from "framer-motion";
import { FiSunset, FiSunrise, FiMapPin, FiClock } from "react-icons/fi";
import i18next from "i18next";

const PrayerTimeForm = ({ maghrib, setMaghrib, fajr, setFajr, getLocation, city, darkMode, calculateTimes, loading, toggleNotification, notificationEnabled }) => {
  return (
    <div className="p-8 space-y-6">
      <div className="space-y-5">
        <div>
          <label className="block text-white/80 mb-2 font-medium">
            {i18next.t("maghrib")}
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50">
              <FiSunset />
            </span>
            <input
              type="time"
              className={`w-full px-12 py-4 rounded-xl ${darkMode ? 'bg-gray-700/50 border-gray-600/50' : 'bg-white/5 border-white/10'} border focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all text-white placeholder-white/50`}
              value={maghrib}
              onChange={(e) => setMaghrib(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-white/80 mb-2 font-medium">
            {i18next.t("fajr")}
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50">
              <FiSunrise />
            </span>
            <input
              type="time"
              className={`w-full px-12 py-4 rounded-xl ${darkMode ? 'bg-gray-700/50 border-gray-600/50' : 'bg-white/5 border-white/10'} border focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all text-white placeholder-white/50`}
              value={fajr}
              onChange={(e) => setFajr(e.target.value)}
            />
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={getLocation}
        className={`w-full ${darkMode ? 'bg-gray-700/70 hover:bg-gray-700 border-gray-600/50' : 'bg-white/10 hover:bg-white/15 border-white/10'} text-white/90 font-medium py-4 px-6 rounded-xl flex items-center justify-center gap-3 backdrop-blur-sm border transition-all`}
      >
        <FiMapPin className="text-emerald-400" />
        {i18next.t("location")}
      </motion.button>

      {city && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 justify-center text-white/80"
        >
          <FiMapPin className="text-emerald-400" />
          <span>{city}</span>
        </motion.div>
      )}

       {/* Activation des rappels */}
       <div className={`flex items-center gap-3 ${darkMode ? 'bg-gray-700/50 border-gray-600/50' : 'bg-white/5 border-white/10'} p-4 rounded-xl border`}>
          <FiClock className="text-emerald-400" />
          <label className="flex items-center gap-3 text-white/80">
            <div className="relative">
              <input
                type="checkbox"
                checked={notificationEnabled}
                onChange={toggleNotification}
                className="sr-only"
              />
              <div className={`w-10 h-6 rounded-full transition-all ${notificationEnabled ? "bg-emerald-500" : darkMode ? "bg-gray-600" : "bg-white/20"}`}>
                <div className={`absolute w-4 h-4 rounded-full bg-white top-1 transition-all ${notificationEnabled ? "left-5" : "left-1"}`}></div>
              </div>
            </div>
            {i18next.t("reminder")}
          </label>
        </div>

      {/* Bouton de calcul */}
      <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full ${darkMode ? 'bg-gradient-to-r from-emerald-600 to-teal-700' : 'bg-gradient-to-r from-emerald-500 to-teal-500'} text-white font-bold py-4 px-6 rounded-xl relative shadow-lg ${darkMode ? 'shadow-emerald-900/30' : 'shadow-emerald-500/20'}`}
          onClick={calculateTimes}
          disabled={loading}
        >
          {loading ? (
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="h-6 w-6 border-3 border-white border-t-transparent rounded-full mx-auto"
            />
          ) : (
            i18next.t("calculate")
          )}
        </motion.button>
    </div>
  );
};

export default PrayerTimeForm;