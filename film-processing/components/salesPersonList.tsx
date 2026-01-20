import { useState } from "react";
import { Modal, Button, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "./themed-view";
import { ThemedText } from "./themed-text";
import { ThemedTextInput } from "./themed-textinput";

type SalesPersonModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void; // <--- The "Return" mechanism
};

export function SalesPersonModal({
  visible,
  onClose,
  onSubmit,
}: SalesPersonModalProps) {
  const [salesPerson, setSalesPerson] = useState("");

  const salesPeople = [
    "Masie Seremu",
    "Nithian Chetty",
    "Prudence Ndlovu",
    "Yanga Bululu",
    "Hloni Smith",
    "Luisa Gravito",
  ];

  const handleSave = () => {
    onSubmit(salesPerson); // 1. Send the value back to the parent
    onClose(); // 3. Close the modal
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <ThemedView style={styles.overlay}>
        <ThemedView style={styles.modalContent}>
          <ThemedText style={styles.title}>Select Sales Person</ThemedText>
          {salesPeople.map((person, index) => (
            <TouchableOpacity key={index} style={styles.person}>
              <ThemedView darkColor="red">
                <ThemedText style={{fontSize:20}}>{person}</ThemedText>
              </ThemedView>
            </TouchableOpacity>
          ))}

          <ThemedView style={styles.buttons}>
            <Button title="Cancel" color="red" onPress={onClose} />
            <Button title="Save" onPress={handleSave} />
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // Dim background
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
  },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttons: { flexDirection: "row", justifyContent: "space-between" },
  person:{
    height:45,
    borderWidth:1,
    alignItems:"center",
    justifyContent: "center",
    marginVertical: 5

  }
});
