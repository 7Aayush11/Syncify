import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import SpeedIcon from '@mui/icons-material/Speed';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { songs } from '../data/songs';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { usePlaylist } from '../hooks/usePlaylist';

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const PlayerContainer = styled.div`
  position: fixed;
  bottom: ${props => props.isExpanded ? '50%' : '0'};
  left: 50%;
  transform: ${props => props.isExpanded ? 'translate(-50%, 50%)' : 'translateX(-50%)'};
  width: 100%;
  max-width: ${props => props.isExpanded ? '800px' : '1200px'};
  background: transparent;
  backdrop-filter: blur(12px);
  border-radius: ${props => props.isExpanded ? '20px' : '20px 20px 0 0'};
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
  z-index: 1000;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(139, 92, 246, 0.01),
      rgba(109, 40, 217, 0.01)
    );
    pointer-events: none;
  }
`;

const ExpandButton = styled.button`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background: transparent;
  backdrop-filter: blur(12px);
  border: none;
  border-radius: 20px 20px 0 0;
  width: 40px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${props => props.theme.text};
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  z-index: 1001;
  
  &:hover {
    color: ${props => props.theme.primary};
    height: 25px;
    transition: all 0.3s ease;
  }
`;

const ExpandedContainer = styled.div`
  padding: 20px;
  max-height: 80vh;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${props => props.theme.secondaryDark};
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.primary};
    border-radius: 4px;
  }
`;

const CollapsedPlayer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  gap: 20px;
  align-items: center;
  padding: 10px 20px;
  height: 80px;
`;

const CollapsedSongInfo = styled.div`
  text-align: left;
  
  h2 {
    font-size: 1rem;
    margin: 0;
    color: ${props => props.theme.text};
  }
  
  p {
    font-size: 0.8rem;
    margin: 4px 0 0;
    color: ${props => props.theme.textDim};
  }
`;

const AlbumArt = styled.div`
  width: 250px;
  height: 250px;
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.02) rotate(1deg);
    box-shadow: 0 12px 24px ${props => props.theme.shadow};
  }
`;

const SongInfo = styled.div`
  text-align: center;
  color: ${props => props.theme.text};
  margin: 1rem 0;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
    background: ${props => props.theme.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    font-size: 1rem;
    color: ${props => props.theme.textDim};
    margin: 0;
  }
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
  padding: 0 1rem;
`;

const MainControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
`;

const ControlButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.text};
  cursor: pointer;
  padding: 0.8rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: scale(1.1);
    color: ${props => props.theme.primaryLight};
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    font-size: 1.5rem;
  }
`;

const IconButton = styled(ControlButton)`
  color: ${props => props.active ? props.theme.primary : props.theme.text};
`;

const PlayButtonWrapper = styled(ControlButton)`
  background: ${props => props.theme.gradient};
  color: ${props => props.theme.text};
  padding: 1rem;

  &:hover {
    transform: scale(1.15);
    background: ${props => props.theme.primaryDark};
  }
`;

const ProgressControls = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ProgressBar = styled.input`
  width: 100%;
  height: 4px;
  -webkit-appearance: none;
  background: ${props => props.theme.secondaryDark};
  border-radius: 2px;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::-webkit-slider-runnable-track {
    background: ${props => props.theme.secondary};
    height: 4px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    background: ${props => props.theme.primaryLight};
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    margin-top: -4px;
    box-shadow: 0 0 10px ${props => props.theme.primary};
    transition: all 0.2s ease;
  }

  &:hover::-webkit-slider-thumb {
    transform: scale(1.2);
    background: ${props => props.theme.primary};
  }
`;

const TimeInfo = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${props => props.theme.text};
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;

const ExtraControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const SpeedButton = styled(IconButton)`
  font-size: 0.8rem;
  padding: 0.5rem;
  &:after {
    content: '${props => props.rate}x';
    position: absolute;
    bottom: -4px;
    font-size: 0.6rem;
  }
`;

const PlaylistContainer = styled.div`
  margin-top: 1rem;
  max-height: 200px;
  overflow-y: auto;
  color: ${props => props.theme.text};
  border-radius: 10px;
  padding: 0.5rem;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${props => props.theme.secondaryDark};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.primary};
    border-radius: 4px;
  }
`;

const PlaylistItem = styled.div`
  padding: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: ${props => props.theme.overlay};
  }
  
  &.active {
    color: ${props => props.theme.primaryLight};
    background: ${props => props.theme.overlay};
  }
