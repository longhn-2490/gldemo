import React from 'react';
import {Text, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import styled from 'styled-components/native';

const ButtonContainer = styled(TouchableOpacity)`
  background-color: ${props => props.theme.colors.buttonBackground};
  padding: 15px;
  margin-horizontal: 90px;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  opacity: ${({disabled}) => (disabled ? 0.7 : 1)};
`;

const ButtonText = styled(Text)<{textColor?: string}>`
  text-align: center;
  color: ${props => props.theme.colors.buttonText};
  font-size: 16px;
  font-weight: bold;
  width: 100%;
`;

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({title, onPress, style, textStyle}) => {
  return (
    <ButtonContainer onPress={onPress} style={style}>
      <ButtonText style={textStyle}>{title}</ButtonText>
    </ButtonContainer>
  );
};

export default Button;
