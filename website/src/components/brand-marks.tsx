import type { SVGProps } from "react";
import { faOpenai } from "@fortawesome/free-brands-svg-icons";
import { siClaude, siCursor, siObsidian, siTelegram, siWhatsapp } from "simple-icons";

type MarkProps = SVGProps<SVGSVGElement>;

function SimpleMark({ icon, ...props }: MarkProps & { icon: typeof siClaude }) {
  return <svg viewBox="0 0 24 24" fill={`#${icon.hex}`} aria-hidden="true" {...props}><path d={icon.path} /></svg>;
}

export function OpenAIMark(props: MarkProps) {
  const [width, height, , , path] = faOpenai.icon;
  return <svg viewBox={`0 0 ${width} ${height}`} fill="currentColor" aria-hidden="true" {...props}><path d={Array.isArray(path) ? path.join(" ") : path} /></svg>;
}

export function ClaudeMark(props: MarkProps) { return <SimpleMark icon={siClaude} {...props} />; }
export function CursorMark(props: MarkProps) { return <SimpleMark icon={siCursor} {...props} />; }
export function ObsidianMark(props: MarkProps) { return <SimpleMark icon={siObsidian} {...props} />; }
export function TelegramMark(props: MarkProps) { return <SimpleMark icon={siTelegram} {...props} />; }
export function WhatsAppMark(props: MarkProps) { return <SimpleMark icon={siWhatsapp} {...props} />; }

export function SlackMark(props: MarkProps) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <rect x="1" y="8.2" width="9.2" height="3.6" rx="1.8" fill="#36C5F0" /><circle cx="9.9" cy="5.1" r="1.8" fill="#36C5F0" />
    <rect x="12.2" y="1" width="3.6" height="9.2" rx="1.8" fill="#2EB67D" /><circle cx="18.9" cy="9.9" r="1.8" fill="#2EB67D" />
    <rect x="13.8" y="12.2" width="9.2" height="3.6" rx="1.8" fill="#ECB22E" /><circle cx="14.1" cy="18.9" r="1.8" fill="#ECB22E" />
    <rect x="8.2" y="13.8" width="3.6" height="9.2" rx="1.8" fill="#E01E5A" /><circle cx="5.1" cy="14.1" r="1.8" fill="#E01E5A" />
  </svg>;
}

export function HermesMark(props: MarkProps) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" {...props}><circle cx="12" cy="12" r="11" fill="#151515" /><text x="12" y="16.4" textAnchor="middle" fontSize="14" fontFamily="serif" fill="#FFD400">☤</text></svg>;
}

export function ComputerMark(props: MarkProps) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="#10131a" strokeWidth="1.8" aria-hidden="true" {...props}><rect x="3" y="4" width="18" height="13" rx="1" /><path d="M8 21h8M12 17v4" /></svg>;
}
