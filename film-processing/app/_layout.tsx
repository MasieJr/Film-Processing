import { Stack } from "expo-router";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { Image } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();

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
          backgroundColor: "#121212",
        },
        headerTitle: () => <LogoTitle />,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="order_form" />
    </Stack>
  );
}
