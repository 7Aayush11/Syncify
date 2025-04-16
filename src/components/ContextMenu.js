import React from 'react';
import styled from 'styled-components';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';

const MenuContainer = styled.div`
  position: fixed;
  background: ${props => props.theme.playerBackground};
  border-radius: 8px;
  padding: 8px 0;
  min-width: 200px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const MenuItem = styled.div`
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  color: ${props => props.theme.text};

  &:hover {
    background: ${props => props.theme.overlay};
    color: ${props => props.theme.primary};
  }

  svg {
    font-size: 20px;
  }
`;

const ContextMenu = ({ x, y, onClose, onAction }) => {
  const menuItems = [
    { id: 'queue', label: 'Add to Queue', icon: <QueueMusicIcon /> },
    { id: 'favorite', label: 'Add to Favorites', icon: <FavoriteIcon /> },
    { id: 'share', label: 'Share Song', icon: <ShareIcon /> },
    { id: 'delete', label: 'Remove from Playlist', icon: <DeleteIcon /> },
  ];

  return (
    <MenuContainer style={{ top: y, left: x }}>
      {menuItems.map(item => (
        <MenuItem
          key={item.id}
          onClick={() => {
            onAction(item.id);
            onClose();
          }}
        >
          {item.icon}
          {item.label}
        </MenuItem>
      ))}
    </MenuContainer>
  );
};

export default ContextMenu;