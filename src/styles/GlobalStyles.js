import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${props => props.theme.background};
    color: ${props => props.theme.text};
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;

    &::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        linear-gradient(120deg, 
          rgba(139, 92, 246, 0.15) 0%, 
          transparent 40%
        ),
        radial-gradient(
          circle at 90% 10%,
          rgba(139, 92, 246, 0.2) 0%,
          transparent 60%
        ),
        radial-gradient(
          circle at 10% 90%,
          rgba(109, 40, 217, 0.2) 0%,
          transparent 60%
        );
      pointer-events: none;
      z-index: 1;
    }
  }

  // Remove the previous animations
  // @keyframes gradientMovement {...}
  // @keyframes shimmer {...}
  // Navigation and Layout
  .nav-link {
    color: ${props => props.theme.textDim};
    text-decoration: none;
    transition: color 0.3s ease;
    padding: 10px 20px;
    border-radius: 8px;

    &:hover, &.active {
      color: ${props => props.theme.primary};
      background: ${props => props.theme.overlay};
    }
  }

  // Cards and Containers
  .playlist-card {
    background: ${props => props.theme.playerBackground};
    border-radius: 16px;
    padding: 20px;
    transition: all 0.3s ease;
    cursor: pointer;
    border: 1px solid rgba(255, 255, 255, 0.1);
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
      border-color: ${props => props.theme.primary}40;
    }
  }

  // Search and Input Fields
  .search-input {
    background: ${props => props.theme.secondaryDark};
    border: 2px solid transparent;
    border-radius: 12px;
    color: ${props => props.theme.text};
    padding: 12px 20px;
    width: 100%;
    transition: all 0.3s ease;
    font-size: 1rem;
    
    &:focus {
      border-color: ${props => props.theme.primary};
      box-shadow: 0 0 0 4px ${props => props.theme.shadow};
      outline: none;
    }

    &::placeholder {
      color: ${props => props.theme.textDim};
    }
  }

  // Typography
  .section-title {
    font-size: 2rem;
    font-weight: 700;
    color: ${props => props.theme.text};
    margin-bottom: 1.5rem;
    background: ${props => props.theme.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.5px;
  }

  // Buttons
  .button {
    background: ${props => props.theme.gradient};
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px ${props => props.theme.shadow};
    }

    &:active {
      transform: translateY(0);
    }
  }

  // Scrollbar
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.secondaryDark};
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.primary}80;
    border-radius: 5px;
    border: 2px solid ${props => props.theme.secondaryDark};
    
    &:hover {
      background: ${props => props.theme.primary};
    }
  }

  // Cards
  .card {
    background: ${props => props.theme.playerBackground};
    border-radius: 16px;
    padding: 20px;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
      border-color: ${props => props.theme.primary}40;
    }
  }

  // Profile Stats
  .stat-card {
    background: ${props => props.theme.playerBackground};
    border-radius: 12px;
    padding: 15px;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.1);

    .stat-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: ${props => props.theme.primary};
    }

    .stat-label {
      color: ${props => props.theme.textDim};
      font-size: 0.9rem;
      margin-top: 5px;
    }
  }
`;