import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet,View ,Image,Text } from 'react-native';
import 'react-native-reanimated';
import HomeScreen from './Home';

import logo from '../assets/images/logo.png';
export const HeaderLogo = () => (
  <Image
    source={logo}
    style={{ width: 200, height: 60, resizeMode: 'contain' }}
  />
);

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const colorScheme = useColorScheme();
  const Tab = createBottomTabNavigator();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
       <Tab.Navigator 
          screenOptions={{
            tabBarStyle: styles.tabBar,
            tabBarActiveTintColor: '#bf4da2',
            tabBarInactiveTintColor: '#6F5D6A',
            headerStyle: styles.header,
            headerTintColor: '#6F5D6A',
            headerTitle: () => <HeaderLogo />,
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: true,
              tabBarIcon: ({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              ),
            }}
          />
          {/* <Tab.Screen
            name="Generator"
            component={GeneratorScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Icon name="sync-circle-outline" color={color} size={size} />
              ),
            }}
          /> */}
        </Tab.Navigator>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#F3EFF0',
    borderTopWidth: 0,
  },
  header: {
    backgroundColor: '#F3EFF0',
    elevation: 0,
  },
  top:{
    backgroundColor: '#F3EFF0',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 22,
  },
});