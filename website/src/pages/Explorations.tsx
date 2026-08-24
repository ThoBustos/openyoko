import { useRef, type ReactNode } from "react";
import { ArrowDown, ArrowUpRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { GlyphMatrix } from "@/components/ui/glyph-matrix";
import { Marquee } from "@/components/ui/marquee";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { EverywhereIcon, HarnessIcon } from "@/components/icons";
import { AnthropicMark, ClaudeMark, CloudflareMark, ComputerMark, CursorMark, ExcalidrawMark, FigmaMark, GoogleMark, GranolaMark, HermesMark, LinearMark, NotionMark, ObsidianMark, OpenAIMark, PiMark, RailwayMark, ResendMark, SlackMark, SupabaseMark, TeamsMark, TelegramMark, VercelMark, WhatsAppMark } from "@/components/brand-marks";
import yoko from "@/assets/yoko.webp";
import mark from "@/assets/openyoko-no-bg.webp";
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

const providers = [
  { name: "OpenAI", mark: <OpenAIMark /> },
  { name: "Slack", mark: <SlackMark /> },
  { name: "Codex", mark: <OpenAIMark /> },
  { name: "Notion", mark: <NotionMark /> },
  { name: "Anthropic", mark: <AnthropicMark /> },
  { name: "Granola", mark: <GranolaMark /> },
  { name: "Claude Code", mark: <ClaudeMark /> },
  { name: "Linear", mark: <LinearMark /> },
  { name: "Gemini", logo: gemini },
  { name: "WhatsApp", mark: <WhatsAppMark /> },
  { name: "Cursor", mark: <CursorMark /> },
  { name: "Supabase", mark: <SupabaseMark /> },
  { name: "Mistral", logo: mistral },
  { name: "Figma", mark: <FigmaMark /> },
  { name: "Hermes", mark: <HermesMark /> },
  { name: "Google Workspace", mark: <GoogleMark /> },
  { name: "DeepSeek", logo: deepseek },
  { name: "Ashby", logo: ashby },
  { name: "Pi", mark: <PiMark /> },
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
      <div className="provider-label">
        <span>Bring your stack</span>
        <small>Models · harnesses · channels</small>
      </div>
      <Marquee pauseOnHover className="provider-marquee">
        {providers.map(({ name, logo, mark }) => (
          <div className="provider" key={name} title={name}>
            {mark ? <span className="provider-mark">{mark}</span> : <img src={logo} alt="" />}
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
        <a className="brand" href="#top" aria-label="OpenYoko home">
          <img src={mark} alt="" />
          <span>OPENYOKO</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#system">The system</a>
          <a href={githubUrl} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <span className="eyebrow">Thomas’ open-source personal AI system</span>
          <h1 id="hero-title">Your AI,<br />with you<br />everywhere.</h1>
          <p>One private vault connects every AI harness—across your devices, tools, work, and life.</p>
          <div className="actions">
            <Button asChild>
              <a href={githubUrl} target="_blank" rel="noreferrer">
                <Github size={15} /> View on GitHub <ArrowUpRight size={15} />
              </a>
            </Button>
            <a className="text-link" href="#system">See how it works <ArrowDown size={15} /></a>
          </div>
        </div>

        <div className="yoko-panel">
          <div className="yoko-card-header"><span>Yoko</span><small><i /> Live</small></div>
          <div className="yoko-card">
            <img src={yoko} alt="Yoko, an illustrated personal AI assistant" />
          </div>
          <p>One assistant. The same private context, wherever you work.</p>
        </div>
      </section>

      <ProviderLogos />

      <div className="principles" aria-label="OpenYoko principles">
        <div><img className="principle-icon" src={vaultIcon} alt="" /><span>One vault</span></div>
        <div><img className="principle-icon" src={harnessIcon} alt="" /><span>Any harness</span></div>
        <div><img className="principle-icon" src={everywhereIcon} alt="" /><span>Everywhere</span></div>
      </div>
    </div>
  );
}

function ConceptHeader({ number, label, title, body }: { number: string; label: string; title: string; body: string }) {
  return (
    <div className="concept-header">
      <span>{number} · {label}</span>
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  );
}

function UseCaseOrbit() {
  return (
    <section className="use-case-concept solar-concept" aria-labelledby="solar-title">
      <ConceptHeader number="01" label="Yoko solar system" title="Everything in orbit." body="Your direction, work, relationships, and systems stay in motion around one continuous Yoko." />
      <div className="use-case-orbit" aria-label="Yoko use cases arranged in six orbital groups">
        <div className="use-case-orbit-core"><img src={mark} alt="" /><strong id="solar-title">Yoko</strong><span>Keeps it moving</span></div>
        {useCaseGroups.map((group, groupIndex) => (
          <OrbitingCircles key={group.name} radius={82 + groupIndex * 53} duration={26 + groupIndex * 7} iconSize={112} reverse={groupIndex % 2 === 1}>
            {group.items.map((item) => <div className={`use-case-orbit-chip orbit-tone-${groupIndex}`} key={item}>{item}</div>)}
          </OrbitingCircles>
        ))}
      </div>
      <div className="orbit-mobile-list">{useCaseGroups.map((group) => <div key={group.name}><strong>{group.name}</strong><p>{group.items.join(" · ")}</p></div>)}</div>
    </section>
  );
}

function UseCaseBento() {
  return (
    <section className="use-case-concept bento-concept" aria-labelledby="bento-title">
      <ConceptHeader number="02" label="Living bento" title="One system. Many jobs." body="A quieter inventory of what Yoko operates—from the next hour to the infrastructure underneath it." />
      <div className="use-case-bento">
        {useCaseGroups.map((group, index) => (
          <article className={`use-case-bento-card bento-${index}`} key={group.name}>
            <span className="bento-index">0{index + 1}</span>
            <div className="bento-title-row">
              <h3 id={index === 0 ? "bento-title" : undefined}>{group.name}</h3>
              {index === 0 && <img src={planetIcon} alt="" />}
              {index === 5 && <img src={watchtowerIcon} alt="" />}
            </div>
            <div className="use-case-tags">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

function OperatingMap() {
  return (
    <section className="use-case-concept map-concept" aria-labelledby="map-title">
      <ConceptHeader number="03" label="Operating-system map" title="Direction becomes action." body="A top-to-bottom view of how Yoko carries intention through work, follow-through, and the systems that keep everything alive." />
      <div className="operating-map">
        {useCaseGroups.map((group, index) => (
          <div className={`map-layer map-layer-${index}`} key={group.name}>
            <div className="map-layer-name"><span>0{index + 1}</span><h3 id={index === 0 ? "map-title" : undefined}>{group.name}</h3></div>
            <div className="map-items">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
            {index < useCaseGroups.length - 1 && <i aria-hidden="true">↓</i>}
          </div>
        ))}
        <div className="map-running-thread"><span>One running thread</span><strong>Yoko reads what happened, updates the system, and brings forward what matters next.</strong></div>
      </div>
    </section>
  );
}

function CoreUseCases() {
  return <div className="use-case-showcase"><UseCaseBento /></div>;
}

function LogoNode({ label, children }: { label: string; children: ReactNode }) {
  return <div className="logo-node" title={label} aria-label={label}>{children}</div>;
}

function OrbitExploration() {
  return (
    <section className="exploration option-orbit">
      <div className="exploration-copy">
        <span className="direction-label">Direction · Orbital stack</span>
        <h2>Yoko at the center.</h2>
        <p>A living map of the replaceable tools around one durable system. The inner ring is where you think; the outer ring is where Yoko can reach you.</p>
        <small>Magic UI · Orbiting Circles</small>
      </div>
      <div className="orbit-stage" aria-label="Providers and communication channels orbiting Yoko">
        <div className="orbit-core"><img src={mark} alt="" /><ObsidianMark className="orbit-vault-mark" /><strong>Yoko</strong><span>Shared second brain</span></div>
        <OrbitingCircles radius={118} duration={24} iconSize={48}>
          <LogoNode label="Codex"><OpenAIMark /></LogoNode>
          <LogoNode label="Claude Code"><ClaudeMark /></LogoNode>
          <LogoNode label="Cursor"><CursorMark /></LogoNode>
          <LogoNode label="Hermes Agent"><HermesMark /></LogoNode>
        </OrbitingCircles>
        <OrbitingCircles radius={205} duration={34} iconSize={48} reverse>
          <LogoNode label="Slack"><SlackMark /></LogoNode>
          <LogoNode label="WhatsApp"><WhatsAppMark /></LogoNode>
          <LogoNode label="Telegram"><TelegramMark /></LogoNode>
          <LogoNode label="Computer"><ComputerMark /></LogoNode>
          <LogoNode label="Ashby"><img src={ashby} alt="" /></LogoNode>
        </OrbitingCircles>
      </div>
    </section>
  );
}

function TopologyExploration() {
  return (
    <section className="exploration option-topology">
      <div className="exploration-heading">
        <div><span className="direction-label">Direction · Runtime topology</span><h2>Two runtimes.<br />One second brain.</h2></div>
        <p>Local terminal sessions and an always-on VPS do different jobs, but both read and write the same durable Obsidian context.</p>
      </div>
      <div className="topology-stage">
        <article className="runtime-card">
          <ComputerMark /><span>Local runtime</span><h3>Your terminal</h3><p>Codex, Claude Code, and Cursor work beside you on the machine in front of you.</p>
          <div className="mini-marks"><OpenAIMark /><ClaudeMark /><CursorMark /></div>
        </article>
        <div className="shared-context">
          <ObsidianMark /><span>Shared source of truth</span><h3>Second brain</h3><p>Markdown memory · project state · decisions · skills</p>
        </div>
        <article className="runtime-card cloud-runtime">
          <HermesMark /><span>Online runtime</span><h3>Yoko on a VPS</h3><p>Hermes stays available for remote requests, scheduled work, and asynchronous follow-through.</p>
          <div className="mini-marks"><SlackMark /><WhatsAppMark /><TelegramMark /></div>
        </article>
      </div>
      <div className="surface-strip"><span>Reach the same Yoko from</span><div><SlackMark /><WhatsAppMark /><TelegramMark /><ComputerMark /><img src={ashby} alt="Ashby" /></div></div>
    </section>
  );
}

function BeamExploration() {
  const container = useRef<HTMLDivElement>(null);
  const codexNode = useRef<HTMLDivElement>(null);
  const claudeNode = useRef<HTMLDivElement>(null);
  const hermesNode = useRef<HTMLDivElement>(null);
  const coreNode = useRef<HTMLDivElement>(null);
  const slackNode = useRef<HTMLDivElement>(null);
  const whatsappNode = useRef<HTMLDivElement>(null);
  const terminalNode = useRef<HTMLDivElement>(null);
  return (
    <section className="exploration option-beam">
      <div className="exploration-heading">
        <div><span className="direction-label">Direction · Integration map</span><h2>Every interface. One memory.</h2></div>
        <p>Animated paths make the architecture literal: harnesses read from the same private context, then Yoko continues the work wherever Thomas is.</p>
      </div>
      <div className="beam-stage" ref={container}>
        <div className="beam-column beam-inputs">
          <div className="beam-node" ref={codexNode}><OpenAIMark /><span>Codex</span></div>
          <div className="beam-node" ref={claudeNode}><ClaudeMark /><span>Claude Code</span></div>
          <div className="beam-node" ref={hermesNode}><HermesMark /><span>Hermes</span></div>
        </div>
        <div className="beam-core" ref={coreNode}><img src={mark} alt="" /><span>Yoko</span><small>Vault · state · skills</small></div>
        <div className="beam-column beam-outputs">
          <div className="beam-node" ref={slackNode}><SlackMark /><span>Slack</span></div>
          <div className="beam-node" ref={whatsappNode}><WhatsAppMark /><span>WhatsApp</span></div>
          <div className="beam-node" ref={terminalNode}><ComputerMark /><span>Terminal</span></div>
        </div>
        <AnimatedBeam containerRef={container} fromRef={codexNode} toRef={coreNode} curvature={42} />
        <AnimatedBeam containerRef={container} fromRef={claudeNode} toRef={coreNode} delay={.7} />
        <AnimatedBeam containerRef={container} fromRef={hermesNode} toRef={coreNode} curvature={-42} delay={1.4} />
        <AnimatedBeam containerRef={container} fromRef={coreNode} toRef={slackNode} curvature={-42} delay={.4} />
        <AnimatedBeam containerRef={container} fromRef={coreNode} toRef={whatsappNode} delay={1.1} />
        <AnimatedBeam containerRef={container} fromRef={coreNode} toRef={terminalNode} curvature={42} delay={1.8} />
      </div>
      <div className="component-credit">Magic UI · Animated Beam</div>
    </section>
  );
}

function ExplorationsGallery() {
  return <div className="exploration-gallery"><div className="gallery-label"><span>Exploratory modules</span><p>Supporting visual ideas kept together for comparison and future iterations.</p></div><UseCaseOrbit /><OperatingMap /><OrbitExploration /><TopologyExploration /><BeamExploration /></div>;
}

function SystemSection() {
  return (
    <section id="system" className="system-section" aria-labelledby="system-title">
      <div className="system-intro">
        <span className="eyebrow">How the system works</span>
        <h2 id="system-title">Your context stays.<br />The tools can change.</h2>
        <p>YokoOS keeps the durable parts of an assistant outside any single model or app. Yoko is the personal AI Thomas runs on top of that system.</p>
      </div>

      <div className="architecture" aria-label="YokoOS architecture">
        <article className="architecture-card harness-card">
          <HarnessIcon />
          <div><span>Choose an interface</span><h3>Any harness</h3><p>Codex, Claude Code, Cursor, Hermes, or whatever comes next.</p></div>
        </article>
        <div className="architecture-arrow" aria-hidden="true">→</div>
        <article className="architecture-card core-card">
          <img src={mark} alt="" />
          <div><span>The continuity layer</span><h3>Yoko + your vault</h3><p>Markdown memory, project state, decisions, routines, and skills you own.</p></div>
        </article>
        <div className="architecture-arrow" aria-hidden="true">→</div>
        <article className="architecture-card everywhere-card">
          <EverywhereIcon />
          <div><span>Keep the thread</span><h3>Everywhere</h3><p>At home or work, in a terminal, on a server, Slack, or WhatsApp.</p></div>
        </article>
      </div>

      <div className="system-details">
        <article>
          <span>Why it exists</span>
          <h3>Context should compound.</h3>
          <p>Stop re-explaining your goals, decisions, and work every time you change AI tools. The interface is replaceable; your context is not.</p>
        </article>
        <article>
          <span>Private by design</span>
          <h3>Your system. Your data.</h3>
          <p>Plain Markdown and open-source conventions keep the system inspectable, portable, and under your control.</p>
        </article>
        <article className="maintainer-card">
          <span className="status"><i /> Built in public</span>
          <h3>Actively maintained by Thomas.</h3>
          <p>Yoko runs Thomas’s real work and life workflows. The open project evolves from daily use—not a theoretical demo.</p>
          <a href={githubUrl} target="_blank" rel="noreferrer">Follow the build <ArrowUpRight size={15} /></a>
        </article>
      </div>
    </section>
  );
}

function ExplorationsPage() {
  return <main><GlyphMatrix className="site-glyphs" color="#ff5a00" fadeBottom={0} /><div className="site-shell"><Hero /><CoreUseCases /><SystemSection /><ExplorationsGallery /></div></main>;
}

export default ExplorationsPage;
