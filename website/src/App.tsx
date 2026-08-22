import { lazy, Suspense, useEffect } from "react";
import Home from "@/pages/Home";

const Explorations = lazy(() => import("@/pages/Explorations"));

function RouteMetadata({ noIndex }: { noIndex: boolean }) {
  useEffect(() => {
    const robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (robots) robots.content = noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large";
  }, [noIndex]);
  return null;
}

function NotFound() {
  return (
    <main className="not-found">
      <RouteMetadata noIndex />
      <p>404</p>
      <h1>Nothing in this orbit.</h1>
      <a href="/">Return to OpenYoko</a>
    </main>
  );
}

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (path === "/explorations") {
    return <><RouteMetadata noIndex /><Suspense fallback={<div className="route-loading" aria-live="polite">Loading…</div>}><Explorations /></Suspense></>;
  }
  if (path !== "/") return <NotFound />;
  return <><RouteMetadata noIndex={false} /><Home /></>;
}
