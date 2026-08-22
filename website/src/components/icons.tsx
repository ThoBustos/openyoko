import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = { viewBox: "0 0 48 48", fill: "none", stroke: "currentColor", strokeWidth: 1.5 };

export function VaultIcon(props: IconProps) {
  return <svg {...base} {...props}><circle cx="24" cy="24" r="15"/><path d="M24 9v30M9 24h30M13.5 14.5l21 19M34.5 14.5l-21 19"/><circle cx="24" cy="24" r="5" fill="currentColor"/><circle cx="24" cy="24" r="2" className="fill-paper"/></svg>;
}
export function HarnessIcon(props: IconProps) {
  return <svg {...base} {...props}><circle cx="24" cy="24" r="4"/><circle cx="10" cy="24" r="3"/><circle cx="38" cy="24" r="3"/><circle cx="24" cy="10" r="3"/><circle cx="24" cy="38" r="3"/><path d="M13 24h7m8 0h7M24 13v7m0 8v7"/></svg>;
}
export function EverywhereIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M24 4l3.5 14.5L42 24l-14.5 3.5L24 44l-3.5-16.5L6 24l14.5-5.5L24 4Z"/><circle cx="24" cy="24" r="3" fill="currentColor"/></svg>;
}
export function CadenceIcon(props: IconProps) {
  return <svg {...base} {...props}><circle cx="24" cy="24" r="17"/><path d="M24 14v10l7 5M9 24h4m22 0h4M24 9v4m0 22v4"/><circle cx="24" cy="24" r="2" fill="currentColor"/></svg>;
}
export function ContextIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M8 11h32v26H8zM14 17h20M14 23h12M14 29h16"/><circle cx="36" cy="33" r="7" className="fill-paper"/><path d="m32 33 3 3 5-7"/></svg>;
}
export function RemoteIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M6 12h36v24H6zM15 42h18M24 36v6"/><path d="M12 28c5-8 19-8 24 0M16 24c4-5 12-5 16 0M21 20c2-2 4-2 6 0"/></svg>;
}
