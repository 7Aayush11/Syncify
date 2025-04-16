import React from 'react';
import styled from 'styled-components';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import ClearIcon from '@mui/icons-material/Clear';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const QueueContainer = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  bottom: 100px;
  width: 400px;
  background: ${props => props.theme.playerBackground};
  border-left: 1px solid ${props => props.theme.overlay};
  padding: 20px;
  transform: translateX(${props => props.isOpen ? '0' : '100%'});
  transition: transform 0.3s ease;
  z-index: 90;
`;

const QueueHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  h2 {
    color: ${props => props.theme.text};
  }
`;

const QueueItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 15px;
  padding: 10px;
  align-items: center;
  border-radius: 8px;
  background: ${props => props.isPlaying ? props.theme.overlay : 'transparent'};

  &:hover {
    background: ${props => props.theme.overlay};
  }
`;

const SongInfo = styled.div`
  h4 {
    color: ${props => props.theme.text};
    margin-bottom: 4px;
  }
  
  p {
    color: ${props => props.theme.textDim};
    font-size: 0.9rem;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.textDim};
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    color: ${props => props.theme.text};
  }
`;

const QueueManager = ({ isOpen, onClose, queue, currentSong, onQueueUpdate }) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(queue);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onQueueUpdate(items);
  };

  const removeFromQueue = (songId) => {
    const updatedQueue = queue.filter(song => song.id !== songId);
    onQueueUpdate(updatedQueue);
  };

  return (
    <QueueContainer isOpen={isOpen}>
      <QueueHeader>
        <h2>Queue</h2>
        <IconButton onClick={onClose}>
          <ClearIcon />
        </IconButton>
      </QueueHeader>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="queue">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {queue.map((song, index) => (
                <Draggable key={song.id} draggableId={song.id} index={index}>
                  {(provided) => (
                    <QueueItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      isPlaying={currentSong?.id === song.id}
                    >
                      <span {...provided.dragHandleProps}>
                        <DragHandleIcon />
                      </span>
                      <SongInfo>
                        <h4>{song.title}</h4>
                        <p>{song.artist}</p>
                      </SongInfo>
                      <IconButton onClick={() => removeFromQueue(song.id)}>
                        <ClearIcon />
                      </IconButton>
                    </QueueItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </QueueContainer>
  );
};

export default QueueManager;