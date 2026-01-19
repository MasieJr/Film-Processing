import Textfield from "@/components/textfield";
import { ThemedText } from "@/components/themed-text";
import { ThemedTextInput } from "@/components/themed-textinput";
import { ThemedView } from "@/components/themed-view";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function OrderFormScreen() {
  const [count, setCount] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: "1",
  });

  useEffect(() => {}, [count]);
  const decrement = () => {
    setCount((prev) => Math.max(1, prev - 1));
  };
  const increment = () => {
    setCount((prev) => prev + 1);
  };
  return (
    <SafeAreaProvider style={{ flex: 1, justifyContent: "center" }}>
      <ThemedView style={{ flex: 1, padding: 20 }}>
        <Textfield
          label="Name & Surname"
          placeholder="Enter your name and surname"
          autocomplete="name"
        />
        <Textfield
          label="Email Address"
          placeholder="Enter your email address"
          autocomplete="email"
          type="emailAddress"
        />
        <Textfield
          label="Phone Number"
          placeholder="Enter your phone number"
          autocomplete="tel"
        />
        <View style={styles.stepper}>
          <ThemedText>Quantity</ThemedText>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={styles.stepperbtn} onPress={decrement}>
              <ThemedText>-</ThemedText>
            </TouchableOpacity>
            <ThemedTextInput style={{ marginHorizontal: 10, fontSize: 20 }}>
              {count}
            </ThemedTextInput>
            <TouchableOpacity style={styles.stepperbtn} onPress={increment}>
              <ThemedText>+</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ThemedView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  stepper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stepperbtn: {
    width: 25,
    height: 25,
    justifyContent: "center",
    backgroundColor: "#2c2c2c",
    alignItems: "center",
    borderRadius: 5,
  },
});
