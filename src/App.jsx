import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Starfield from "./components/Starfield";
import CursorGlow from "./components/CursorGlow";
import SmoothScroll from "./components/SmoothScroll.jsx";
import BootLoader from "./components/BootLoader.jsx";
import PageTransition from "./components/PageTransition";
import { ScrollTrigger } from "./lib/gsap.js";
import { getLenisInstance } from "./lib/lenisInstance.js";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const lenis = getLenisInstance();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" in window.scrollTo ? "instant" : "auto" });
    }
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [pathname]);
  return null;
};

const App = () => {
  const location = useLocation();

  return (
    <SmoothScroll>
      <div className="relative min-h-screen overflow-x-hidden bg-[#050506] text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900">
        <div className="pointer-events-none fixed inset-0 -z-30 bg-[#050506]" />
        <div className="pointer-events-none fixed top-0 -z-20 h-screen w-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(52,226,176,0.12),rgba(167,139,250,0.06),rgba(255,255,255,0))]" />
        <Starfield />
        <CursorGlow />
        <BootLoader />
        <Navbar />
        <ScrollToTop />

        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition fullBleed>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/about"
              element={
                <PageTransition>
                  <About />
                </PageTransition>
              }
            />
            <Route
              path="/services"
              element={
                <PageTransition>
                  <Services />
                </PageTransition>
              }
            />
            <Route
              path="/projects"
              element={
                <PageTransition>
                  <Projects />
                </PageTransition>
              }
            />
            <Route
              path="/contact"
              element={
                <PageTransition>
                  <Contact />
                </PageTransition>
              }
            />
            <Route
              path="*"
              element={
                <PageTransition>
                  <NotFound />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>

        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default App;
