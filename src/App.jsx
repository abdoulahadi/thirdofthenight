import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import i18next from "./config/i18n";
import Header from "./components/Header";
import PrayerTimeForm from "./components/PrayerTimeForm";
import Results from "./components/Results";
import History from "./components/History";
import Modal from "./components/Modal";
import dayjs from "dayjs";
import TranslationWarning from "./components/TranslationWarning";
import AlertModal from "./components/AlertModal";

const App = () => {
  const [maghrib, setMaghrib] = useState("");
  const [fajr, setFajr] = useState("");
  const [results, setResults] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [city, setCity] = useState("");
  const [history, setHistory] = useState([]);
  const [language, setLanguage] = useState("fr");

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showLocationErrorModal, setShowLocationErrorModal] = useState(false);
  const [showNotificationErrorModal, setShowNotificationErrorModal] = useState(false);
  const [showShareErrorModal, setShowShareErrorModal] = useState(false);

  const [showClearHistoryModal, setShowClearHistoryModal] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    i18next.changeLanguage(language);
  }, [language]);

  const getLocation = async () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          const cityResponse = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=d89b60ca19554cca9505e6c5883d3983`
          );
          const cityData = await cityResponse.json();
          const cityName = cityData.results[0].components.city || "Inconnu";
          setCity(cityName);

          const prayerTimesResponse = await fetch(
            `https://api.aladhan.com/v1/timings/${dayjs().format(
              "DD-MM-YYYY"
            )}?latitude=${latitude}&longitude=${longitude}&method=2`
          );
          const prayerTimesData = await prayerTimesResponse.json();
          const { Maghrib, Fajr } = prayerTimesData.data.timings;

          setMaghrib(Maghrib);
          setFajr(Fajr);
          setLoading(false);
        },
        (error) => {
          console.error("Erreur de géolocalisation:", error);
          alert(i18next.t("error"));
          setLoading(false);
        }
      );
    } else {
      setShowLocationErrorModal(true);
      setLoading(false);
    }
  };

  const calculateTimes = () => {
    setLoading(true);
    setTimeout(() => {
      if (!maghrib || !fajr) {
        setShowErrorModal(true);
        setLoading(false);
        return;
      }

      const maghribTime = dayjs(`2000-01-01 ${maghrib}`);
      let fajrTime = dayjs(`2000-01-02 ${fajr}`);

      if (maghribTime.isBefore(dayjs(`2000-01-01 ${fajr}`))) {
        fajrTime = dayjs(`2000-01-01 ${fajr}`);
      }

      const difference = fajrTime.diff(maghribTime);
      const third = fajrTime.subtract(difference / 3, "ms").format("HH:mm");
      const midnight = fajrTime.subtract(difference / 2, "ms").format("HH:mm");

      setResults({ third, midnight });
      setLoading(false);
      saveToHistory(maghrib, fajr, third, midnight);

      if (notificationEnabled) {
        scheduleReminder(third, 5);
      }
    }, 1000);
  };

  const saveToHistory = (maghrib, fajr, third, midnight) => {
    const newEntry = {
      id: Date.now(),
      maghrib,
      fajr,
      third,
      midnight,
      date: new Date().toLocaleString(),
    };
    setHistory((prev) => [newEntry, ...prev]);
    localStorage.setItem("prayerHistory", JSON.stringify([newEntry, ...history]));
  };

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("prayerHistory")) || [];
    setHistory(savedHistory);
  }, []);

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("prayerHistory");
  };

  const confirmClearHistory = () => {
    setShowClearHistoryModal(true);
  };

  const handleClearHistory = () => {
    clearHistory(); 
    setShowClearHistoryModal(false);
  };

  const shareResults = () => {
    const shareText = `${i18next.t("lastThird")}: ${results.third}\n${i18next.t("midnight")}: ${results.midnight}`;
    if (navigator.share) {
      navigator.share({
        title: i18next.t("title"),
        text: shareText,
      });
    } else {
        setShowShareErrorModal(true); 
        return;
    }
  };

  const toggleNotification = () => {
    if (!notificationEnabled) {
      if (Notification.permission !== "granted") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            setNotificationEnabled(true);
          } else {
            setShowNotificationErrorModal(true);
          }
        });
      } else {
        setNotificationEnabled(true);
      }
    } else {
      setNotificationEnabled(false);
      alert("Vous avez désactivé les notifications (la permission reste active).");
    }
  };

  const scheduleReminder = (time, minutesBefore) => {
    const [hours, minutes] = time.split(":");
    const reminderTime = new Date();
    reminderTime.setHours(hours, minutes - minutesBefore, 0, 0);

    if (reminderTime > new Date()) {
      setTimeout(() => {
        new Notification(i18next.t("reminderTitle"), {
          body: i18next.t("reminderBody", { minutesBefore }),
        });
      }, reminderTime - new Date());
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gradient-to-br from-gray-900 to-slate-950' : 'bg-gradient-to-br from-sky-500 to-indigo-600'}`}>
      <div className="container mx-auto px-6 py-12">
        <Header i18next={i18next} darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`max-w-md mx-auto rounded-2xl overflow-hidden backdrop-blur-md ${darkMode ? 'bg-gray-800/50 border border-gray-700/50' : 'bg-white/10 border border-white/20'} shadow-xl`}
        >
          <div className={`${darkMode ? 'bg-gradient-to-r from-emerald-800 to-teal-900' : 'bg-gradient-to-r from-emerald-500 to-teal-500'} p-6`}>
            <h1 className="text-3xl font-bold text-center text-white">
              {i18next.t("title")}
            </h1>
          </div>
          <PrayerTimeForm
            maghrib={maghrib}
            setMaghrib={setMaghrib}
            fajr={fajr}
            setFajr={setFajr}
            getLocation={getLocation}
            city={city}
            darkMode={darkMode}
            calculateTimes={calculateTimes}
            loading={loading}
            toggleNotification={toggleNotification}
            notificationEnabled={notificationEnabled}
          />
          
          {results && (
            <Results
              results={results}
              setIsModalOpen={setIsModalOpen}
              shareResults={shareResults}
              darkMode={darkMode}
            />
          )}
        </motion.div>
        {history.length > 0 && (
          <History
            history={history}
            confirmClearHistory={confirmClearHistory}
            darkMode={darkMode}
          />
        )}
        <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} darkMode={darkMode} />

        {/* Modals */}
      <AlertModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title={i18next.t("error")}
        message={i18next.t("error")}
        darkMode={darkMode}
      />
      <AlertModal
        isOpen={showLocationErrorModal}
        onClose={() => setShowLocationErrorModal(false)}
        title={i18next.t("error")}
        message={i18next.t("locationError")}
        darkMode={darkMode}
      />
      <AlertModal
        isOpen={showNotificationErrorModal}
        onClose={() => setShowNotificationErrorModal(false)}
        title={i18next.t("error")}
        message={i18next.t("notificationError")}
        darkMode={darkMode}
      />
      <AlertModal
        isOpen={showShareErrorModal}
        onClose={() => setShowShareErrorModal(false)}
        title={i18next.t("error")}
        message={i18next.t("shareError")}
        darkMode={darkMode}
      />

<AlertModal
        isOpen={showClearHistoryModal}
        onClose={() => setShowClearHistoryModal(false)}
        title={i18next.t("Clearhistory")}
        message={i18next.t("confirmClearHistoryMessage")}
        darkMode={darkMode}
        actions={
          <>
            <button
              onClick={() => setShowClearHistoryModal(false)}
              className={`flex-1 ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
              } text-gray-800 dark:text-gray-200 py-2 px-4 rounded-lg transition-all`}
            >
              {i18next.t("cancel")}
            </button>
            <button
              onClick={handleClearHistory}
              className={`flex-1 ${
                darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'
              } text-white py-2 px-4 rounded-lg transition-all ml-4`}
            >
              {i18next.t("confirm")}
            </button>
          </>
        }
      />

         {/*composant TranslationWarning ici */}
         <TranslationWarning />
      </div>
    </div>
  );
};

export default App;