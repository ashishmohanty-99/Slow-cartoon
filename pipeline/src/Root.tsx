import React from "react";
import { Composition } from "remotion";
import { Episode, totalFrames } from "./Episode";
import ep from "../episodes/ep001.json";
import type { EpisodeProps } from "./types";

export const Root: React.FC = () => (
  <Composition
    id="Episode" component={Episode} width={1920} height={1080} fps={24}
    durationInFrames={totalFrames((ep as EpisodeProps).scenes, 24)}
    defaultProps={ep as EpisodeProps}
    calculateMetadata={({ props }) => ({ durationInFrames: totalFrames(props.scenes, props.fps), fps: props.fps })}
  />
);
