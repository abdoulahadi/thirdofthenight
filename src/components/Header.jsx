import { motion } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";
import { MdOutlineMosque } from "react-icons/md";


const Header = ({ darkMode, setDarkMode, language, setLanguage,i18next }) => {
  return (
    <div className="flex justify-between items-center mb-10">
      <motion.div
        whileHover={{ rotate: 10, scale: 1.1 }}
        className={`text-5xl ${darkMode ? 'text-emerald-400' : 'text-emerald-300'}`}
      >
        <MdOutlineMosque />
      </motion.div>

      <div className="flex items-center gap-4">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setDarkMode(!darkMode)}
          className="p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all"
        >
          {darkMode ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
        </motion.button>

        <select
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
            i18next.changeLanguage(e.target.value);
          }}
          className="p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all border-0 outline-none appearance-none pr-8 pl-4"
          style={{
            backgroundImage: "url('data:image/svg+xml;utf8,<svg fill=\"white\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M7 10l5 5 5-5H7z\"/></svg>')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 12px center",
            backgroundSize: "16px"
          }}
        >
          <option value="fr" className="text-black">Français</option>
          <option value="ar" className="text-black">العربية</option>
          <option value="en" className="text-black">English</option>
          <option value="wo" className="text-black">Wolof</option>
        </select>
      </div>
    </div>
  );
};

export default Header;