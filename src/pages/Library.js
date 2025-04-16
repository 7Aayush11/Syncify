import React, { useState } from 'react';
import styled from 'styled-components';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteIcon from '@mui/icons-material/Favorite';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import AlbumIcon from '@mui/icons-material/Album';
import { playlists, likedSongs, albums } from '../data/library';

const LibraryContainer = styled.div`
  padding: 20px;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  border-bottom: 1px solid ${props => props.theme.overlay};
`;

const Tab = styled.button`
  background: none;
  border: none;
  color: ${props => props.active ? props.theme.primary : props.theme.text};
  font-size: 1.1rem;
  padding: 10px 20px;
  cursor: pointer;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${props => props.active ? props.theme.primary : 'transparent'};
    transition: all 0.3s ease;
  }

  &:hover {
    color: ${props => props.theme.primary};
  }

  svg {
    margin-right: 8px;
    vertical-align: middle;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const ItemCard = styled.div`
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

const ItemImage = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
  margin-bottom: 15px;
  position: relative;

  &:hover button {
    opacity: 1;
    transform: translateY(0);
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
`;

const ItemInfo = styled.div`
  h3 {
    color: ${props => props.theme.text};
    margin-bottom: 5px;
  }
  p {
    color: ${props => props.theme.textDim};
    font-size: 0.9rem;
  }
`;

const SongList = styled.div`
  background: ${props => props.theme.playerBackground};
  border-radius: 12px;
  overflow: hidden;
`;

const SongItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  align-items: center;
  padding: 12px 20px;
  gap: 20px;
  transition: background 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.overlay};
  }
`;

const SongImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  background-size: cover;
  background-position: center;
`;

const Library = () => {
  const [activeTab, setActiveTab] = useState('playlists');

  const tabs = [
    { id: 'playlists', label: 'Playlists', icon: <QueueMusicIcon /> },
    { id: 'liked', label: 'Liked Songs', icon: <FavoriteIcon /> },
    { id: 'albums', label: 'Albums', icon: <AlbumIcon /> }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'playlists':
        return (
          <ContentGrid>
            {playlists.map(item => (
              <ItemCard key={item.id}>
                <ItemImage style={{ backgroundImage: `url(${item.image})` }}>
                  <PlayButton>
                    <PlayArrowIcon />
                  </PlayButton>
                </ItemImage>
                <ItemInfo>
                  <h3>{item.title}</h3>
                  <p>{item.songs} songs</p>
                </ItemInfo>
              </ItemCard>
            ))}
          </ContentGrid>
        );
      
      case 'liked':
        return (
          <SongList>
            {likedSongs.map(song => (
              <SongItem key={song.id}>
                <SongImage style={{ backgroundImage: `url(${song.image})` }} />
                <ItemInfo>
                  <h3>{song.title}</h3>
                  <p>{song.artist}</p>
                </ItemInfo>
                <span style={{ color: 'var(--text-dim)' }}>{song.duration}</span>
                <PlayButton style={{ opacity: 0.8, transform: 'none' }}>
                  <PlayArrowIcon />
                </PlayButton>
              </SongItem>
            ))}
          </SongList>
        );
      
      case 'albums':
        return (
          <ContentGrid>
            {albums.map(album => (
              <ItemCard key={album.id}>
                <ItemImage style={{ backgroundImage: `url(${album.image})` }}>
                  <PlayButton>
                    <PlayArrowIcon />
                  </PlayButton>
                </ItemImage>
                <ItemInfo>
                  <h3>{album.title}</h3>
                  <p>{album.artist} • {album.songs} songs</p>
                </ItemInfo>
              </ItemCard>
            ))}
          </ContentGrid>
        );
    }
  };

  return (
    <LibraryContainer>
      <TabsContainer>
        {tabs.map(tab => (
          <Tab
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} {tab.label}
          </Tab>
        ))}
      </TabsContainer>

      {renderContent()}
    </LibraryContainer>
  );
};

export default Library;