import { StyleSheet } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedTextInput } from "./themed-textinput";

type ItemProps = {
  label: string;
  placeholder: string;
};

export default function Textfield({ label, placeholder }: ItemProps) {
  return (
    <>
      <ThemedText>{label}</ThemedText>
      <ThemedTextInput
        darkColor="#FFFFFF"
        placeholder={placeholder}
        style={styles.textInput}
      />
    </>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    padding: 5,
    borderWidth: 1,
    borderColor: "#41B544",
    backgroundColor: "#2c2c2c",
  },
});
