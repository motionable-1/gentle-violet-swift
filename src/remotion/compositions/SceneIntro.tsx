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
import { ShapeAnimation } from "../library/components/effects/ShapeAnimation";

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

export const SceneIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo entrance
  const logoScale = spring({ frame, fps, config: { damping: 12, stiffness: 80 }, durationInFrames: 40 });
  const logoOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Tagline entrance delay
  const taglineDelay = 25;

  // Subtitle entrance delay
  const subtitleDelay = 50;
  const subtitleOpacity = interpolate(frame, [subtitleDelay, subtitleDelay + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtitleY = interpolate(frame, [subtitleDelay, subtitleDelay + 25], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Decorative shapes
  const shape1Opacity = interpolate(frame, [15, 35], [0, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shape2Opacity = interpolate(frame, [30, 50], [0, 0.25], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Funding badge
  const badgeDelay = 70;
  const badgeScale = spring({ frame: frame - badgeDelay, fps, config: { damping: 14, stiffness: 100 }, durationInFrames: 30 });
  const badgeOpacity = interpolate(frame, [badgeDelay, badgeDelay + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
      {/* Decorative floating shapes */}
      <div
        style={{
          position: "absolute",
          top: 120,
          right: 200,
          opacity: shape1Opacity,
          transform: `rotate(${frame * 0.5}deg)`,
        }}
      >
        <ShapeAnimation shape="ring" color="#034F46" size={80} strokeColor="#034F46" strokeWidth={2} animation="breathe" speed={0.3} />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 180,
          left: 220,
          opacity: shape2Opacity,
          transform: `rotate(${-frame * 0.3}deg)`,
        }}
      >
        <ShapeAnimation shape="diamond" color="#F0D7FF" size={50} animation="breathe" speed={0.4} />
      </div>

      <div
        style={{
          position: "absolute",
          top: 250,
          left: 300,
          opacity: shape1Opacity * 0.6,
        }}
      >
        <ShapeAnimation shape="circle" color="#034F46" size={20} animation="pulse" speed={0.5} />
      </div>

      {/* Logo */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          marginBottom: 40,
        }}
      >
        <Img src={LOGO_URL} style={{ width: 220, height: "auto" }} />
      </div>

      {/* Headline */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <BlurReveal
          stagger={0.04}
          duration={0.6}
          startFrom={taglineDelay}
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
          Don't type, just speak
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
          AI-powered voice dictation that transforms your speech into polished writing
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
