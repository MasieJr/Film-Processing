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
        headerStyle: {
          backgroundColor: "#2c2c2c",
        },
        headerTitle: () => <LogoTitle />,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Home" }} />
    </Stack>
  );
}
