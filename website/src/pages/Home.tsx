import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Github, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlyphMatrix } from "@/components/ui/glyph-matrix";
import { Marquee } from "@/components/ui/marquee";
import { ClaudeMark, CursorMark, GoogleMark, GranolaMark, LinearMark, ObsidianMark, OpenAIMark, SlackMark, TeamsMark, TelegramMark, WhatsAppMark } from "@/components/brand-marks";
import yoko from "@/assets/yoko.webp";
import mark from "@/assets/openyoko-no-bg.webp";
import supernalLogo from "@/assets/supernal.svg";
import everywhereIcon from "@/assets/system-icons/everywhere.webp";
import harnessIcon from "@/assets/system-icons/harness.webp";
import planetIcon from "@/assets/system-icons/planet.webp";
import vaultIcon from "@/assets/system-icons/vault.webp";
import watchtowerIcon from "@/assets/system-icons/watchtower.webp";

import deepseek from "@/assets/providers/deepseek.svg";
import gemini from "@/assets/providers/googlegemini.svg";
import mistral from "@/assets/providers/mistralai.svg";
import copilot from "@/assets/providers/githubcopilot.svg";
import opencode from "@/assets/providers/opencode.svg";
import windsurf from "@/assets/providers/windsurf.svg";
import ashby from "@/assets/providers/ashby.webp";

const githubUrl = "https://github.com/ThoBustos/openyoko";
const githubApiUrl = "https://api.github.com/repos/ThoBustos/openyoko";

