import { Stack, usePathname, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Animated, Pressable, View } from 'react-native';
import { Appbar, Drawer as PaperDrawer, useTheme } from 'react-native-paper';

export default function DrawerLayout() {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const drawerWidth = useRef(new Animated.Value(0)).current;

  const toggleDrawer = () => {
    const nextVisible = !drawerVisible;
    setDrawerVisible(nextVisible);
    Animated.timing(drawerWidth, {
      toValue: nextVisible ? 250 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <Animated.View
        style={{
          width: drawerWidth,
          backgroundColor: theme.colors.surface,
          elevation: 4,
          overflow: 'hidden',
        }}
      >
        <PaperDrawer.Section>
          <PaperDrawer.Item
            label="Home"
            icon="home"
            active={pathname === '/(drawer)'}
            onPress={() => {
              router.push('/(drawer)');
              setDrawerVisible(false);
              Animated.timing(drawerWidth, {
                toValue: 0,
                duration: 250,
                useNativeDriver: false,
              }).start();
            }}
          />
          <PaperDrawer.Item
            label="Explore"
            icon="send"
            active={pathname === '/(drawer)/explore'}
            onPress={() => {
              router.push('/(drawer)/explore');
              setDrawerVisible(false);
              Animated.timing(drawerWidth, {
                toValue: 0,
                duration: 250,
                useNativeDriver: false,
              }).start();
            }}
          />
        </PaperDrawer.Section>
      </Animated.View>

      <Pressable
        style={{ flex: 1 }}
        onPress={() => drawerVisible && setDrawerVisible(false)}
        disabled={!drawerVisible}
      >
        <Stack
          screenOptions={{
            header: () => (
              <Appbar.Header style={{ backgroundColor: theme.colors.surface }}>
                <Appbar.Action icon="menu" onPress={toggleDrawer} />
                <Appbar.Content title="Pet App" />
              </Appbar.Header>
            ),
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="explore" />
        </Stack>
      </Pressable>
    </View>
  );
}
