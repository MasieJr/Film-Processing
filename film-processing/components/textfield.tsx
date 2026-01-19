import { StyleSheet } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedTextInput } from "./themed-textinput";

type ItemProps = {
  label: string;
  placeholder: string;
  autocomplete?: "name" | "email" | "tel" | "off";
  type?: "name" | "emailAddress" | "telephoneNumber" | "none";
};

export default function FieldItem({
  label,
  placeholder,
  autocomplete,
  type,
}: ItemProps) {
  return (
    <>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <ThemedTextInput
        darkColor="#fff9f9"
        lightColor="#2c2c2c"
        placeholder={placeholder}
        style={styles.textInput}
        autoComplete={autocomplete}
        textContentType={type}
        keyboardType={type === "emailAddress" ? "email-address" : "default"}
      />
    </>
  );
}

const styles = StyleSheet.create({
  textInput: {
    fontSize: 18,
    height: 45,
    padding: 5,
    borderWidth: 1,
    borderColor: "#41B544",
    borderRadius: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 20,
  },
});