function GitHubLink() {
  const [stars, setStars] = useState(10);

  useEffect(() => {
    const controller = new AbortController();
    fetch(githubApiUrl, { headers: { Accept: "application/vnd.github+json" }, signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("GitHub request failed")))
      .then((repository: { stargazers_count?: number }) => {
        if (typeof repository.stargazers_count === "number") setStars(repository.stargazers_count);
      })
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  return <a className="github-nav-link" href={githubUrl} target="_blank" rel="noreferrer" aria-label={`OpenYoko on GitHub, ${stars} stars`}><span>GitHub</span><span className="github-stars"><Star size={14} fill="currentColor" /> {stars}</span><ArrowUpRight size={15} /></a>;
}

const providers = [
  { name: "OpenAI", mark: <OpenAIMark /> },
  { name: "Claude", mark: <ClaudeMark /> },
  { name: "Gemini", logo: gemini },
  { name: "Mistral", logo: mistral },
  { name: "DeepSeek", logo: deepseek },
  { name: "Cursor", mark: <CursorMark /> },
  { name: "GitHub Copilot", logo: copilot },
  { name: "OpenCode", logo: opencode },
  { name: "Windsurf", logo: windsurf },
  { name: "Obsidian", mark: <ObsidianMark /> },
  { name: "Slack", mark: <SlackMark /> },
  { name: "WhatsApp", mark: <WhatsAppMark /> },
  { name: "Granola", mark: <GranolaMark /> },
  { name: "Microsoft Teams", mark: <TeamsMark /> },
  { name: "Ashby", logo: ashby },
  { name: "Linear", mark: <LinearMark /> },
  { name: "Google Workspace", mark: <GoogleMark /> },
  { name: "Telegram", mark: <TelegramMark /> },
];

const useCaseGroups = [
  { name: "Direction", items: ["Yearly goals", "Life alignment", "Growth tracking", "Strategy thinking", "Decision support"] },
  { name: "Rhythm", items: ["Daily planning", "Weekly planning", "Monthly planning", "Prioritization", "Calendar preparation", "Habit tracking"] },
  { name: "Work", items: ["Project organization", "Reading", "Writing", "Coding", "Daily AI News", "Content pipeline", "Opportunity tracking"] },
  { name: "Feedback", items: ["Call feedback", "Interview feedback", "Writing feedback", "Meeting context", "Decision log"] },
  { name: "Follow-through", items: ["Smart reminders", "Follow-ups", "Relationship follow-ups", "Inbox triage", "Recurring workflows"] },
  { name: "Operations", items: ["App monitoring", "Infrastructure health", "Deployment checks", "Error triage", "Security alerts", "Backup checks", "Domain renewals", "Subscription tracking", "Expense tracking"] },
];

function ProviderLogos() {
  return (
    <div className="provider-rail" aria-label="Compatible providers, harnesses, and surfaces">
      <div className="provider-label"><span>Bring your stack</span><small>Models · harnesses · channels</small></div>
      <Marquee pauseOnHover className="provider-marquee">
        {providers.map(({ name, logo, mark: providerMark }) => (
          <div className="provider" key={name} title={name}>
            {providerMark ? <span className="provider-mark">{providerMark}</span> : <img src={logo} alt="" />}
            <span>{name}</span>
          </div>
        ))}
      </Marquee>
    </div>
  );
}

function Hero() {
  return (
    <div className="hero-screen" id="top">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="OpenYoko home"><img src={mark} alt="" width="48" height="48" decoding="async" /><span>OPENYOKO</span></a>
        <nav aria-label="Main navigation">
          <a href="#system">The system</a>
          <GitHubLink />
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <span className="eyebrow">Thomas’ open-source personal AI system</span>
          <h1 id="hero-title">Your AI,<br />with you<br />everywhere.</h1>
          <p>One private vault connects every AI harness—across your devices, tools, work, and life.</p>
          <div className="actions">
            <Button asChild><a href={githubUrl} target="_blank" rel="noreferrer"><Github size={15} /> View on GitHub <ArrowUpRight size={15} /></a></Button>
            <a className="text-link" href="#system">See how it works <ArrowDown size={15} /></a>
          </div>
        </div>
        <div className="yoko-panel">
          <div className="yoko-card-header"><span>Yoko</span><small><i /> Live</small></div>
          <div className="yoko-card"><img src={yoko} alt="Yoko, an illustrated personal AI assistant" width="1254" height="1254" fetchPriority="high" /></div>
          <div className="yoko-panel-footer">
            <p>One assistant. The same private context, wherever you work.</p>
            <a className="yoko-work" href="https://getsupernal.ai/" target="_blank" rel="noreferrer" aria-label="Yoko currently works at Supernal AI"><span>Currently at</span><img src={supernalLogo} alt="Supernal" width="677" height="138" /><ArrowUpRight size={13} /></a>
          </div>
        </div>
      </section>

      <ProviderLogos />
      <div className="principles" aria-label="OpenYoko principles">
        <div><img className="principle-icon" src={vaultIcon} alt="" width="60" height="60" loading="lazy" decoding="async" /><span>One vault</span></div>
        <div><img className="principle-icon" src={harnessIcon} alt="" width="60" height="60" loading="lazy" decoding="async" /><span>Any harness</span></div>
        <div><img className="principle-icon" src={everywhereIcon} alt="" width="60" height="60" loading="lazy" decoding="async" /><span>Everywhere</span></div>
      </div>
    </div>
  );
}

function LivingBento() {
  return (
    <section id="system" className="use-case-concept bento-concept" aria-labelledby="bento-title">
      <div className="concept-header">
        <span>What Yoko does</span>
        <h2>One system. Many jobs.</h2>
        <p>From the next hour to the infrastructure underneath it, Yoko keeps what matters moving.</p>
      </div>
      <div className="use-case-bento">
        {useCaseGroups.map((group, index) => (
          <article className={`use-case-bento-card bento-${index}`} key={group.name}>
            <span className="bento-index">0{index + 1}</span>
            <div className="bento-title-row">
              <h3 id={index === 0 ? "bento-title" : undefined}>{group.name}</h3>
              {index === 0 && <img src={planetIcon} alt="" width="78" height="78" loading="lazy" decoding="async" />}
              {index === 5 && <img src={watchtowerIcon} alt="" width="78" height="78" loading="lazy" decoding="async" />}
            </div>
            <div className="use-case-tags">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return <><a className="skip-link" href="#main-content">Skip to content</a><main id="main-content"><GlyphMatrix className="site-glyphs" color="#ff5a00" fadeBottom={0} /><div className="site-shell"><Hero /><div className="use-case-showcase"><LivingBento /></div></div><footer className="site-footer"><span>@ OpenYoko 2026</span><a href="https://thomasbustos.com">thomasbustos.com</a></footer></main></>;
}
