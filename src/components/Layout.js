import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import MusicPlayer from './MusicPlayer';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${props => props.theme.background};
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 240px;
  padding: 20px;
  padding-bottom: 120px; // Increased to prevent content from being hidden behind player
  min-height: 100vh;
  background: ${props => props.theme.background};
  overflow-x: hidden;
`;

const PlayerWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: ${props => props.theme.playerBackground};
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid ${props => props.theme.overlay};
`;

const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <Navbar />
      <MainContent>
        {children}
      </MainContent>
      <PlayerWrapper>
        <MusicPlayer />
      </PlayerWrapper>
    </LayoutContainer>
  );
};

export default Layout;