import {ErrorMessage} from '@hookform/error-message';
import React, {memo} from 'react';
import {useController, useFormContext} from 'react-hook-form';
import {type TextInputProps} from 'react-native';
import styled, {useTheme} from 'styled-components/native';

export type InputProps = TextInputProps & {
  defaultValue?: string;
  name: string;
  label?: string;
  secureTextEntry?: boolean;
  placeholder?: string;
  error?: string;
  onIconClicked?: () => void;
};

const Container = styled.View<{hasError: boolean; theme: any}>`
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-color: ${({hasError, theme}) =>
    hasError ? theme.colors.error : theme.colors.border};
  border-radius: 5px;
  padding-vertical: 5px;
  margin-bottom: 5px;
  margin-horizontal: 10px;
`;

const Input = styled.TextInput.attrs(props => ({
  placeholderTextColor: props.theme.colors.placeholderTextColor,
}))`
  flex: 1;
  padding: 10px;
  font-size: 12px;
  color: ${({theme}) => theme.colors.text};
  background-color: ${({theme}) => theme.colors.background};
  ::placeholder {
    color: #fff;
  }
`;

const ErrorText = styled.Text`
  display: flex;
  color: ${({theme}) => theme.colors.error};
  align-self: flex-start;
  font-size: 12px;
  margin-horizontal: 10px;
`;

const BaseInput = (props: InputProps) => {
  const {defaultValue, name, secureTextEntry, placeholder} = props;

  const formContext = useFormContext();

  const {field, formState} = useController({
    name,
    control: formContext.control,
    defaultValue: defaultValue ?? '',
  });

  const hasError = Boolean(formState.errors[name]);
  const theme = useTheme();

  return (
    <>
      <Container hasError={hasError} theme={theme}>
        <Input
          defaultValue={field.value}
          onChangeText={value => field.onChange(value)}
          placeholder={placeholder}
          onBlur={field.onBlur}
          secureTextEntry={secureTextEntry}
          theme={theme}
        />
      </Container>
      <ErrorMessage
        errors={formState.errors}
        name={name}
        render={({message}) => <ErrorText theme={theme}>{message}</ErrorText>}
      />
    </>
  );
};

export default memo(BaseInput);
