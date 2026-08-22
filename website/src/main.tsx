import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "@fontsource/bebas-neue";
import "@fontsource/ibm-plex-mono/400.css";
import "./index.css";
import App from "./App";
import Home from "./pages/Home";

const root = document.getElementById("root")!;
const path = window.location.pathname.replace(/\/+$/, "") || "/";
const page = <StrictMode>{path === "/" ? <Home /> : <App />}</StrictMode>;

if (path === "/" && root.hasChildNodes()) hydrateRoot(root, page);
else createRoot(root).render(page);
