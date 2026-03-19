import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
  Img,
} from "remotion";
import {
  FadeInWords,
  BlurReveal,
} from "../library/components/text/TextAnimation";
import { loadFont as loadEbGaramond } from "@remotion/google-fonts/EBGaramond";
import { loadFont as loadFigtree } from "@remotion/google-fonts/Figtree";
import { BrandReveal } from "./BrandReveal";

const LOGO_URL =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/wispr-flow/1773904288024_3y4k6f81fv5_wispr_flow_logo.svg";

const { fontFamily: garamond } = loadEbGaramond("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});
const { fontFamily: figtree } = loadFigtree("normal", {
  weights: ["400", "600", "700"],
  subsets: ["latin"],
});

/**
 * Intro scene choreography:
 *   0–70f   Brand mark SVG animation (grow + pulse)
 *   55–80f  Mark scales down and drifts up, wordmark fades in beside it
 *   70–95f  Headline text reveals
 *   90–110f Subtitle fades in
 *   120+    Funding badge springs in
 */

export const SceneIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ─── Phase 1: Brand mark (centered, large) ───
  // Mark fades in at frame 0, stays centered until frame 55, then shrinks up
  const markCenteredOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scale: starts at 1, shrinks to 0.55 as it moves to logo row
  const markScale = interpolate(frame, [55, 78], [1, 0.55], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  // Y position: starts centered (0), moves up to logo position
  const markY = interpolate(frame, [55, 78], [0, -190], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  // ─── Phase 2: Wordmark appears beside icon ───
  const wordmarkDelay = 68;
  const wordmarkOpacity = interpolate(
    frame,
    [wordmarkDelay, wordmarkDelay + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const wordmarkX = interpolate(
    frame,
    [wordmarkDelay, wordmarkDelay + 18],
    [20, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // ─── Phase 3: Headline text ───
  const headlineDelay = 80;

  // ─── Phase 4: Subtitle ───
  const subtitleDelay = 105;
  const subtitleOpacity = interpolate(
    frame,
    [subtitleDelay, subtitleDelay + 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const subtitleY = interpolate(
    frame,
    [subtitleDelay, subtitleDelay + 25],
    [25, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // ─── Phase 5: Funding badge ───
  const badgeDelay = 130;
  const badgeScale = spring({
    frame: frame - badgeDelay,
    fps,
    config: { damping: 14, stiffness: 100 },
    durationInFrames: 30,
  });
  const badgeOpacity = interpolate(
    frame,
    [badgeDelay, badgeDelay + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
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
      }}
    >
      {/* Brand mark — starts centered, then shrinks up into logo row */}
      <div
        style={{
          opacity: markCenteredOpacity,
          transform: `translateY(${markY}px) scale(${markScale})`,
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 40,
        }}
      >
        <BrandReveal size={140} />

        {/* Wordmark (appears after mark shrinks) */}
        <div
          style={{
            opacity: wordmarkOpacity,
            transform: `translateX(${wordmarkX}px)`,
          }}
        >
          <Img src={LOGO_URL} style={{ width: 180, height: "auto" }} />
        </div>
      </div>

      {/* Headline */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 20,
          opacity: frame >= headlineDelay ? 1 : 0,
        }}
      >
        <BlurReveal
          stagger={0.04}
          duration={0.6}
          startFrom={headlineDelay}
          className="text-balance"
          style={{
            fontFamily: garamond,
            fontSize: 82,
            fontWeight: 700,
            color: "#1A1A1A",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          Don&apos;t type, just speak
        </BlurReveal>
      </div>

      {/* Subtitle */}
      <div
        style={{
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          textAlign: "center",
          maxWidth: 700,
        }}
      >
        <FadeInWords
          stagger={0.06}
          duration={0.5}
          startFrom={subtitleDelay}
          style={{
            fontFamily: figtree,
            fontSize: 26,
            fontWeight: 400,
            color: "#1A1A1A",
            opacity: 0.7,
            lineHeight: 1.5,
          }}
        >
          AI-powered voice dictation that transforms your speech into polished
          writing
        </FadeInWords>
      </div>

      {/* Funding badge */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          opacity: badgeOpacity,
          transform: `scale(${Math.max(0, badgeScale)})`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "#034F46",
            color: "#FFFFEB",
            fontFamily: figtree,
            fontSize: 16,
            fontWeight: 600,
            padding: "10px 24px",
            borderRadius: 50,
            letterSpacing: "0.02em",
          }}
        >
          <span style={{ fontSize: 20 }}>🚀</span>
          <span>$81M Raised — Backed by Top Investors</span>
        </div>
      </div>
    </div>
  );
};
