import React, {createContext, ReactNode, useContext, useState} from 'react';
import {ThemeProvider} from 'styled-components/native';
import {darkTheme, lightTheme} from '../theme';

type ThemeContextType = {
  toggleTheme: () => void;
  isDarkTheme: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      'useThemeContext must be used within a ThemeProviderWrapper',
    );
  }
  return context;
};

const ThemeProviderWrapper = ({children}: {children: ReactNode}) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev);
  };

  const theme = isDarkTheme ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{toggleTheme, isDarkTheme}}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProviderWrapper;
