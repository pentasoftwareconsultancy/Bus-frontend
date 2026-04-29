import { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import AppRoutes from "./Routes/AppRoutes";
import SplashScreen from "./components/Layout/SplashScreen";

const NO_FOOTER_ROUTES = [
  "/dashboard", "/bookings", "/tickets",
  "/cancellations", "/livetracking", "/admin-dashboard",
];

const hasSeenSplash = sessionStorage.getItem("splashSeen");

function App() {
  const location = useLocation();
  const showFooter = !NO_FOOTER_ROUTES.includes(location.pathname);
  const [splashDone, setSplashDone] = useState(!!hasSeenSplash);

  const handleSplashDone = () => {
    sessionStorage.setItem("splashSeen", "1");
    setSplashDone(true);
  };

  return (
    <>
      {!splashDone && <SplashScreen onDone={handleSplashDone} />}

      {/* Black bg behind app prevents white flash during fade-in */}
      {!splashDone && (
        <div style={{ position: "fixed", inset: 0, background: "#000", zIndex: 9998, pointerEvents: "none" }} />
      )}

      <div style={{
        opacity: splashDone ? 1 : 0,
        transition: splashDone ? "opacity 0.5s ease" : "none",
      }}>
        <Header />
        <AppRoutes />
        {showFooter && <Footer />}
      </div>
    </>
  );
}

export default App;
