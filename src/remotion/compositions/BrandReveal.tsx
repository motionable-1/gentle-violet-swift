import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

/**
 * Wispr Flow brand mark — 5 vertical bars forming an audio waveform.
 * Animation sequence:
 *   0–18f   Bars grow from center outward with spring stagger
 *   18–55f  Bars pulse like a live waveform
 *   55–70f  Bars settle into final mark shape
 *   70+     Static settled mark (fades via parent)
 */

// Bar layout (x positions, rest heights as fraction of max)
const BARS = [
  { x: 20, restH: 1.0 }, // Bar 1: Tall
  { x: 35, restH: 0.38 }, // Bar 2: Short
  { x: 50, restH: 0.65 }, // Bar 3: Medium
  { x: 65, restH: 0.38 }, // Bar 4: Short
  { x: 80, restH: 1.0 }, // Bar 5: Tall
];

const CENTER_Y = 50;
const MAX_HALF_HEIGHT = 28; // max bar extends ±28 from center
const BAR_WIDTH = 7.5;

export const BrandReveal: React.FC<{
  /** Overall size of the icon */
  size?: number;
  style?: React.CSSProperties;
}> = ({ size = 140, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        width: size,
        height: size,
        ...style,
      }}
    >
      <svg viewBox="0 0 100 100" width={size} height={size}>
        {/* Rounded background square */}
        <rect
          x="0"
          y="0"
          width="100"
          height="100"
          rx="24"
          fill="#034F46"
          opacity={interpolate(frame, [0, 12], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          })}
          transform={`scale(${interpolate(frame, [0, 14], [0.7, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          })})`}
          style={{ transformOrigin: "50px 50px" }}
        />

        {/* 5 waveform bars */}
        {BARS.map((bar, i) => {
          // Stagger entrance: center bar first, then outward
          const distFromCenter = Math.abs(i - 2);
          const entranceDelay = 4 + distFromCenter * 3;

          // Spring growth
          const growProgress = spring({
            frame: frame - entranceDelay,
            fps,
            config: { damping: 10, stiffness: 120 },
            durationInFrames: 25,
          });

          // Waveform pulse phase (active between frames 18–60)
          const pulseActive = interpolate(frame, [18, 22, 55, 62], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          // Each bar has a unique phase and frequency for organic feel
          const time = frame / fps;
          const freq1 = 3.5 + i * 0.8;
          const freq2 = 2.2 - i * 0.3;
          const phase1 = i * 1.2;
          const phase2 = i * 0.7 + 2;
          const pulse =
            Math.sin(time * freq1 + phase1) * 0.35 +
            Math.sin(time * freq2 + phase2) * 0.25;

          // Mix rest height with pulse
          const pulseHeight = 0.3 + pulse * 0.7; // 0..1 range
          const currentHeight = bar.restH + (pulseHeight - bar.restH) * pulseActive;

          // Final half-height
          const halfH = MAX_HALF_HEIGHT * currentHeight * growProgress;

          const y1 = CENTER_Y - halfH;
          const y2 = CENTER_Y + halfH;

          // Bar opacity
          const barOpacity = interpolate(
            frame,
            [entranceDelay, entranceDelay + 8],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <line
              key={i}
              x1={bar.x}
              y1={y1}
              x2={bar.x}
              y2={y2}
              stroke="#FFFFEB"
              strokeWidth={BAR_WIDTH}
              strokeLinecap="round"
              opacity={barOpacity}
            />
          );
        })}
      </svg>
    </div>
  );
};
