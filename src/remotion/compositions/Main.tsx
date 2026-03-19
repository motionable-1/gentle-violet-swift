import { AbsoluteFill, Artifact, useCurrentFrame } from "remotion";
import {
  TransitionSeries,
  linearTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { blurDissolve } from "../library/components/layout/transitions/presentations/blurDissolve";

import { WisprBackground } from "./WisprBackground";
import { SceneIntro } from "./SceneIntro";
import { SceneVoiceDictation } from "./SceneVoiceDictation";
import { SceneTextPolish } from "./SceneTextPolish";
import { SceneCrossPlatform } from "./SceneCrossPlatform";
import { SceneCTA } from "./SceneCTA";

/**
 * Wispr Flow — Product Demo Video
 *
 * Scene breakdown:
 * 1. Intro / Brand Reveal (210 frames, 7s)
 * 2. Voice Dictation Feature (240 frames, 8s)
 * 3. Text Polishing Feature (240 frames, 8s)
 * 4. Cross-Platform (240 frames, 8s)
 * 5. CTA / Outro (210 frames, 7s)
 *
 * Transitions: 4 × 20 frames = 80 frames subtracted
 * Total: 210 + 240 + 240 + 240 + 210 - 80 = 1060 frames (35.3s)
 */

const TRANSITION_DURATION = 20;

export const Main: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <>
      {frame === 0 && (
        <Artifact content={Artifact.Thumbnail} filename="thumbnail.jpeg" />
      )}

      <AbsoluteFill>
        {/* Persistent background layer */}
        <WisprBackground />

        {/* Content scenes with transitions */}
        <TransitionSeries>
          {/* Scene 1: Intro with Brand Reveal */}
          <TransitionSeries.Sequence durationInFrames={210}>
            <AbsoluteFill>
              <SceneIntro />
            </AbsoluteFill>
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={blurDissolve()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 2: Voice Dictation */}
          <TransitionSeries.Sequence durationInFrames={240}>
            <AbsoluteFill>
              <SceneVoiceDictation />
            </AbsoluteFill>
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={blurDissolve()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 3: Text Polishing */}
          <TransitionSeries.Sequence durationInFrames={240}>
            <AbsoluteFill>
              <SceneTextPolish />
            </AbsoluteFill>
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={blurDissolve()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 4: Cross-Platform */}
          <TransitionSeries.Sequence durationInFrames={240}>
            <AbsoluteFill>
              <SceneCrossPlatform />
            </AbsoluteFill>
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 5: CTA / Outro */}
          <TransitionSeries.Sequence durationInFrames={210}>
            <AbsoluteFill>
              <SceneCTA />
            </AbsoluteFill>
          </TransitionSeries.Sequence>
        </TransitionSeries>
      </AbsoluteFill>
    </>
  );
};
