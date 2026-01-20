import { Stack } from "expo-router";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { Image } from "react-native";
import { useThemeColor } from "@/hooks/use-theme-color";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const bg = useThemeColor({ light: '#fff', dark: '#121212' }, 'background');

  console.log(colorScheme);
  function LogoTitle() {
    return (
      <Image
        style={{ width: 200, height: 150 }}
        source={require("../assets/images/logo.png")} // Update path!
        resizeMode="contain"
      />
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerBackButtonDisplayMode: "minimal",
        headerStyle: {
          backgroundColor: bg,
        },
        headerTitle: () => <LogoTitle />,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="order_form" />
    </Stack>
  );
}
