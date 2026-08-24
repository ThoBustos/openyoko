import type { SVGProps } from "react";
import { faOpenai } from "@fortawesome/free-brands-svg-icons";
import { siAnthropic, siClaude, siCloudflare, siCursor, siExcalidraw, siGmail, siGooglecalendar, siGoogledocs, siGoogledrive, siGooglemeet, siLinear, siNotion, siObsidian, siPi, siRailway, siResend, siSupabase, siTelegram, siVercel, siWhatsapp, siZoom } from "simple-icons";

type MarkProps = SVGProps<SVGSVGElement>;

function SimpleMark({ icon, ...props }: MarkProps & { icon: typeof siClaude }) {
  return <svg viewBox="0 0 24 24" fill={`#${icon.hex}`} aria-hidden="true" {...props}><path d={icon.path} /></svg>;
}

export function OpenAIMark(props: MarkProps) {
  const [width, height, , , path] = faOpenai.icon;
  return <svg viewBox={`0 0 ${width} ${height}`} fill="currentColor" aria-hidden="true" {...props}><path d={Array.isArray(path) ? path.join(" ") : path} /></svg>;
}

export function ClaudeMark(props: MarkProps) { return <SimpleMark icon={siClaude} {...props} />; }
export function AnthropicMark(props: MarkProps) { return <SimpleMark icon={siAnthropic} {...props} />; }
export function PiMark(props: MarkProps) { return <SimpleMark icon={siPi} {...props} />; }
export function CursorMark(props: MarkProps) { return <SimpleMark icon={siCursor} {...props} />; }
export function ObsidianMark(props: MarkProps) { return <SimpleMark icon={siObsidian} {...props} />; }
export function TelegramMark(props: MarkProps) { return <SimpleMark icon={siTelegram} {...props} />; }
export function WhatsAppMark(props: MarkProps) { return <SimpleMark icon={siWhatsapp} {...props} />; }
export function LinearMark(props: MarkProps) { return <SimpleMark icon={siLinear} {...props} />; }
export function NotionMark(props: MarkProps) { return <SimpleMark icon={siNotion} {...props} />; }
export function ExcalidrawMark(props: MarkProps) { return <SimpleMark icon={siExcalidraw} {...props} />; }
export function RailwayMark(props: MarkProps) { return <SimpleMark icon={siRailway} {...props} />; }
export function SupabaseMark(props: MarkProps) { return <SimpleMark icon={siSupabase} {...props} />; }
export function VercelMark(props: MarkProps) { return <SimpleMark icon={siVercel} {...props} />; }
export function ResendMark(props: MarkProps) { return <SimpleMark icon={siResend} {...props} />; }
export function CloudflareMark(props: MarkProps) { return <SimpleMark icon={siCloudflare} {...props} />; }
export function ZoomMark(props: MarkProps) { return <SimpleMark icon={siZoom} {...props} />; }
export function GmailMark(props: MarkProps) { return <SimpleMark icon={siGmail} {...props} />; }
export function GoogleCalendarMark(props: MarkProps) { return <SimpleMark icon={siGooglecalendar} {...props} />; }
export function GoogleDriveMark(props: MarkProps) { return <SimpleMark icon={siGoogledrive} {...props} />; }
export function GoogleMeetMark(props: MarkProps) { return <SimpleMark icon={siGooglemeet} {...props} />; }
export function GoogleDocsMark(props: MarkProps) { return <SimpleMark icon={siGoogledocs} {...props} />; }

export function FigmaMark(props: MarkProps) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path fill="#F24E1E" d="M8 2h4v7H8a3.5 3.5 0 1 1 0-7Z" />
    <path fill="#FF7262" d="M12 2h4a3.5 3.5 0 1 1 0 7h-4V2Z" />
    <path fill="#A259FF" d="M8 9h4v7H8a3.5 3.5 0 1 1 0-7Z" />
    <circle cx="15.5" cy="12.5" r="3.5" fill="#1ABCFE" />
    <path fill="#0ACF83" d="M8 16h4v3.5A3.5 3.5 0 1 1 8 16Z" />
  </svg>;
}

export function GoogleMark(props: MarkProps) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.4-.18-2.05H12v3.87h5.38a4.6 4.6 0 0 1-2 3.01v2.52h3.25c1.9-1.75 2.97-4.34 2.97-7.35Z" />
    <path fill="#34A853" d="M12 22c2.7 0 4.97-.9 6.63-2.42l-3.25-2.52c-.9.6-2.05.96-3.38.96-2.6 0-4.81-1.76-5.6-4.12H3.05v2.6A10 10 0 0 0 12 22Z" />
    <path fill="#FBBC05" d="M6.4 13.9a6.01 6.01 0 0 1 0-3.8V7.5H3.05a10 10 0 0 0 0 9l3.35-2.6Z" />
    <path fill="#EA4335" d="M12 5.98c1.47 0 2.79.5 3.83 1.5L18.7 4.6A9.62 9.62 0 0 0 12 2a10 10 0 0 0-8.95 5.5l3.35 2.6C7.19 7.74 9.4 5.98 12 5.98Z" />
  </svg>;
}

export function GranolaMark(props: MarkProps) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <rect width="24" height="24" rx="5" fill="#B7CC3F" />
    <path d="M18.2 5.7c-4.7-2.2-10.8-.3-12.4 4.4-1.5 4.3 1.2 8.5 5.5 8.7 3.5.2 6.8-2.2 6.8-5.7 0-3-2.4-5.3-5.3-5.1-2.5.1-4.4 2-4.3 4.3.1 1.9 1.7 3.4 3.5 3.3 1.5 0 2.7-1 2.8-2.4.1-1.1-.8-2.1-1.9-2.1-.8 0-1.5.6-1.5 1.4" fill="none" stroke="#1B1B1B" strokeWidth="2.1" strokeLinecap="round" />
  </svg>;
}

export function TeamsMark(props: MarkProps) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <rect x="2" y="5" width="12" height="14" rx="2" fill="#5059C9" />
    <rect x="8" y="3" width="9" height="16" rx="2" fill="#7B83EB" />
    <circle cx="18.5" cy="6" r="2.5" fill="#7B83EB" />
    <path d="M17 9h3a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3h-3V9Z" fill="#5059C9" />
    <path d="M5 9h7v2H9.5v6h-2v-6H5V9Z" fill="#fff" />
  </svg>;
}

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
