import styled from 'styled-components';

const ThemeToggle = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  font-size: 1.2rem;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    border-color: ${props => props.theme.primary};
  }
`;

export default ThemeToggle;