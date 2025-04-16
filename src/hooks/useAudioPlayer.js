import { useState, useEffect } from 'react';

export const useAudioPlayer = (audioRef) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setCurrentTime(0);
      setProgress(0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      setProgress(0);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleRateChange = () => setPlaybackRate(audio.playbackRate);
    const handleVolumeChange = () => setIsMuted(audio.muted);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ratechange', handleRateChange);
    audio.addEventListener('volumechange', handleVolumeChange);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ratechange', handleRateChange);
      audio.removeEventListener('volumechange', handleVolumeChange);
    };
  }, [audioRef]);

  const togglePlay = async () => {
    if (!audioRef.current) return;
    
    try {
      if (audioRef.current.paused) {
        await audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    } catch (error) {
      console.error('Error toggling play state:', error);
    }
  };

  const seek = (value) => {
    if (!audioRef.current) return;
    const time = (value / 100) * duration;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
    setProgress(value);
  };

  const changePlaybackRate = (rate) => {
    if (!audioRef.current) return;
    const newRate = parseFloat(rate.toFixed(1));
    audioRef.current.playbackRate = newRate;
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !audioRef.current.muted;
  };

  const jumpForward = (seconds = 10) => {
    if (!audioRef.current) return;
    const newTime = Math.min(audioRef.current.currentTime + seconds, duration);
    audioRef.current.currentTime = newTime;
  };

  const jumpBackward = (seconds = 10) => {
    if (!audioRef.current) return;
    const newTime = Math.max(audioRef.current.currentTime - seconds, 0);
    audioRef.current.currentTime = newTime;
  };

  return {
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
  };
};