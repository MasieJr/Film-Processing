import { StyleSheet } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedTextInput , type ThemedTextInputProps} from "./themed-textinput";

type ItemProps = ThemedTextInputProps & {
  label: string;
  
};

export default function FieldItem({
  label,
  ...otherProps
}: ItemProps) {
  return (
    <>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <ThemedTextInput style={styles.textInput}
        darkColor="#fff9f9"
        lightColor="#2c2c2c"
        {...otherProps}
        
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
