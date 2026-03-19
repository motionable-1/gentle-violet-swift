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
  BlurReveal,
  FadeInChars,
} from "../library/components/text/TextAnimation";
import { loadFont as loadEbGaramond } from "@remotion/google-fonts/EBGaramond";
import { loadFont as loadFigtree } from "@remotion/google-fonts/Figtree";

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

export const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
    durationInFrames: 40,
  });
  const logoOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // CTA Button
  const btnDelay = 50;
  const btnScale = spring({
    frame: frame - btnDelay,
    fps,
    config: { damping: 14, stiffness: 100 },
    durationInFrames: 30,
  });
  const btnOpacity = interpolate(frame, [btnDelay, btnDelay + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // URL
  const urlDelay = 70;
  const urlOpacity = interpolate(frame, [urlDelay, urlDelay + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const urlY = interpolate(frame, [urlDelay, urlDelay + 25], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Ambient button pulse
  const btnPulse = 1 + Math.sin(frame / 20) * 0.015;

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
      {/* Logo */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${Math.max(0, logoScale)})`,
          marginBottom: 40,
        }}
      >
        <Img src={LOGO_URL} style={{ width: 180, height: "auto" }} />
      </div>

      {/* Headline */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 20,
          opacity: frame >= 15 ? 1 : 0,
        }}
      >
        <BlurReveal
          stagger={0.04}
          duration={0.6}
          startFrom={15}
          className="text-balance"
          style={{
            fontFamily: garamond,
            fontSize: 68,
            fontWeight: 700,
            color: "#1A1A1A",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
          }}
        >
          Start Speaking Today
        </BlurReveal>
      </div>

      {/* Subtitle */}
      <div
        style={{
          textAlign: "center",
          maxWidth: 550,
          marginBottom: 40,
          opacity: frame >= 30 ? 1 : 0,
        }}
      >
        <FadeInChars
          stagger={0.02}
          duration={0.4}
          startFrom={30}
          style={{
            fontFamily: figtree,
            fontSize: 22,
            fontWeight: 400,
            color: "#1A1A1A",
            opacity: 0.6,
            lineHeight: 1.5,
          }}
        >
          Download for free on all platforms
        </FadeInChars>
      </div>

      {/* CTA Button */}
      <div
        style={{
          opacity: btnOpacity,
          transform: `scale(${Math.max(0, btnScale) * btnPulse})`,
        }}
      >
        <div
          style={{
            background: "#F0D7FF",
            color: "#1A1A1A",
            fontFamily: figtree,
            fontSize: 22,
            fontWeight: 700,
            padding: "18px 48px",
            borderRadius: 16,
            border: "2px solid #1A1A1A",
            boxShadow: "0 6px 24px rgba(0,0,0,0.1)",
            letterSpacing: "0.01em",
          }}
        >
          Download for Free →
        </div>
      </div>

      {/* URL */}
      <div
        style={{
          opacity: urlOpacity,
          transform: `translateY(${urlY}px)`,
          marginTop: 24,
        }}
      >
        <span
          style={{
            fontFamily: figtree,
            fontSize: 18,
            fontWeight: 500,
            color: "#034F46",
            letterSpacing: "0.02em",
          }}
        >
          wisprflow.ai
        </span>
      </div>
    </div>
  );
};
