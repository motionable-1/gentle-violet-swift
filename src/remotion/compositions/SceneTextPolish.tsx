import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { BlurReveal } from "../library/components/text/TextAnimation";
import { loadFont as loadEbGaramond } from "@remotion/google-fonts/EBGaramond";
import { loadFont as loadFigtree } from "@remotion/google-fonts/Figtree";

const { fontFamily: garamond } = loadEbGaramond("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});
const { fontFamily: figtree } = loadFigtree("normal", {
  weights: ["400", "600", "700"],
  subsets: ["latin"],
});

// Filler word that gets crossed out
const FillerWord: React.FC<{
  word: string;
  frame: number;
  strikeDelay: number;
  removeDelay: number;
}> = ({ word, frame, strikeDelay, removeDelay }) => {
  const strikeProgress = interpolate(
    frame,
    [strikeDelay, strikeDelay + 8],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const removeProgress = interpolate(
    frame,
    [removeDelay, removeDelay + 12],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  const scaleX = interpolate(removeProgress, [0, 1], [1, 0]);
  const opacity = interpolate(removeProgress, [0, 0.8, 1], [1, 0.5, 0]);

  return (
    <span
      style={{
        display: "inline-block",
        position: "relative",
        color: "#E74C3C",
        opacity,
        transform: `scaleX(${scaleX})`,
        transformOrigin: "center",
        fontWeight: 600,
      }}
    >
      {word}
      {/* Strike-through line */}
      <span
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          width: `${strikeProgress * 100}%`,
          height: 2.5,
          backgroundColor: "#E74C3C",
          transform: "translateY(-50%)",
        }}
      />
    </span>
  );
};

export const SceneTextPolish: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Before/After card timing
  const beforeDelay = 40;
  const afterDelay = 110;

  const beforeOpacity = interpolate(
    frame,
    [beforeDelay, beforeDelay + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const beforeY = interpolate(
    frame,
    [beforeDelay, beforeDelay + 20],
    [40, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  const afterOpacity = interpolate(
    frame,
    [afterDelay, afterDelay + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const afterY = interpolate(
    frame,
    [afterDelay, afterDelay + 20],
    [40, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // Success badge
  const badgeDelay = 160;
  const badgeScale = spring({
    frame: frame - badgeDelay,
    fps,
    config: { damping: 12, stiffness: 100 },
    durationInFrames: 30,
  });
  const badgeOpacity = interpolate(
    frame,
    [badgeDelay, badgeDelay + 10],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Arrow
  const arrowDelay = 90;
  const arrowOpacity = interpolate(
    frame,
    [arrowDelay, arrowDelay + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const arrowX = interpolate(
    frame,
    [arrowDelay, arrowDelay + 20],
    [-20, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 100px",
      }}
    >
      {/* Section header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 12,
          opacity: frame >= 0 ? 1 : 0,
        }}
      >
        <BlurReveal
          stagger={0.03}
          duration={0.5}
          startFrom={0}
          style={{
            fontFamily: figtree,
            fontSize: 16,
            fontWeight: 600,
            color: "#034F46",
            textTransform: "uppercase" as const,
            letterSpacing: "0.12em",
          }}
        >
          Feature 02
        </BlurReveal>
      </div>

      <div
        style={{
          textAlign: "center",
          marginBottom: 50,
          opacity: frame >= 8 ? 1 : 0,
        }}
      >
        <BlurReveal
          stagger={0.04}
          duration={0.6}
          startFrom={8}
          className="text-balance"
          style={{
            fontFamily: garamond,
            fontSize: 58,
            fontWeight: 700,
            color: "#1A1A1A",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
          }}
        >
          Intelligent Text Polishing
        </BlurReveal>
      </div>

      {/* Before / After cards */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 40,
          width: "100%",
          maxWidth: 1200,
          justifyContent: "center",
        }}
      >
        {/* Before card */}
        <div
          style={{
            opacity: beforeOpacity,
            transform: `translateY(${beforeY}px)`,
            flex: 1,
            maxWidth: 460,
            background: "rgba(255,255,235,0.92)",
            border: "2px solid rgba(231,76,60,0.2)",
            borderRadius: 16,
            padding: "24px 28px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              fontFamily: figtree,
              fontSize: 12,
              fontWeight: 700,
              color: "#E74C3C",
              textTransform: "uppercase" as const,
              letterSpacing: "0.1em",
              marginBottom: 14,
            }}
          >
            Before — Raw Speech
          </div>
          <div
            style={{
              fontFamily: figtree,
              fontSize: 18,
              color: "#1A1A1A",
              lineHeight: 1.8,
            }}
          >
            So{" "}
            <FillerWord
              word="umm"
              frame={frame}
              strikeDelay={beforeDelay + 25}
              removeDelay={beforeDelay + 45}
            />{" "}
            I was thinking that{" "}
            <FillerWord
              word="like"
              frame={frame}
              strikeDelay={beforeDelay + 30}
              removeDelay={beforeDelay + 50}
            />{" "}
            the quarterly report{" "}
            <FillerWord
              word="you know"
              frame={frame}
              strikeDelay={beforeDelay + 35}
              removeDelay={beforeDelay + 55}
            />{" "}
            shows{" "}
            <FillerWord
              word="basically"
              frame={frame}
              strikeDelay={beforeDelay + 40}
              removeDelay={beforeDelay + 60}
            />{" "}
            significant growth
          </div>
        </div>

        {/* Arrow */}
        <div
          style={{
            opacity: arrowOpacity,
            transform: `translateX(${arrowX}px)`,
            fontSize: 40,
            color: "#034F46",
          }}
        >
          →
        </div>

        {/* After card */}
        <div
          style={{
            opacity: afterOpacity,
            transform: `translateY(${afterY}px)`,
            flex: 1,
            maxWidth: 460,
            background: "rgba(255,255,235,0.92)",
            border: "2px solid rgba(3,79,70,0.2)",
            borderRadius: 16,
            padding: "24px 28px",
            boxShadow:
              "0 8px 30px rgba(3,79,70,0.08), 0 0 0 1px rgba(3,79,70,0.05)",
          }}
        >
          <div
            style={{
              fontFamily: figtree,
              fontSize: 12,
              fontWeight: 700,
              color: "#034F46",
              textTransform: "uppercase" as const,
              letterSpacing: "0.1em",
              marginBottom: 14,
            }}
          >
            After — Polished Text ✨
          </div>
          <div
            style={{
              fontFamily: figtree,
              fontSize: 18,
              color: "#1A1A1A",
              lineHeight: 1.8,
            }}
          >
            The quarterly report shows significant growth in user engagement
            across all platforms.
          </div>
        </div>
      </div>

      {/* Success badge */}
      <div
        style={{
          opacity: badgeOpacity,
          transform: `scale(${Math.max(0, badgeScale)})`,
          marginTop: 40,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: "#034F46",
            color: "#FFFFEB",
            fontFamily: figtree,
            fontSize: 16,
            fontWeight: 600,
            padding: "10px 24px",
            borderRadius: 50,
          }}
        >
          <span>✓</span>
          <span>Filler words removed automatically</span>
        </div>
      </div>
    </div>
  );
};
