// src/components/AlertModal.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";


const AlertModal = ({ isOpen, onClose, title, message, darkMode,actions }) => {
      const { t } = useTranslation(); 
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white'} rounded-2xl p-6 max-w-md w-full shadow-lg`}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className={`${!darkMode ? '' : 'text-white'} text-xl font-bold mb-4`}>{title}</h2>
            <p className="text-gray-700 dark:text-gray-300">{message}</p>
            <div className="mt-6 flex justify-end">
              {actions || ( // Afficher les actions personnalisées ou un bouton par défaut
                <button
                  onClick={onClose}
                  className={`${
                    darkMode ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-emerald-500 hover:bg-emerald-600'
                  } text-white py-2 px-4 rounded-lg transition-all`}
                >
                   {t("close")} 
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AlertModal;