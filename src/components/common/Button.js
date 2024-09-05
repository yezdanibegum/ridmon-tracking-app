import React from 'react';
import styled, { keyframes } from 'styled-components';
import { bounce } from '../../utils/animations';

const ButtonWrapper = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  background-color: ${props => props.primary ? '#ff9999' : '#99ff99'};
  color: ${props => props.primary ? 'white' : '#333'};
  &:hover {
    background-color: ${props => props.primary ? '#ff6666' : '#66ff66'};
    animation: ${bounce} 0.5s;
  }
`;

const Button = ({ children, ...props }) => {
  return <ButtonWrapper {...props}>{children}</ButtonWrapper>;
};

export default Button;
