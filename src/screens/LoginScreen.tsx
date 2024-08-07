// src/screens/LoginScreen.tsx

import {yupResolver as FormResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import styled from 'styled-components/native';
import {useLogInSchema} from '../common/forms/authen.schema';
import Button from '../components/button/Button';
import Input from '../components/input/Input';
import Spacing from '../components/spacing/Spacing';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.background};
`;

const Image = styled.Image`
  justify-content: center;
  width: 80px;
  height: 80px;
`;

export interface ILoginFormValue {
  email?: string;
  password?: string;
}

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const form = useForm<ILoginFormValue>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: FormResolver<ILoginFormValue>(useLogInSchema()),
    reValidateMode: 'onChange',
    mode: 'onChange',
  });

  const onSubmit = useCallback((values: ILoginFormValue) => {
    navigation.navigate('Home');
  }, []);

  return (
    <Container>
      <Image source={require('../assets/images/Logo.png')} />
      <Spacing height={40} />
      <FormProvider {...form}>
        <Input name="email" keyboardType="email-address" placeholder="Email" />
        <Spacing height={6} />
        <Input name="password" placeholder="Password" secureTextEntry={true} />
      </FormProvider>
      <Spacing height={16} />
      <Button title="Login" onPress={form.handleSubmit(onSubmit)} />
    </Container>
  );
};

export default LoginScreen;
