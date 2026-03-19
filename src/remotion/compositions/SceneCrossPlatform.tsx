import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Img,
} from "remotion";
import {
  FadeInWords,
  BlurReveal,
} from "../library/components/text/TextAnimation";
import { loadFont as loadEbGaramond } from "@remotion/google-fonts/EBGaramond";
import { loadFont as loadFigtree } from "@remotion/google-fonts/Figtree";
import { ShapeAnimation } from "../library/components/effects/ShapeAnimation";
import { AnimatedGlow } from "../library/components/effects/Glow";

const { fontFamily: garamond } = loadEbGaramond("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});
const { fontFamily: figtree } = loadFigtree("normal", {
  weights: ["400", "600", "700"],
  subsets: ["latin"],
});

const PLATFORMS = [
  {
    name: "Mac",
    icon: "https://api.iconify.design/mdi/apple.svg?color=%23034F46&width=48",
  },
  {
    name: "Windows",
    icon: "https://api.iconify.design/mdi/microsoft-windows.svg?color=%23034F46&width=48",
  },
  {
    name: "iPhone",
    icon: "https://api.iconify.design/mdi/cellphone.svg?color=%23034F46&width=48",
  },
  {
    name: "Android",
    icon: "https://api.iconify.design/mdi/android.svg?color=%23034F46&width=48",
  },
];

const PlatformCard: React.FC<{
  platform: (typeof PLATFORMS)[number];
  index: number;
  frame: number;
  fps: number;
}> = ({ platform, index, frame, fps }) => {
  const delay = 40 + index * 12;
  const cardScale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 80 },
    durationInFrames: 35,
  });
  const cardOpacity = interpolate(frame, [delay, delay + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Floating hover
  const hoverY = Math.sin((frame - delay) / 25 + index * 1.2) * 4;

  return (
    <div
      style={{
        opacity: cardOpacity,
        transform: `scale(${Math.max(0, cardScale)}) translateY(${cardOpacity > 0.5 ? hoverY : 0}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
      }}
    >
      <AnimatedGlow
        color="#034F46"
        intensity={12}
        duration={0.5}
        delay={delay / fps}
        pulsateAfter
        pulseDuration={3}
        pulseMin={0.4}
      >
        <div
          style={{
            width: 110,
            height: 110,
            borderRadius: 24,
            background: "rgba(255,255,235,0.95)",
            border: "2px solid rgba(3,79,70,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
          }}
        >
          <Img src={platform.icon} style={{ width: 48, height: 48 }} />
        </div>
      </AnimatedGlow>
      <span
        style={{
          fontFamily: figtree,
          fontSize: 18,
          fontWeight: 600,
          color: "#1A1A1A",
          letterSpacing: "0.01em",
        }}
      >
        {platform.name}
      </span>
    </div>
  );
};

export const SceneCrossPlatform: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Decorations
  const shapeOpacity = interpolate(frame, [10, 30], [0, 0.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Languages badge
  const langDelay = 130;
  const langScale = spring({
    frame: frame - langDelay,
    fps,
    config: { damping: 14, stiffness: 100 },
    durationInFrames: 30,
  });
  const langOpacity = interpolate(
    frame,
    [langDelay, langDelay + 12],
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
        padding: "60px 100px",
      }}
    >
      {/* Decorative shapes */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 180,
          opacity: shapeOpacity,
        }}
      >
        <ShapeAnimation
          shape="triangle"
          color="#F0D7FF"
          size={35}
          animation="rotate"
          speed={0.1}
        />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 130,
          right: 200,
          opacity: shapeOpacity * 0.6,
          transform: `rotate(${frame * 0.3}deg)`,
        }}
      >
        <ShapeAnimation
          shape="cross"
          color="#034F46"
          size={25}
          animation="breathe"
          speed={0.4}
        />
      </div>

      {/* Header */}
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
          Feature 03
        </BlurReveal>
      </div>

      <div
        style={{
          textAlign: "center",
          marginBottom: 24,
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
          Works Everywhere
        </BlurReveal>
      </div>

      <div
        style={{
          textAlign: "center",
          marginBottom: 56,
          maxWidth: 600,
          opacity: frame >= 20 ? 1 : 0,
        }}
      >
        <FadeInWords
          stagger={0.05}
          duration={0.4}
          startFrom={20}
          style={{
            fontFamily: figtree,
            fontSize: 22,
            fontWeight: 400,
            color: "#1A1A1A",
            opacity: 0.6,
            lineHeight: 1.5,
          }}
        >
          One voice, every platform. Dictate seamlessly across all your devices and apps.
        </FadeInWords>
      </div>

      {/* Platform cards */}
      <div
        style={{
          display: "flex",
          gap: 60,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {PLATFORMS.map((platform, i) => (
          <PlatformCard
            key={platform.name}
            platform={platform}
            index={i}
            frame={frame}
            fps={fps}
          />
        ))}
      </div>

      {/* Languages badge */}
      <div
        style={{
          opacity: langOpacity,
          transform: `scale(${Math.max(0, langScale)})`,
          marginTop: 48,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: "#F0D7FF",
            color: "#1A1A1A",
            fontFamily: figtree,
            fontSize: 17,
            fontWeight: 700,
            padding: "12px 28px",
            borderRadius: 50,
            border: "2px solid rgba(26,26,26,0.08)",
          }}
        >
          <span style={{ fontSize: 20 }}>🌍</span>
          <span>100+ Languages Supported</span>
        </div>
      </div>
    </div>
  );
};
