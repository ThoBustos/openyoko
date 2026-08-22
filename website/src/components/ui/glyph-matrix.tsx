import { useEffect, useRef } from "react";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface GlyphMatrixProps extends HTMLAttributes<HTMLCanvasElement> {
  glyphs?: string;
  cellSize?: number;
  mutationRate?: number;
  interval?: number;
  fadeBottom?: number;
  color?: string;
}

export function GlyphMatrix({
  glyphs = "01·+/<>=",
  cellSize = 18,
  mutationRate = 0.055,
  interval = 75,
  fadeBottom = 0.35,
  color = "#fd9a4b",
  className,
  style,
  ...props
}: GlyphMatrixProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rgbaRef = useRef({ r: 253, g: 154, b: 75, a: 1 });

  useEffect(() => {
    const probe = document.createElement("canvas");
    probe.width = 1;
    probe.height = 1;
    const probeContext = probe.getContext("2d");
    if (!probeContext) return;
    probeContext.fillStyle = "#fd9a4b";
    probeContext.fillStyle = color;
    probeContext.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = probeContext.getImageData(0, 0, 1, 1).data;
    rgbaRef.current = { r, g, b, a: a / 255 };
  }, [color]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    let columns = 0;
    let rows = 0;
    let cells: string[] = [];
    let alphas: number[] = [];
    let frame = 0;
    let lastTick = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.ceil(width / cellSize);
      rows = Math.ceil(height / cellSize);
      cells = Array.from({ length: columns * rows }, () => glyphs[Math.floor(Math.random() * glyphs.length)]);
      alphas = Array.from({ length: columns * rows }, () => 0.48 + Math.random() * 0.28);
    };

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      context.clearRect(0, 0, width, height);
      context.font = `${cellSize - 3}px "IBM Plex Mono", monospace`;
      context.textBaseline = "top";
      const { r, g, b, a: colorAlpha } = rgbaRef.current;
      for (let y = 0; y < rows; y += 1) {
        const fade = fadeBottom > 0 ? 1 - (y / rows) * fadeBottom : 1;
        for (let x = 0; x < columns; x += 1) {
          const index = y * columns + x;
          context.fillStyle = `rgba(${r}, ${g}, ${b}, ${alphas[index] * fade * colorAlpha})`;
          context.fillText(cells[index], x * cellSize, y * cellSize);
        }
      }
    };

    const tick = (time: number) => {
      if (time - lastTick >= interval) {
        lastTick = time;
        const total = columns * rows;
        const mutations = Math.max(1, Math.floor(total * mutationRate));
        for (let count = 0; count < mutations; count += 1) {
          const index = Math.floor(Math.random() * total);
          cells[index] = glyphs[Math.floor(Math.random() * glyphs.length)];
          alphas[index] = 0.52 + Math.random() * 0.3;
        }
        draw();
      }
      frame = requestAnimationFrame(tick);
    };

    resize();
    draw();
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) frame = requestAnimationFrame(tick);
    const observer = new ResizeObserver(() => { resize(); draw(); });
    observer.observe(canvas);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, [glyphs, cellSize, mutationRate, interval, fadeBottom]);

  return <canvas ref={canvasRef} className={cn("glyph-matrix", className)} style={{ width: "100%", height: "100%", display: "block", ...style }} aria-hidden="true" {...props} />;
}
