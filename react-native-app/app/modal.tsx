import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

export default function ModalScreen() {
  const router = useRouter();

  return (
    <Portal>
      <Dialog visible={true} onDismiss={() => router.back()} style={styles.dialog}>
        <Dialog.Title>Modal Dialog</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">
            This is a modal using React Native Paper's Dialog component.
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => router.push('/')}>Go to Home</Button>
          <Button onPress={() => router.back()}>Close</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialog: {
    alignSelf: 'center',
    maxWidth: 400,
  },
});
