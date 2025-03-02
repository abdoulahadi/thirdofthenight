import { motion, AnimatePresence } from "framer-motion";
import i18next from "i18next";

const Modal = ({ isModalOpen, setIsModalOpen, darkMode }) => {
  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6 z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className={`rounded-2xl overflow-hidden max-w-md w-full ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gradient-to-b from-gray-900 to-gray-800 border-white/10'} border`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`${darkMode ? 'bg-gradient-to-r from-emerald-800 to-teal-900' : 'bg-gradient-to-r from-emerald-500 to-teal-500'} p-5`}>
              <h3 className="text-xl font-bold text-white">
                {i18next.t("explanation_calculation")}
              </h3>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-white/80 leading-relaxed">
                {i18next.t("explanation_night_last_third")}
              </p>

              <div className={`${darkMode ? 'bg-gray-800/70 border-gray-700' : 'bg-white/5 border-white/10'} p-4 rounded-xl border space-y-3`}>
                <h4 className="font-medium text-emerald-400">{i18next.t("calculation_method")}</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="bg-emerald-400 text-gray-900 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                    <p className="text-white/80">{i18next.t("calculation_step1")}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-emerald-400 text-gray-900 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                    <p className="text-white/80">{i18next.t("calculation_step2")}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-emerald-400 text-gray-900 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                    <p className="text-white/80">{i18next.t("calculation_step3")}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className={`w-full mt-4 ${darkMode ? 'bg-gradient-to-r from-emerald-700 to-teal-800' : 'bg-gradient-to-r from-emerald-500 to-teal-500'} text-white font-medium py-3 rounded-xl hover:shadow-lg transition-all`}
              >
                Fermer
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;