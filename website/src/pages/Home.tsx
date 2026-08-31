import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Mic, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlyphMatrix } from "@/components/ui/glyph-matrix";
import { Marquee } from "@/components/ui/marquee";
import { AnthropicMark, ClaudeMark, CloudflareMark, CursorMark, ExcalidrawMark, FigmaMark, GmailMark, GoogleCalendarMark, GoogleDocsMark, GoogleDriveMark, GoogleMark, GoogleMeetMark, GranolaMark, HermesMark, LinearMark, NotionMark, ObsidianMark, OpenAIMark, PiMark, RailwayMark, ResendMark, SlackMark, SupabaseMark, TeamsMark, TelegramMark, VercelMark, WhatsAppMark, ZoomMark } from "@/components/brand-marks";
import yoko from "@/assets/yoko.webp";
import mark from "@/assets/openyoko-no-bg.webp";
import everywhereIcon from "@/assets/system-icons/everywhere.webp";
import harnessIcon from "@/assets/system-icons/harness.webp";
import planetIcon from "@/assets/system-icons/planet.webp";
import vaultIcon from "@/assets/system-icons/vault.webp";
import watchtowerIcon from "@/assets/system-icons/watchtower.webp";
import appleIcon from "@/assets/whisper-icons/apple.svg";
import githubIcon from "@/assets/whisper-icons/github.svg";
import huggingFaceIcon from "@/assets/whisper-icons/huggingface.svg";

import deepseek from "@/assets/providers/deepseek.svg";
import gemini from "@/assets/providers/googlegemini.svg";
import mistral from "@/assets/providers/mistralai.svg";
import copilot from "@/assets/providers/githubcopilot.svg";
import opencode from "@/assets/providers/opencode.svg";
import windsurf from "@/assets/providers/windsurf.svg";
import ashby from "@/assets/providers/ashby.webp";

const githubUrl = "https://github.com/ThoBustos/openyoko";
const githubApiUrl = "https://api.github.com/repos/ThoBustos/openyoko";
const whisperUrl = "https://github.com/ThoBustos/yoko-whisper";
const whisperApiUrl = "https://api.github.com/repos/ThoBustos/yoko-whisper";

function WhisperStars() {
  const [stars, setStars] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    fetch(whisperApiUrl, { headers: { Accept: "application/vnd.github+json" }, signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("GitHub request failed")))
      .then((repository: { stargazers_count?: number }) => {
        if (typeof repository.stargazers_count === "number") setStars(repository.stargazers_count);
      })
      .catch(() => undefined);
    return () => controller.abort();
  }, []);
  return <span className="whisper-stars"><Star size={13} fill="currentColor" /> {stars}</span>;
}

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

  return <a className="github-nav-link" href={githubUrl} target="_blank" rel="noreferrer" aria-label={`OpenYoko on GitHub, ${stars} stars`}><span>GitHub</span><span className="github-stars"><Star size={14} fill="currentColor" /> {stars}</span></a>;
}

