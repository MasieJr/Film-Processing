import { useState } from "react";
import { Modal, TouchableOpacity } from "react-native";
import { Radiobutton } from "./radiobutton";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

type PrintsModallProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void;
};

export function Prints({ visible, onClose, onSubmit }: PrintsModallProps) {
  const [selected, setSelected] = useState(0);
  const [selectedFinish, setSelectedFinish] = useState(0);
  const sizes = ["9x13cm", "10x15cm", "13x18cm", "15x20cm", "20x30cm"];

  const finishes = ["Glossy", "Matte"];

  return (
    <Modal visible={visible} animationType="slide">
      <ThemedView>
        <ThemedView>
          {sizes.map((size, index) => (
            <TouchableOpacity key={index} onPress={() => setSelected(index)}>
              <Radiobutton value={size} isSelected={selected === index} />
            </TouchableOpacity>
          ))}
        </ThemedView>
        <ThemedView>
          {finishes.map((finish, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedFinish(index)}
            >
              <Radiobutton
                value={finish}
                isSelected={selectedFinish === index}
              />
            </TouchableOpacity>
          ))}
        </ThemedView>
        <TouchableOpacity>
          <ThemedText>Select</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </Modal>
  );
}
