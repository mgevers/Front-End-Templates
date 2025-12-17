import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { AlertColor } from '@/components/toast';
import { AppDispatch } from '@/store';
import { showToast } from '@/store/slices/toast.slice';

export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();

  const displayToast = (message: string, alert?: AlertColor) => {
    const toast = {
      message,
      severity: alert,
    };

    dispatch(showToast(toast));
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <Text variant="titleLarge">Home Page!</Text>
      <Button mode="contained" onPress={() => displayToast('Success!', 'success')}>
        Success
      </Button>
      <Button mode="outlined" onPress={() => displayToast('Failure!', 'error')}>
        Failure
      </Button>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
