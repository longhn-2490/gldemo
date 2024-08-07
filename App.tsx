// App.tsx
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Provider} from 'urql';
import {NetInfoProvider} from './src/context/NetInfoContext';
import ThemeProviderWrapper, {
  useThemeContext,
} from './src/context/ThemeContext';
import client from './src/graphql/client';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import {darkTheme, lightTheme} from './src/theme';

const Stack = createStackNavigator();

const NavigationWrapper = () => {
  const {toggleTheme, isDarkTheme} = useThemeContext();

  const navigationTheme: Theme = isDarkTheme ? DarkTheme : DefaultTheme;
  const customTheme = isDarkTheme ? darkTheme : lightTheme;

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: customTheme.colors.headerBackground,
          },
          headerTintColor: customTheme.colors.headerText,
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: () => (
            <TouchableOpacity onPress={toggleTheme}>
              <Text style={{color: customTheme.colors.headerText}}>Toggle</Text>
            </TouchableOpacity>
          ),
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider value={client}>
      <ThemeProviderWrapper>
        <NetInfoProvider>
          <NavigationWrapper />
        </NetInfoProvider>
      </ThemeProviderWrapper>
    </Provider>
  );
};

export default App;
