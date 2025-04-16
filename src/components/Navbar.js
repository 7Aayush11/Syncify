import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import PersonIcon from '@mui/icons-material/Person';

const NavContainer = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 100px;
  width: 240px;
  background: ${props => props.theme.playerBackground};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px;
  color: ${props => props.active ? props.theme.primary : props.theme.textDim};
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    color: ${props => props.theme.text};
    background: ${props => props.theme.overlay};
  }
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.theme.primary};
  margin-bottom: 30px;
`;

const Navbar = () => {
  const location = useLocation();

  return (
    <NavContainer>
      <Logo>Syncify</Logo>
      <NavLink to="/" active={location.pathname === '/' ? 1 : 0}>
        <HomeIcon /> Home
      </NavLink>
      <NavLink to="/search" active={location.pathname === '/search' ? 1 : 0}>
        <SearchIcon /> Search
      </NavLink>
      <NavLink to="/library" active={location.pathname === '/library' ? 1 : 0}>
        <LibraryMusicIcon /> Library
      </NavLink>
      <NavLink to="/profile" active={location.pathname === '/profile' ? 1 : 0}>
        <PersonIcon /> Profile
      </NavLink>
    </NavContainer>
  );
};

export default Navbar;