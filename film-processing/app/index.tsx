import { ServiceItem } from "@/components/serviceItem";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { router } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaProvider
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ThemedView style={{ flex: 1, alignItems: "center", padding: 20 }}>
        <ThemedText style={styles.title}>
          Welcome to our Film Developing App!
        </ThemedText>
        <ThemedView darkColor="#2c2c2c" style={styles.accent}>
          <ThemedText
            style={{
              textAlign: "center",
              fontSize: 20,
              marginBottom: 5,
            }}
          >
            Place your order on the app and receive updates as they happen.
          </ThemedText>
          <Pressable
            style={{ margin: 10 }}
            onPress={() => router.push("/order_form")}
          >
            <ThemedView
              darkColor="#41B544"
              lightColor="#143A7C"
              style={{ borderRadius: 10, padding: 15 }}
            >
              <ThemedText
                style={{ fontSize: 30, textAlign: "center", lineHeight: 40 }}
              >
                Place Order
              </ThemedText>
            </ThemedView>
          </Pressable>
        </ThemedView>
        <ThemedText style={styles.title}>Services & Pricing</ThemedText>
        <ThemedView style={styles.gridContainer}>
          <ServiceItem service="Email in High Resolution" price="238" />
          <ServiceItem service="Email in Low Resolution" price="R218" />
          <ServiceItem service="Print and Email" price="R313" />
          <ServiceItem service="Develop Only" price="R89" />
        </ThemedView>
      </ThemedView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    padding: 10,
    lineHeight: 40,
  },
  accent: {
    marginHorizontal: 10,
    padding: 25,
    borderRadius: 10,
  },
  gridContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});
