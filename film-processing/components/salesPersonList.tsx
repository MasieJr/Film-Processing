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

  const salesPeople = [
    "Masie Seremu",
    "Nithian Chetty",
    "Prudence Ndlovu",
    "Yanga Bululu",
    "Hloni Smith",
    "Luisa Gravito",
  ];

  return (
    <Modal visible={visible} animationType="fade" transparent >
      <ThemedView style={styles.overlay}>
        <ThemedView style={styles.modalContent}>
          <ThemedText style={styles.title}>Select Sales Person</ThemedText>
          {salesPeople.map((person, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                console.log(person);
                onSubmit(person);
                onClose();
              }}
            >
              <ThemedView darkColor="#2c2c2c" style={styles.person}>
                <ThemedText style={{ fontSize: 20 }}>{person}</ThemedText>
              </ThemedView>
            </TouchableOpacity>
          ))}
          <ThemedView style={styles.buttons}>
            <Button title="Cancel" color="red" onPress={onClose} />
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", 
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
  },
  title: { fontSize: 30,lineHeight:40, fontWeight: "bold", marginBottom: 10, textAlign:"center" },
  buttons: {},
  person: {
    height: 45,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    borderRadius: 10,
    borderColor: "#41B544",
  },
});
