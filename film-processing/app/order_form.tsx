import Textfield from "@/components/textfield";
import { ThemedView } from "@/components/themed-view";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function OrderFormScreen() {
  return (
    <SafeAreaProvider style={{ flex: 1, justifyContent: "center" }}>
      <ThemedView style={{ flex: 1, padding: 20 }}>
        <Textfield
          label="Name & Surname"
          placeholder="Enter your name and surname"
        />
        <Textfield
          label="Email Address"
          placeholder="Enter your email address"
        />
        <Textfield label="Phone Number" placeholder="Enter your phone number" />
      </ThemedView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  textfield: {
    marginVertical: 10,
  },
});
