import { motion } from "framer-motion";
import { FiAlertCircle, FiShare } from "react-icons/fi";
import i18next from "i18next";

const Results = ({ results, setIsModalOpen, shareResults, darkMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 space-y-4"
    >
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          whileHover={{ y: -5 }}
          className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700/50 border-gray-600/50' : 'bg-white/5 border-white/10'} border backdrop-blur-sm`}
        >
          <p className="text-sm text-emerald-400 mb-2">{i18next.t("lastThird")}</p>
          <p className="text-2xl font-bold text-white">{results.third}</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700/50 border-gray-600/50' : 'bg-white/5 border-white/10'} border backdrop-blur-sm`}
        >
          <p className="text-sm text-emerald-400 mb-2">{i18next.t("midnight")}</p>
          <p className="text-2xl font-bold text-white">{results.midnight}</p>
        </motion.div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className={`flex-1 py-3 px-4 rounded-xl ${darkMode ? 'bg-gray-700/50 hover:bg-gray-700 border-gray-600/50' : 'bg-white/5 hover:bg-white/10 border-white/10'} border transition-all flex items-center justify-center gap-2 text-white/80`}
        >
          <FiAlertCircle className="text-emerald-400" />
          {i18next.t("details")}
        </button>

        <button
          onClick={shareResults}
          className={`flex-1 py-3 px-4 rounded-xl ${darkMode ? 'bg-gray-700/50 hover:bg-gray-700 border-gray-600/50' : 'bg-white/5 hover:bg-white/10 border-white/10'} border transition-all flex items-center justify-center gap-2 text-white/80`}
        >
          <FiShare className="text-emerald-400" />
          {i18next.t("share")}
        </button>
      </div>
    </motion.div>
  );
};

export default Results;