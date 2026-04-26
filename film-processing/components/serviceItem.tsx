import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { StyleSheet } from "react-native";

type ItemProps = {
  service: string;
  price: string;
};

export function ServiceItem({ service, price }: ItemProps) {
  return (
    <ThemedView darkColor="#2c2c2c" style={styles.gridItem}>
      <ThemedText style={styles.text}>{service}</ThemedText>
      <ThemedText style={styles.text} darkColor="#41B544">
        {price}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  gridItem: {
    width: "44%",
    height: 100,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 17,
  },
});
