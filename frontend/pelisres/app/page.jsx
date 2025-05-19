"use client";
import { useEffect } from "react";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./sections/Header/HeaderComponent";
import Movies from "./sections/Movies/MovieComponent";
import Footer from "./sections/Footer/FooterComponent";
import Reviews from "./sections/Reviews/ReviewComponent";
import News from "./sections/News/newsComponent";
import Hero from "./sections/Hero/Hero";

export default function Home() {
  useEffect(() => {
    const loginMessage = localStorage.getItem("loginSuccessMessage");
    if (loginMessage) {
      toast(loginMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
      setTimeout(() => {
        localStorage.removeItem("loginSuccessMessage");
        console.log("Mensaje login borrado");
      }, 5000);
    }

    const registerMessage = localStorage.getItem("registerSuccessMessage");
    if (registerMessage) {
      toast(registerMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
      setTimeout(() => {
        localStorage.removeItem("registerSuccessMessage");
        console.log("Mensaje registro borrado");
      }, 5000);
    }
  }, []);

  return (
    <div className="bg-gradient-to-l from-amber-950 to-amber-600 min-h-screen">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={false}
        pauseOnHover
        draggable
        theme="dark"
        transition={Bounce}
      />
      <Header />
      <Hero />
      <Movies />
      <Reviews />
      <News />
      <Footer />
    </div>
  );
}
