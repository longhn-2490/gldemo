// src/context/NetInfoContext.tsx
import React, {createContext, ReactNode, useContext, useEffect} from 'react';
import Toast from 'react-native-toast-message';
import useNetInfoStatus from '../hooks/useNetInfoStatus';

const NetInfoContext = createContext<boolean | null>(null);

export const NetInfoProvider = ({children}: {children: ReactNode}) => {
  const isConnected = useNetInfoStatus();

  useEffect(() => {
    if (isConnected !== null) {
      Toast.show({
        type: isConnected ? 'success' : 'error',
        text1: isConnected ? 'Online' : 'Offline',
        text2: isConnected
          ? 'You are back online!'
          : 'You have lost connection.',
      });
    }
  }, [isConnected]);

  return (
    <NetInfoContext.Provider value={isConnected}>
      {children}
      <Toast />
    </NetInfoContext.Provider>
  );
};

export const useNetInfo = () => useContext(NetInfoContext);
