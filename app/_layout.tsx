import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import AppContext from './AppContext';
import HomeScreen from './Home';

import logo from '../assets/images/logo.png';
export const HeaderLogo = () => <Image source={logo} style={styles.logo} />;

import { useColorScheme } from '@/hooks/useColorScheme';

const Stack = createStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
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

  const customDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: '#0760c2',
      card: '#0760c2', // Header background
    },
  };

  const customDefaultTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#0760c2',
      card: '#0760c2', // Header background
    },
  };

  return (
    <AppContext>
      <ThemeProvider value={colorScheme === 'dark' ? customDarkTheme : customDefaultTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: true,
              headerTitle: () => <HeaderLogo />,
            }}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AppContext>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 330,
    height: 60,
    resizeMode: 'contain',
    alignItems: 'center',
  }
});
