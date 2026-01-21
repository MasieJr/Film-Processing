import { StyleSheet } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useThemeColor } from "@/hooks/use-theme-color";
import { Background } from "@react-navigation/elements";

export type ButtonProp = {
    lightColor?: string;
    darkColor?: string;
    value: string;
    isSelected: boolean
};

export function Radiobutton({ lightColor, darkColor, value, isSelected }: ButtonProp) {
 const innerColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return (
    <ThemedView style={styles.container}>
        <ThemedView style={[styles.outerRing, {borderColor:innerColor}]}>
            <ThemedView style={[styles.innerRing, isSelected && { backgroundColor: innerColor }]}/>
        </ThemedView>
      <ThemedText>{value}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: 5

    },
    outerRing: {
        padding: 4,
        margin:5,
        width: 25,
        height: 25,
        borderWidth: 1,
        borderRadius:100,
    },
    innerRing:{
        width: "100%",
        height: "100%",
        borderRadius:50
    }
})
