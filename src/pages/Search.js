import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PersonIcon from '@mui/icons-material/Person';
import { searchData } from '../data/searchData';

const SearchContainer = styled.div`
  padding: 20px;
`;

const SearchHeader = styled.div`
  margin-bottom: 30px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: ${props => props.theme.playerBackground};
  border-radius: 30px;
  padding: 10px 20px;
  margin-bottom: 20px;
  
  svg {
    color: ${props => props.theme.textDim};
    margin-right: 10px;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  background: none;
  border: none;
  color: ${props => props.theme.text};
  font-size: 1.1rem;
  outline: none;

  &::placeholder {
    color: ${props => props.theme.textDim};
  }
`;

const FilterSection = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const FilterButton = styled.button`
  background: ${props => props.active ? props.theme.primary : props.theme.playerBackground};
  color: ${props => props.active ? 'white' : props.theme.text};
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? props.theme.primary : props.theme.overlay};
  }
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const ResultCard = styled.div`
  background: ${props => props.theme.playerBackground};
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: ${props => props.theme.overlay};
  }
`;

const ResultImage = styled.div`
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

const SongList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SongItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  align-items: center;
  padding: 12px;
  gap: 20px;
  background: ${props => props.theme.playerBackground};
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.overlay};
  }
`;

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredResults, setFilteredResults] = useState([]);

  const filters = ['All', 'Songs', 'Artists', 'Albums', 'Playlists'];

  useEffect(() => {
    let results = [];
    const term = searchTerm.toLowerCase();

    switch (activeFilter) {
      case 'all':
        results = [
          ...searchData.songs.map(item => ({ ...item, type: 'song' })),
          ...searchData.artists.map(item => ({ ...item, type: 'artist' })),
          ...searchData.albums.map(item => ({ ...item, type: 'album' })),
          ...searchData.playlists.map(item => ({ ...item, type: 'playlist' }))
        ].filter(item => {
          const searchableText = [
            item.title,
            item.artist,
            item.name,
            item.album
          ].filter(Boolean).join(' ').toLowerCase();
          return searchableText.includes(term);
        });
        break;
      case 'songs':
        results = searchData.songs;
        break;
      case 'artists':
        results = searchData.artists;
        break;
      case 'albums':
        results = searchData.albums;
        break;
      case 'playlists':
        results = searchData.playlists;
        break;
    }

    setFilteredResults(results);
  }, [searchTerm, activeFilter]);

  const renderResults = () => {
    switch (activeFilter) {
      case 'songs':
        return (
          <SongList>
            {filteredResults.map(song => (
              <SongItem key={song.id}>
                <ResultImage style={{ width: '50px', height: '50px', backgroundImage: `url(${song.image})` }} />
                <div>
                  <h3>{song.title}</h3>
                  <p>{song.artist} • {song.album}</p>
                </div>
                <span>{song.duration}</span>
                <PlayButton style={{ opacity: 0.8, transform: 'none', position: 'static' }}>
                  <PlayArrowIcon />
                </PlayButton>
              </SongItem>
            ))}
          </SongList>
        );

      case 'artists':
        return (
          <ResultsGrid>
            {filteredResults.map(artist => (
              <ResultCard key={artist.id}>
                <ResultImage style={{ backgroundImage: `url(${artist.image})` }}>
                  <PlayButton>
                    <PlayArrowIcon />
                  </PlayButton>
                </ResultImage>
                <h3>{artist.name}</h3>
                <p>{artist.followers} followers</p>
              </ResultCard>
            ))}
          </ResultsGrid>
        );

      case 'albums':
        return (
          <ResultsGrid>
            {filteredResults.map(album => (
              <ResultCard key={album.id}>
                <ResultImage style={{ backgroundImage: `url(${album.image})` }}>
                  <PlayButton>
                    <PlayArrowIcon />
                  </PlayButton>
                </ResultImage>
                <h3>{album.title}</h3>
                <p>{album.artist} • {album.year}</p>
              </ResultCard>
            ))}
          </ResultsGrid>
        );

      case 'playlists':
        return (
          <ResultsGrid>
            {filteredResults.map(playlist => (
              <ResultCard key={playlist.id}>
                <ResultImage style={{ backgroundImage: `url(${playlist.image})` }}>
                  <PlayButton>
                    <PlayArrowIcon />
                  </PlayButton>
                </ResultImage>
                <h3>{playlist.title}</h3>
                <p>{playlist.songs} songs</p>
              </ResultCard>
            ))}
          </ResultsGrid>
        );

      default:
        return (
          <ResultsGrid>
            {filteredResults.map(result => {
              switch (result.type) {
                case 'song':
                  return (
                    <ResultCard key={result.id}>
                      <ResultImage style={{ backgroundImage: `url(${result.image})` }}>
                        <PlayButton><PlayArrowIcon /></PlayButton>
                      </ResultImage>
                      <h3>{result.title}</h3>
                      <p>{result.artist} • Song</p>
                    </ResultCard>
                  );
                case 'artist':
                  return (
                    <ResultCard key={result.id}>
                      <ResultImage style={{ backgroundImage: `url(${result.image})` }}>
                        <PlayButton><PlayArrowIcon /></PlayButton>
                      </ResultImage>
                      <h3>{result.name}</h3>
                      <p>{result.followers} followers</p>
                    </ResultCard>
                  );
                case 'album':
                  return (
                    <ResultCard key={result.id}>
                      <ResultImage style={{ backgroundImage: `url(${result.image})` }}>
                        <PlayButton><PlayArrowIcon /></PlayButton>
                      </ResultImage>
                      <h3>{result.title}</h3>
                      <p>{result.artist} • Album</p>
                    </ResultCard>
                  );
                case 'playlist':
                  return (
                    <ResultCard key={result.id}>
                      <ResultImage style={{ backgroundImage: `url(${result.image})` }}>
                        <PlayButton><PlayArrowIcon /></PlayButton>
                      </ResultImage>
                      <h3>{result.title}</h3>
                      <p>{result.songs} songs • Playlist</p>
                    </ResultCard>
                  );
                default:
                  return null;
              }
            })}
          </ResultsGrid>
        );
    }
  };

  return (
    <SearchContainer>
      <SearchHeader>
        <SearchBar>
          <SearchIcon />
          <SearchInput 
            type="text"
            placeholder="Search for songs, artists, or albums..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBar>
        <FilterSection>
          {filters.map(filter => (
            <FilterButton
              key={filter.toLowerCase()}
              active={activeFilter === filter.toLowerCase()}
              onClick={() => setActiveFilter(filter.toLowerCase())}
            >
              {filter}
            </FilterButton>
          ))}
        </FilterSection>
      </SearchHeader>

      {renderResults()}
    </SearchContainer>
  );
};

export default Search;