const providers = [
  { name: "OpenAI", mark: <OpenAIMark /> },
  { name: "Slack", mark: <SlackMark /> },
  { name: "Codex", mark: <OpenAIMark /> },
  { name: "Notion", mark: <NotionMark /> },
  { name: "Anthropic", mark: <AnthropicMark /> },
  { name: "Zoom", mark: <ZoomMark /> },
  { name: "Granola", mark: <GranolaMark /> },
  { name: "Gmail", mark: <GmailMark /> },
  { name: "Claude Code", mark: <ClaudeMark /> },
  { name: "Google Calendar", mark: <GoogleCalendarMark /> },
  { name: "Linear", mark: <LinearMark /> },
  { name: "Gemini", logo: gemini },
  { name: "WhatsApp", mark: <WhatsAppMark /> },
  { name: "Cursor", mark: <CursorMark /> },
  { name: "Supabase", mark: <SupabaseMark /> },
  { name: "Mistral", logo: mistral },
  { name: "Google Drive", mark: <GoogleDriveMark /> },
  { name: "Figma", mark: <FigmaMark /> },
  { name: "Hermes", mark: <HermesMark /> },
  { name: "Google Meet", mark: <GoogleMeetMark /> },
  { name: "Google Workspace", mark: <GoogleMark /> },
  { name: "DeepSeek", logo: deepseek },
  { name: "Ashby", logo: ashby },
  { name: "Pi", mark: <PiMark /> },
  { name: "Google Docs", mark: <GoogleDocsMark /> },
  { name: "Railway", mark: <RailwayMark /> },
  { name: "GitHub Copilot", logo: copilot },
  { name: "Microsoft Teams", mark: <TeamsMark /> },
  { name: "OpenCode", logo: opencode },
  { name: "Telegram", mark: <TelegramMark /> },
  { name: "Windsurf", logo: windsurf },
  { name: "Excalidraw", mark: <ExcalidrawMark /> },
  { name: "Vercel", mark: <VercelMark /> },
  { name: "Obsidian", mark: <ObsidianMark /> },
  { name: "Resend", mark: <ResendMark /> },
  { name: "Cloudflare", mark: <CloudflareMark /> },
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
          <a href="#whisper">Yoko Whisper</a>
          <GitHubLink />
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <span className="eyebrow">Thomas’ open-source personal AI system</span>
          <h1 id="hero-title">Your AI,<br />with you<br />everywhere.</h1>
          <p>One private system connects every AI harness across your devices, tools, work, and life.</p>
          <div className="actions">
            <Button asChild><a href={githubUrl} target="_blank" rel="noreferrer"><img className="github-local-icon" src={githubIcon} alt="" /> View on GitHub <ArrowUpRight size={15} /></a></Button>
            <a className="text-link" href="#system">See how it works <ArrowDown size={15} /></a>
          </div>
        </div>
        <div className="yoko-panel">
          <div className="yoko-card-header"><span>Yoko</span><small><i /> Live</small></div>
          <div className="yoko-card"><img src={yoko} alt="Yoko, an illustrated personal AI assistant" width="1254" height="1254" fetchPriority="high" /></div>
          <div className="yoko-panel-footer">
            <p>One assistant. The same private context, wherever life and work take you.</p>
            <div className="yoko-work"><span>Working with Thomas at</span><a href="https://getsupernal.ai/" target="_blank" rel="noreferrer">Supernal</a></div>
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

function WhisperSection() {
  const bars = [18, 35, 58, 31, 72, 46, 88, 53, 28, 66, 42, 78, 49, 24, 55, 34, 18];
  return (
    <section id="whisper" className="whisper-section" aria-labelledby="whisper-title">
      <div className="whisper-copy">
        <h2 id="whisper-title">Your voice.<br />Straight to text.</h2>
        <p><a href={whisperUrl} target="_blank" rel="noreferrer">Yoko Whisper</a> is a free, open-source alternative to <a href="https://wisprflow.ai/" target="_blank" rel="noreferrer">Wispr Flow</a> and <a href="https://superwhisper.com/" target="_blank" rel="noreferrer">Superwhisper</a>. Hold a key, speak, and your words appear in the app you are already using without uploading your audio to a transcription service.</p>
        <div className="whisper-relationship" aria-label="Yoko Whisper is a separate companion project used with OpenYoko">
          <div><Mic /><strong>Yoko Whisper</strong></div>
          <span className="whisper-relationship-plus">+</span>
          <div><img src={mark} alt="" /><strong>OpenYoko</strong></div>
        </div>
        <div className="whisper-actions"><a className="whisper-primary" href={whisperUrl} target="_blank" rel="noreferrer"><img src={githubIcon} alt="" /> Yoko Whisper repo <WhisperStars /> <ArrowUpRight size={15} /></a></div>
        <small className="whisper-limit"><img src={appleIcon} alt="" /> Beta availability: macOS 14+ on Apple Silicon only</small>
      </div>
      <div className="whisper-demo">
        <div className="whisper-window-head"><strong>Yoko Whisper</strong><span className="whisper-beta"><i /> Beta</span></div>
        <div className="whisper-demo-body"><Mic size={38} /><div className="whisper-wave" aria-hidden="true">{bars.map((height, index) => <i key={index} style={{ height: `${height}%`, animationDelay: `${index * -70}ms` }} />)}</div><strong>Listening…</strong><small>Release to transcribe</small><span className="whisper-shortcut"><kbd>fn</kbd><b>+</b><kbd>space</kbd></span></div>
        <div className="whisper-icon-row" aria-label="Yoko Whisper technology"><span><img src={appleIcon} alt="" /> Apple Silicon</span><span><img src={huggingFaceIcon} alt="" /> WhisperKit</span><span><img src={githubIcon} alt="" /> MIT open source</span></div>
      </div>
    </section>
  );
}

export default function Home() {
  return <><a className="skip-link" href="#main-content">Skip to content</a><main id="main-content"><GlyphMatrix className="site-glyphs" color="#ff5a00" fadeBottom={0} /><div className="site-shell"><Hero /><div className="use-case-showcase"><LivingBento /></div><div className="whisper-home"><WhisperSection /></div></div><footer className="site-footer"><span>@ OpenYoko 2026</span><a href="https://thomasbustos.com">thomasbustos.com</a></footer></main></>;
}
