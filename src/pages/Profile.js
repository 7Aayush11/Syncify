import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';

const ProfileContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 40px;
`;

const ProfileImage = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: ${props => props.theme.playerBackground};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80px;
  color: ${props => props.theme.textDim};
  position: relative;
  cursor: pointer;

  &:hover .edit-overlay {
    opacity: 1;
  }
`;

const EditOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const ProfileInfo = styled.div`
  flex: 1;

  h1 {
    font-size: 2.5rem;
    color: ${props => props.theme.text};
    margin-bottom: 10px;
  }

  p {
    color: ${props => props.theme.textDim};
    font-size: 1.1rem;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const StatCard = styled.div`
  background: ${props => props.theme.playerBackground};
  padding: 20px;
  border-radius: 12px;
  text-align: center;

  h3 {
    color: ${props => props.theme.primary};
    font-size: 2rem;
    margin-bottom: 5px;
  }

  p {
    color: ${props => props.theme.textDim};
  }
`;

const Section = styled.div`
  margin-bottom: 40px;

  h2 {
    color: ${props => props.theme.text};
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const SettingCard = styled.div`
  background: ${props => props.theme.playerBackground};
  padding: 20px;
  border-radius: 12px;

  h3 {
    color: ${props => props.theme.text};
    margin-bottom: 10px;
  }

  p {
    color: ${props => props.theme.textDim};
    margin-bottom: 15px;
  }
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 34px;

    &:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
  }

  input:checked + span {
    background-color: ${props => props.theme.primary};
  }

  input:checked + span:before {
    transform: translateX(26px);
  }
`;

const Profile = ({ theme, onThemeToggle }) => {
  const [settings, setSettings] = useState({
    darkMode: theme === 'dark',
    notifications: true,
    publicProfile: false
  });

  useEffect(() => {
    setSettings(prev => ({
      ...prev,
      darkMode: theme === 'dark'
    }));
  }, [theme]);

  const handleSettingChange = (key) => {
    if (key === 'darkMode') {
      onThemeToggle();
    }
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileImage>
          <PersonIcon fontSize="inherit" />
          <EditOverlay className="edit-overlay">
            <EditIcon />
          </EditOverlay>
        </ProfileImage>
        <ProfileInfo>
          <h1>John Doe</h1>
          <p>@johndoe • Premium Member</p>
        </ProfileInfo>
      </ProfileHeader>

      <StatsContainer>
        <StatCard>
          <h3>247</h3>
          <p>Playlists Created</p>
        </StatCard>
        <StatCard>
          <h3>1.2K</h3>
          <p>Liked Songs</p>
        </StatCard>
        <StatCard>
          <h3>45</h3>
          <p>Following</p>
        </StatCard>
        <StatCard>
          <h3>128</h3>
          <p>Followers</p>
        </StatCard>
      </StatsContainer>

      <Section>
        <h2><SettingsIcon /> Settings</h2>
        <SettingsGrid>
          {Object.entries(settings).map(([key, value]) => (
            <SettingCard key={key}>
              <h3>{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
              <p>Toggle {key.split(/(?=[A-Z])/).join(' ').toLowerCase()}</p>
              <ToggleSwitch>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handleSettingChange(key)}
                />
                <span></span>
              </ToggleSwitch>
            </SettingCard>
          ))}
        </SettingsGrid>
      </Section>
    </ProfileContainer>
  );
};

export default Profile;