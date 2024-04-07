import styled from 'styled-components';

interface StyledLabelProps {
  checked: boolean;
}

export const StyledLabel = styled.label<StyledLabelProps>`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  background-color: ${(props) => (props.checked ? '#4CAF50' : '#ccc')};
  border-radius: 34px;
  cursor: pointer;
  transition: background-color 0.2s;

  &::after {
    content: '';
    position: absolute;
    width: 26px;
    height: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    border-radius: 50%;
    transition: transform 0.2s;
    transform: ${(props) => (props.checked ? 'translateX(26px)' : 'none')};
  }
`;
