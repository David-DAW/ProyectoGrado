"use client";
import { useEffect, useState } from "react";
import Header from "./sections/Header/HeaderComponent";
import Movies from "./sections/Movies/MovieComponent";
import Footer from "./sections/Footer/FooterComponent";
import Reviews from "./sections/Reviews/ReviewComponent";
import News from "./sections/News/newsComponent";
import Hero from "./sections/Hero/Hero";
import Alert from "./components/Alerts/Alert"; 

export default function Home() {
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    const loginMessage = localStorage.getItem("loginSuccessMessage");
    if (loginMessage) {
      setAlertMessage(loginMessage);
      localStorage.removeItem("loginSuccessMessage");
    }

    const registerMessage = localStorage.getItem("registerSuccessMessage");
    if (registerMessage) {
      setAlertMessage(registerMessage);
      localStorage.removeItem("registerSuccessMessage");
    }
  }, []);

  const closeAlert = () => {
    setAlertMessage(null);
  };

  return (
    <div className="bg-gradient-to-l from-amber-950 to-amber-600 min-h-screen">
      <Alert message={alertMessage} onClose={closeAlert} />
      <Header />
      <Hero />
      <Movies />
      <Reviews />
      <News />
      <Footer />
    </div>
  );
}
