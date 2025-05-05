"use client";
import Header from "./sections/Header/HeaderComponent";
import Movies from "./sections/Movies/MovieComponent";
import Footer from "./sections/Footer/FooterComponent";
import Reviews from "./sections/Reviews/ReviewComponent";
import News from "./sections/News/newsComponent";
import Hero from "./sections/Hero/Hero";


export default function Home() {
  return (
    <div className="bg-gradient-to-l from-amber-950 to-amber-600 min-h-screen">
      <Header />
      <Hero />
      <Movies />
      <Reviews />
      <News />
      <Footer />
    </div>
  );
}
