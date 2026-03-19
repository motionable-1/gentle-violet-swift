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
  TypewriterText,
  BlurReveal,
} from "../library/components/text/TextAnimation";
import { loadFont as loadEbGaramond } from "@remotion/google-fonts/EBGaramond";
import { loadFont as loadFigtree } from "@remotion/google-fonts/Figtree";
import { AnimatedGlow } from "../library/components/effects/Glow";
import { ShapeAnimation } from "../library/components/effects/ShapeAnimation";

const { fontFamily: garamond } = loadEbGaramond("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});
const { fontFamily: figtree } = loadFigtree("normal", {
  weights: ["400", "600", "700"],
  subsets: ["latin"],
});

const MIC_ICON =
  "https://api.iconify.design/ph/microphone-fill.svg?color=%23034F46&width=64";

// Sound wave bars component
const SoundWave: React.FC<{ frame: number; fps: number; delay: number }> = ({
  frame,
  fps,
  delay,
}) => {
  const bars = 12;
  const effectiveFrame = Math.max(0, frame - delay);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3, height: 40 }}>
      {Array.from({ length: bars }).map((_, i) => {
        const phase = (effectiveFrame / fps) * 4 + i * 0.5;
        const height = 8 + Math.abs(Math.sin(phase)) * 28;
        const barOpacity = interpolate(
          effectiveFrame,
          [i * 2, i * 2 + 15],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <div
            key={i}
            style={{
              width: 4,
              height,
              borderRadius: 2,
              backgroundColor: "#034F46",
              opacity: barOpacity * 0.8,
              transition: "none",
            }}
          />
        );
      })}
    </div>
  );
};

export const SceneVoiceDictation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Section title
  const titleDelay = 0;

  // Mic icon entrance
  const micDelay = 20;
  const micScale = spring({
    frame: frame - micDelay,
    fps,
    config: { damping: 10, stiffness: 100 },
    durationInFrames: 30,
  });
  const micOpacity = interpolate(frame, [micDelay, micDelay + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Typing demo
  const typingDelay = 50;
  const typingOpacity = interpolate(
    frame,
    [typingDelay, typingDelay + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const typingY = interpolate(
    frame,
    [typingDelay, typingDelay + 20],
    [40, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // Speed badge
  const speedDelay = 120;
  const speedScale = spring({
    frame: frame - speedDelay,
    fps,
    config: { damping: 12, stiffness: 90 },
    durationInFrames: 30,
  });
  const speedOpacity = interpolate(
    frame,
    [speedDelay, speedDelay + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Floating shapes
  const shapeOpacity = interpolate(frame, [10, 30], [0, 0.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 100px",
        gap: 80,
      }}
    >
      {/* Decorative shapes */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 80,
          opacity: shapeOpacity,
        }}
      >
        <ShapeAnimation
          shape="hexagon"
          color="#F0D7FF"
          size={40}
          animation="rotate"
          speed={0.15}
        />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 100,
          right: 150,
          opacity: shapeOpacity * 0.8,
        }}
      >
        <ShapeAnimation
          shape="circle"
          color="#034F46"
          size={16}
          animation="pulse"
          speed={0.6}
        />
      </div>

      {/* Left side - Feature info */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {/* Feature label */}
        <div style={{ opacity: frame >= titleDelay ? 1 : 0 }}>
          <BlurReveal
            stagger={0.03}
            duration={0.5}
            startFrom={titleDelay}
            style={{
              fontFamily: figtree,
              fontSize: 16,
              fontWeight: 600,
              color: "#034F46",
              textTransform: "uppercase" as const,
              letterSpacing: "0.12em",
            }}
          >
            Feature 01
          </BlurReveal>
        </div>

        {/* Title */}
        <div style={{ opacity: frame >= titleDelay + 8 ? 1 : 0 }}>
          <BlurReveal
            stagger={0.04}
            duration={0.6}
            startFrom={titleDelay + 8}
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
            Seamless Voice Dictation
          </BlurReveal>
        </div>

        {/* Description */}
        <div style={{ opacity: frame >= 30 ? 1 : 0 }}>
          <FadeInWords
            stagger={0.04}
            duration={0.4}
            startFrom={30}
            style={{
              fontFamily: figtree,
              fontSize: 20,
              fontWeight: 400,
              color: "#1A1A1A",
              opacity: 0.65,
              lineHeight: 1.6,
              maxWidth: 440,
            }}
          >
            Speak naturally and watch your words flow onto the screen. No more
            hunting for keys — just talk.
          </FadeInWords>
        </div>

        {/* Speed badge */}
        <div
          style={{
            opacity: speedOpacity,
            transform: `scale(${Math.max(0, speedScale)})`,
            transformOrigin: "left center",
            marginTop: 8,
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
              fontSize: 18,
              fontWeight: 700,
              padding: "12px 24px",
              borderRadius: 50,
              border: "2px solid rgba(26,26,26,0.1)",
            }}
          >
            <span style={{ fontSize: 22 }}>⚡</span>
            <span>4× faster than typing</span>
          </div>
        </div>
      </div>

      {/* Right side - Mic + Waveform visual */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
        }}
      >
        {/* Mic icon */}
        <div
          style={{
            opacity: micOpacity,
            transform: `scale(${Math.max(0, micScale)})`,
          }}
        >
          <AnimatedGlow
            color="#034F46"
            intensity={20}
            duration={0.6}
            pulsateAfter
            pulseDuration={2}
            pulseMin={0.5}
          >
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, #034F46 0%, #056B5F 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 12px 40px rgba(3,79,70,0.3)",
              }}
            >
              <Img src={MIC_ICON} style={{ width: 52, height: 52 }} />
            </div>
          </AnimatedGlow>
        </div>

        {/* Sound wave */}
        <div style={{ opacity: micOpacity }}>
          <SoundWave frame={frame} fps={fps} delay={micDelay + 10} />
        </div>

        {/* Typing result card */}
        <div
          style={{
            opacity: typingOpacity,
            transform: `translateY(${typingY}px)`,
            background: "rgba(255,255,235,0.9)",
            border: "2px solid rgba(3,79,70,0.15)",
            borderRadius: 16,
            padding: "20px 28px",
            maxWidth: 420,
            boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              fontFamily: figtree,
              fontSize: 11,
              fontWeight: 600,
              color: "#034F46",
              textTransform: "uppercase" as const,
              letterSpacing: "0.1em",
              marginBottom: 8,
            }}
          >
            Dictated Text
          </div>
          <div
            style={{
              fontFamily: figtree,
              fontSize: 18,
              color: "#1A1A1A",
              lineHeight: 1.6,
            }}
          >
            {frame >= typingDelay + 5 && (
              <TypewriterText speed={0.04} cursor cursorColor="#034F46">
                The quarterly report shows significant growth in user engagement across all platforms, with a 47% increase in daily active users.
              </TypewriterText>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
