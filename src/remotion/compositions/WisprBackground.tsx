import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

export const WisprBackground: React.FC = () => {
  const frame = useCurrentFrame();

  // Very slow, subtle gradient drift for ambient life
  const gradientX = interpolate(frame, [0, 1000], [35, 65], {
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
      {/* Subtle ambient gradient — barely visible, keeps it alive */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at ${gradientX}% 40%, rgba(240,215,255,0.25) 0%, transparent 60%), radial-gradient(ellipse at ${100 - gradientX}% 70%, rgba(3,79,70,0.06) 0%, transparent 50%)`,
        }}
      />
    </div>
  );
};
