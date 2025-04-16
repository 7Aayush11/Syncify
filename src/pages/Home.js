import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { featuredPlaylists, recentlyPlayed } from '../data/playlists';
import { motion } from 'framer-motion';
import { keyframes } from 'styled-components';

const HomeContainer = styled.div`
  padding: 20px;
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`;

const WelcomeSection = styled(motion.div)`
  margin-bottom: 40px;
  padding: 40px;
  border-radius: 20px;
  background: linear-gradient(45deg, 
    ${props => props.theme.primary}22,
    ${props => props.theme.playerBackground},
    ${props => props.theme.primary}22);
  background-size: 200% 200%;
  animation: ${gradientAnimation} 10s ease infinite;
  box-shadow: 0 10px 30px ${props => props.theme.shadow};

  h1 {
    font-size: 3.5rem;
    color: ${props => props.theme.text};
    margin-bottom: 15px;
    background: linear-gradient(to right, ${props => props.theme.primary}, ${props => props.theme.text});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
  }

  p {
    color: ${props => props.theme.textDim};
    font-size: 1.2rem;
    opacity: 0.8;
  }
`;

const GridSection = styled.div`
  margin-bottom: 40px;
  h2 {
    font-size: 1.5rem;
    color: ${props => props.theme.text};
    margin-bottom: 20px;
  }
`;

const PlaylistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const PlaylistCard = styled.div`
  background: ${props => props.theme.playerBackground};
  border-radius: 12px;
  padding: 15px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px ${props => props.theme.shadow};
  }
`;

const PlaylistImage = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
  margin-bottom: 15px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const PlayButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: ${props => props.theme.primary};
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;

  ${PlaylistImage}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PlaylistInfo = styled.div`
  h3 {
    color: ${props => props.theme.text};
    font-size: 1rem;
    margin-bottom: 5px;
  }
  p {
    color: ${props => props.theme.textDim};
    font-size: 0.9rem;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  margin: 0 -20px;
  padding: 0 20px;
`;

const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(139, 92, 246, 0.2);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.text};
  cursor: pointer;
  z-index: 2;
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(139, 92, 246, 0.4);
    transform: translateY(-50%) scale(1.1);
  }

  &.prev {
    left: 0;
  }

  &.next {
    right: 0;
  }
`;

const CarouselTrack = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: hidden;
  scroll-behavior: smooth;
  padding: 10px 0;
`;

const Home = () => {
  const carouselRef = useRef(null);
  const timerRef = useRef(null);

  const scrollCarousel = (direction) => {
    const track = carouselRef.current;
    if (!track) return;
    
    const cardWidth = 270;
    const scrollAmount = direction === 'next' ? cardWidth : -cardWidth;
    const newScrollPosition = track.scrollLeft + scrollAmount;
    
    if (newScrollPosition >= track.scrollWidth - track.offsetWidth) {
      track.scrollLeft = 0;
    } else if (newScrollPosition < 0) {
      track.scrollLeft = track.scrollWidth - track.offsetWidth;
    } else {
      track.scrollLeft = newScrollPosition;
    }
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      scrollCarousel('next');
    }, 5000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleManualScroll = (direction) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    scrollCarousel(direction);
    
    timerRef.current = setInterval(() => {
      scrollCarousel('next');
    }, 5000);
  };

  return (
    <HomeContainer>
      <WelcomeSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Welcome back!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Pick up where you left off
        </motion.p>
      </WelcomeSection>

      <GridSection>
        <h2>Featured Playlists</h2>
        <PlaylistGrid>
          {featuredPlaylists.map(playlist => (
            <PlaylistCard key={playlist.id}>
              <PlaylistImage style={{ backgroundImage: `url(${playlist.image})` }}>
                <PlayButton>
                  <PlayArrowIcon />
                </PlayButton>
              </PlaylistImage>
              <PlaylistInfo>
                <h3>{playlist.title}</h3>
                <p>{playlist.description}</p>
              </PlaylistInfo>
            </PlaylistCard>
          ))}
        </PlaylistGrid>
      </GridSection>

      <GridSection>
        <h2>Recently Played</h2>
        <CarouselContainer>
          <CarouselButton className="prev" onClick={() => handleManualScroll('prev')}>
            <NavigateBeforeIcon />
          </CarouselButton>
          <CarouselTrack ref={carouselRef}>
            {recentlyPlayed.map(playlist => (
              <PlaylistCard key={playlist.id} style={{ minWidth: '250px' }}>
                <PlaylistImage style={{ backgroundImage: `url(${playlist.image})` }}>
                  <PlayButton>
                    <PlayArrowIcon />
                  </PlayButton>
                </PlaylistImage>
                <PlaylistInfo>
                  <h3>{playlist.title}</h3>
                  <p>{playlist.description}</p>
                </PlaylistInfo>
              </PlaylistCard>
            ))}
          </CarouselTrack>
          <CarouselButton className="next" onClick={() => handleManualScroll('next')}>
            <NavigateNextIcon />
          </CarouselButton>
        </CarouselContainer>
      </GridSection>
    </HomeContainer>
  );
};

export default Home;