`;

const NowPlayingDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.theme.primary};
  margin-right: 8px;
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0% { transform: scale(0.8); opacity: 0.5; }
    50% { transform: scale(1.2); opacity: 1; }
    100% { transform: scale(0.8); opacity: 0.5; }
  }
`;

const SongItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  flex: 1;

  .title {
    font-weight: 500;
  }

  .artist {
    font-size: 0.8rem;
    color: ${props => props.theme.secondary};
  }
`;

const Duration = styled.span`
  font-size: 0.8rem;
  color: ${props => props.theme.secondary};
`;

const MusicPlayer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef(null);
  
  const {
    isPlaying,
    duration,
    currentTime,
    progress,
    playbackRate,
    isMuted,
    togglePlay,
    seek,
    changePlaybackRate,
    toggleMute,
    jumpForward,
    jumpBackward
  } = useAudioPlayer(audioRef);

  const {
    currentSong,
    shuffle,
    repeat,
    playNext,
    playPrevious,
    selectSong,
    toggleShuffle,
    toggleRepeat
  } = usePlaylist(songs, audioRef);

  return (
    <PlayerContainer isExpanded={isExpanded}>
      <ExpandButton onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
      </ExpandButton>
      
      {isExpanded ? (
        <ExpandedContainer>
          <AlbumArt style={{ backgroundImage: `url(${currentSong?.albumCover})` }} />
          <SongInfo>
            <h2>{currentSong?.title}</h2>
            <p>{currentSong?.artist}</p>
          </SongInfo>
          <Controls>
            <MainControls>
              <IconButton active={shuffle} onClick={toggleShuffle}>
                <ShuffleIcon />
              </IconButton>
              <ControlButton onClick={playPrevious}>
                <SkipPreviousIcon />
              </ControlButton>
              <PlayButtonWrapper onClick={togglePlay}>
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
              </PlayButtonWrapper>
              <ControlButton onClick={playNext}>
                <SkipNextIcon />
              </ControlButton>
              <IconButton active={repeat} onClick={toggleRepeat}>
                <RepeatIcon />
              </IconButton>
            </MainControls>
            <ProgressControls>
              <ProgressBar 
                type="range" 
                min="0" 
                max="100" 
                value={progress}
                onChange={(e) => seek(Number(e.target.value))}
              />
              <TimeInfo>
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </TimeInfo>
            </ProgressControls>
            <ExtraControls>
              <IconButton onClick={() => jumpBackward(10)}>
                <FastRewindIcon />
              </IconButton>
              <IconButton onClick={toggleMute}>
                {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
              </IconButton>
              <SpeedButton 
                onClick={() => {
                  const rates = [1, 1.5, 2];
                  const currentIndex = rates.indexOf(playbackRate);
                  const nextRate = rates[(currentIndex + 1) % rates.length];
                  changePlaybackRate(nextRate);
                }}
                rate={playbackRate}
              >
                <SpeedIcon />
              </SpeedButton>
              <IconButton onClick={() => jumpForward(10)}>
                <FastForwardIcon />
              </IconButton>
            </ExtraControls>
          </Controls>
          <PlaylistContainer>
            {songs.map((song, index) => (
              <PlaylistItem
                key={song.id}
                className={currentSong?.id === song.id ? 'active' : ''}
                onClick={() => selectSong(index)}
              >
                {currentSong?.id === song.id && isPlaying && <NowPlayingDot />}
                <SongItemInfo>
                  <span className="title">{song.title}</span>
                  <span className="artist">{song.artist}</span>
                </SongItemInfo>
                <Duration>{formatTime(song.duration)}</Duration>
              </PlaylistItem>
            ))}
          </PlaylistContainer>
        </ExpandedContainer>
      ) : (
        <CollapsedPlayer>
          <PlayButtonWrapper onClick={togglePlay} style={{ padding: '0.5rem' }}>
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </PlayButtonWrapper>
          <CollapsedSongInfo>
            <h2>{currentSong?.title}</h2>
            <p>{currentSong?.artist}</p>
          </CollapsedSongInfo>
          <ProgressBar 
            type="range" 
            min="0" 
            max="100" 
            value={progress}
            onChange={(e) => seek(Number(e.target.value))}
            style={{ width: '200px' }}
          />
          <IconButton onClick={toggleMute}>
            {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
          </IconButton>
        </CollapsedPlayer>
      )}
      
      <audio
        ref={audioRef}
        src={currentSong?.audioSrc}
        onEnded={() => repeat ? audioRef.current.play() : playNext()}
      />
    </PlayerContainer>
  );
};

export default MusicPlayer;