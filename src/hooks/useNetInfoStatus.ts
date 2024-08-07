import NetInfo from '@react-native-community/netinfo';
import {useEffect, useState} from 'react';

const useNetInfoStatus = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    // Fetch initial state
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  return isConnected;
};

export default useNetInfoStatus;
