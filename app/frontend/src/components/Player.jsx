import React, { useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import { useSelector } from 'react-redux';

const INITIAL_STATE = {
  pip: false,
  playing: true,
  controls: false,
  light: false,
  volume: 0.8,
  muted: false,
  played: 0,
  loaded: 0,
  duration: 0,
  playbackRate: 1.0,
  loop: false,
};

export default function Player() {
  const currentSong = useSelector((state) => state.currentSong);
  const [playerState, setplayerState] = useState(INITIAL_STATE);
  const {
    pip, playing, controls, light, volume, muted, playbackRate, loop,
  } = playerState;

  return (
    <div>
      <ReactPlayer
        className="react-player"
        width="0px"
        height="0px"
        url={`https://www.youtube.com/watch?v=${currentSong}`}
        pip={pip}
        playing={playing}
        controls={controls}
        light={light}
        loop={loop}
        playbackRate={playbackRate}
        volume={volume}
        muted={muted}
        onReady={() => console.log('ON READY')}
        onStart={() => console.log('ON START')}
        onPause={() => setplayerState({ ...playerState, playing: false })}
        onPlay={() => setplayerState({ ...playerState, playing: true })}
      />
      <button type="button" onClick={() => setplayerState({ ...playerState, muted: !muted })}>Mute</button>
      <button type="button" id="playBtn" onClick={() => setplayerState({ ...playerState, playing: !playing })}>{playing ? 'Stop' : 'Play'}</button>
      <button type="button" id="loopBtn" onClick={() => setplayerState({ ...playerState, loop: !loop })}>{ loop ? 'Loop ativado' : 'Loop desativado'}</button>
    </div>
  );
}
