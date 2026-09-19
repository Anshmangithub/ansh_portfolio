import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center pb-32 text-center">
    <p className="text-sm uppercase tracking-[0.3em] text-amber-300/80">404</p>
    <h1 className="mt-4 text-4xl font-light text-neutral-50">This page drifted off.</h1>
    <p className="mt-3 max-w-sm text-neutral-400">
      {"The page you're looking for doesn't exist, or it moved somewhere I haven't linked yet."}
    </p>
    <Link
      to="/"
      className="mt-8 rounded-full bg-neutral-50 px-6 py-3 text-sm font-semibold text-neutral-950 transition-transform hover:scale-105"
    >
      Back home
    </Link>
  </div>
);

export default NotFound;
