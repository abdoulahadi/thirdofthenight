import { motion } from "framer-motion";
import { FiClock, FiTrash2 } from "react-icons/fi";
import i18next from "i18next";

const History = ({ history, confirmClearHistory, darkMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-12 max-w-md mx-auto"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <FiClock className="text-emerald-400" />
          {i18next.t("history")}
        </h2>

        <button
          onClick={confirmClearHistory}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2"
        >
          <FiTrash2 />
          {i18next.t("Clearhistory")}
        </button>
      </div>

      <div className="space-y-4">
        {history.map((entry) => (
          <motion.div
            key={entry.id}
            whileHover={{ scale: 1.01 }}
            className={`p-5 rounded-xl ${darkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/5 border-white/10'} backdrop-blur-sm border`}
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-white/50 mb-1">{i18next.t("maghrib")}</p>
                <p className="text-lg text-white">{entry.maghrib}</p>
              </div>
              <div>
                <p className="text-xs text-white/50 mb-1">{i18next.t("fajr")}</p>
                <p className="text-lg text-white">{entry.fajr}</p>
              </div>
              <div>
                <p className="text-xs text-white/50 mb-1">{i18next.t("lastThird")}</p>
                <p className="text-lg text-emerald-400">{entry.third}</p>
              </div>
              <div>
                <p className="text-xs text-white/50 mb-1">{i18next.t("midnight")}</p>
                <p className="text-lg text-emerald-400">{entry.midnight}</p>
              </div>
            </div>
            <p className="text-xs text-white/50 mt-3 text-right">{entry.date}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default History;