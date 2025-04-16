import React, { useState } from 'react';
import styled from 'styled-components';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ContextMenu from '../components/ContextMenu';

const PlaylistContainer = styled.div`
  padding: 30px;
`;

const PlaylistHeader = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 40px;
`;

const PlaylistCover = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 12px;
  background: ${props => props.theme.playerBackground};
  background-size: cover;
  background-position: center;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
`;

const PlaylistInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  h1 {
    font-size: 3rem;
    color: ${props => props.theme.text};
    margin-bottom: 10px;
  }

  p {
    color: ${props => props.theme.textDim};
    margin-bottom: 20px;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
`;

const PlayButton = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${props => props.theme.primary};
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    background: ${props => props.theme.primaryLight};
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.text};
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    color: ${props => props.theme.primary};
    background: ${props => props.theme.overlay};
  }
`;

const SongList = styled.div`
  width: 100%;
`;

const SongHeader = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr 1fr 100px;
  padding: 0 20px;
  color: ${props => props.theme.textDim};
  font-size: 0.9rem;
  margin-bottom: 20px;
  border-bottom: 1px solid ${props => props.theme.overlay};
  padding-bottom: 10px;
`;

const SongItem = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr 1fr 100px;
  padding: 10px 20px;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.overlay};
  }
`;

const DraggableSongItem = styled(SongItem)`
  background: ${props => props.isDragging ? props.theme.overlay : 'transparent'};
  display: grid;
  grid-template-columns: 30px 50px 1fr 1fr 100px;
  padding: 10px 20px;
`;

const DragHandle = styled(DragHandleIcon)`
  cursor: grab;
  color: ${props => props.theme.textDim};
  visibility: hidden;
  ${DraggableSongItem}:hover & {
    visibility: visible;
  }
`;

const PlaylistDetail = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const [songs, setSongs] = useState([
    { id: '1', title: "Summer Song", artist: "Beach Boys", duration: "3:24" },
    { id: '2', title: "Sunny Day", artist: "Sun Kings", duration: "4:15" },
    { id: '3', title: "Beach Party", artist: "Coastal Kings", duration: "3:45" },
    { id: '4', title: "Waves", artist: "Ocean Drive", duration: "4:30" },
  ]);

  const mockPlaylist = {
    title: "Summer Vibes 2023",
    creator: "John Doe",
    description: "Perfect playlist for sunny days",
    songCount: 24,
    duration: "1 hr 42 min",
    cover: "/images/playlist-cover.jpg",
  };

  const handleContextMenu = (event, song) => {
    event.preventDefault();
    setContextMenu({ x: event.clientX, y: event.clientY });
    setSelectedSong(song);
  };

  const handleContextAction = (action) => {
    switch (action) {
      case 'queue':
        console.log('Added to queue:', selectedSong);
        break;
      case 'favorite':
        console.log('Added to favorites:', selectedSong);
        break;
      case 'share':
        console.log('Sharing:', selectedSong);
        break;
      case 'delete':
        setSongs(songs.filter(song => song.id !== selectedSong.id));
        break;
      default:
        break;
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(songs);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSongs(items);
  };

  return (
    <PlaylistContainer>
      <PlaylistHeader>
        <PlaylistCover style={{ backgroundImage: `url(${mockPlaylist.cover})` }} />
        <PlaylistInfo>
          <h1>{mockPlaylist.title}</h1>
          <p>{mockPlaylist.description}</p>
          <p>Created by {mockPlaylist.creator} • {mockPlaylist.songCount} songs, {mockPlaylist.duration}</p>
          
          <Controls>
            <PlayButton onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </PlayButton>
            <IconButton>
              <EditIcon />
            </IconButton>
            <IconButton>
              <ShareIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </Controls>
        </PlaylistInfo>
      </PlaylistHeader>

      <SongList>
        <SongHeader style={{ gridTemplateColumns: '30px 50px 1fr 1fr 100px' }}>
          <span></span>
          <span>#</span>
          <span>Title</span>
          <span>Artist</span>
          <span><AccessTimeIcon /></span>
        </SongHeader>
        
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="songs">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {songs.map((song, index) => (
                  <Draggable key={song.id} draggableId={song.id} index={index}>
                    {(provided, snapshot) => (
                      <DraggableSongItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        isDragging={snapshot.isDragging}
                        onContextMenu={(e) => handleContextMenu(e, song)}
                      >
                        <span {...provided.dragHandleProps}>
                          <DragHandle />
                        </span>
                        <span>{index + 1}</span>
                        <span>{song.title}</span>
                        <span>{song.artist}</span>
                        <span>{song.duration}</span>
                      </DraggableSongItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </SongList>

      {contextMenu && (
        <>
          <div
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
            onClick={() => setContextMenu(null)}
          />
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onClose={() => setContextMenu(null)}
            onAction={handleContextAction}
          />
        </>
      )}
    </PlaylistContainer>
  );
};

export default PlaylistDetail;