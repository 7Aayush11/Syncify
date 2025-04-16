import { useState, useEffect } from 'react';

export const usePlaylist = (songs, audioRef) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const currentSong = songs[currentIndex];

  useEffect(() => {
    if (!audioRef.current) return;
    
    // Reset audio when song changes
    audioRef.current.currentTime = 0;
    if (!audioRef.current.paused) {
      audioRef.current.play()
        .catch(error => console.log("Auto-play prevented:", error));
    }
  }, [currentIndex]);

  const selectSong = (index) => {
    if (index === currentIndex) {
      // Toggle play/pause if selecting the current song
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    } else {
      setCurrentIndex(index);
    }
  };

  const playNext = () => {
    if (shuffle) {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * songs.length);
      } while (nextIndex === currentIndex && songs.length > 1);
      setCurrentIndex(nextIndex);
    } else {
      setCurrentIndex((prevIndex) => {
        if (repeat && prevIndex === songs.length - 1) {
          return 0;
        }
        return (prevIndex + 1) % songs.length;
      });
    }
  };

  const playPrevious = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        return repeat ? songs.length - 1 : 0;
      }
      return prevIndex - 1;
    });
  };

  const toggleShuffle = () => setShuffle(prev => !prev);
  const toggleRepeat = () => setRepeat(prev => !prev);

  return {
    currentSong,
    shuffle,
    repeat,
    playNext,
    playPrevious,
    selectSong,
    toggleShuffle,
    toggleRepeat
  };
};