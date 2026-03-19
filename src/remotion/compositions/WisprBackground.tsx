import React from "react";
import {
  useCurrentFrame,
  interpolate,
  Img,
} from "remotion";
import { LiquidShape } from "../library/components/effects/LiquidShape";
import { Noise } from "../library/components/effects/Noise";

const HERO_BG =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/wispr-flow/1773904386986_dmxxgtkfp8q_wispr_bg_hero.png";

export const WisprBackground: React.FC = () => {
  const frame = useCurrentFrame();

  const bgScale = interpolate(frame, [0, 600, 1200], [1.05, 1.1, 1.05], {
    extrapolateRight: "clamp",
  });

  const gradientShift = interpolate(frame, [0, 1200], [0, 40], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        backgroundColor: "#FFFFEB",
      }}
    >
      {/* Hero background image with slow pan */}
      <Img
        src={HERO_BG}
        style={{
          position: "absolute",
          inset: -40,
          width: "calc(100% + 80px)",
          height: "calc(100% + 80px)",
          objectFit: "cover",
          opacity: 0.22,
          transform: `scale(${bgScale})`,
        }}
      />

      {/* Ambient gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at ${30 + gradientShift}% 40%, rgba(240,215,255,0.4) 0%, transparent 55%), radial-gradient(ellipse at ${70 - gradientShift * 0.5}% 65%, rgba(3,79,70,0.15) 0%, transparent 50%)`,
        }}
      />

      {/* Floating liquid shapes */}
      <div
        style={{
          position: "absolute",
          top: -60,
          right: -80,
          opacity: 0.15,
          transform: `translateY(${Math.sin(frame / 60) * 15}px)`,
        }}
      >
        <LiquidShape
          preset="blob"
          color="#034F46"
          colorEnd="#F0D7FF"
          size={400}
          speed={0.4}
          seed="tl"
        />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: -100,
          left: -60,
          opacity: 0.12,
          transform: `translateY(${Math.cos(frame / 70) * 12}px)`,
        }}
      >
        <LiquidShape
          preset="organic"
          color="#F0D7FF"
          colorEnd="#034F46"
          size={350}
          speed={0.3}
          seed="br"
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "60%",
          opacity: 0.08,
          transform: `translateX(${Math.sin(frame / 80) * 20}px) translateY(${Math.cos(frame / 90) * 10}px)`,
        }}
      >
        <LiquidShape
          preset="circle"
          color="#034F46"
          size={200}
          speed={0.5}
          seed="mid"
        />
      </div>

      {/* Subtle noise texture */}
      <Noise type="subtle" intensity={0.15} speed={0.5} opacity={0.3} blend="soft-light" />
    </div>
  );
};
