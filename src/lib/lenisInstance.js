// A tiny module-level singleton so components outside <SmoothScroll> (route
// change scroll-to-top, nav links) can drive the same Lenis instance instead
// of fighting it with native window.scrollTo.
let instance = null;

export const setLenisInstance = (lenis) => {
  instance = lenis;
};

export const getLenisInstance = () => instance;
