import { Radiobutton } from "@/components/radiobutton";
import { SalesPersonModal } from "@/components/salesPersonList";
import Textfield from "@/components/textfield";
import { ThemedText } from "@/components/themed-text";
import { ThemedTextInput } from "@/components/themed-textinput";
import { ThemedView } from "@/components/themed-view";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function OrderFormScreen() {
  const [selectedPrice, setSelectedPrice] = useState(238);
  const [salesPerson, setSalesPerson] = useState("Please Select Sales Person");
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState(0);
  const services = [
    "Email in High Resolution",
    "Email in low Resolution",
    "Print Only",
    "Print and email",
    "Develop only",
  ];
  const prices = [238, 218, 313, 313, 89];

  function select(index: number) {
    setSelected(index);
    setForm((prev) => ({
      ...prev,
      price: prev.quantity * prices[index],
    }));
    setSelectedPrice(prices[index]);
  }

  function negative() {
    setForm((prev) => ({
      ...prev,
      keepNegatives: !prev.keepNegatives,
    }));
  }

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: 1,
    salesPerson: "",
    selectedService: "",
    price: 238,
    keepNegatives: false,
  });

  useEffect(() => {}, [form]);

  const decrement = () => {
    setForm((prev) => {
      const newQuantity = Math.max(1, prev.quantity - 1);

      return {
        ...prev,
        quantity: newQuantity,
        price: newQuantity * selectedPrice,
      };
    });
  };

  const increment = () => {
    setForm((prev) => {
      const newQuantity = prev.quantity + 1;

      return {
        ...prev,
        quantity: newQuantity,
        price: newQuantity * selectedPrice,
      };
    });
  };

  const handleInputChange = (key: string, value: string) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const handleSubmit = () => {
    console.log("Submitting Order:", form);
    alert("Order Placed ");
  };

  const handleModalSubmit = (selectedPerson: string) => {
    setSalesPerson(selectedPerson);
    setForm({
      ...form,
      salesPerson: selectedPerson,
    });
    console.log("Modal returned:", selectedPerson);
  };

  return (
    <SafeAreaProvider style={{ flex: 1, justifyContent: "center" }}>
      <ThemedView style={{ flex: 1, padding: 15 }}>
        <ScrollView keyboardDismissMode="on-drag">
          <Textfield
            label="Name & Surname"
            placeholder="Enter your name and surname"
            autoComplete="name"
            onChangeText={(text) => handleInputChange("name", text)}
          />
          <Textfield
            label="Email Address"
            placeholder="Enter your email address"
            autoComplete="email"
            onChangeText={(text) => handleInputChange("email", text)}
          />
          <Textfield
            label="Phone Number"
            placeholder="Enter your phone number"
            autoComplete="tel"
            onChangeText={(text) => handleInputChange("phone", text)}
          />
          <View style={styles.stepper}>
            <ThemedText style={styles.label}>Quantity</ThemedText>
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <TouchableOpacity style={styles.stepperbtn} onPress={decrement}>
                <ThemedView
                  lightColor="#F3F4F6"
                  darkColor="#2c2c2c"
                  style={styles.stepperbtn}
                >
                  <ThemedText>-</ThemedText>
                </ThemedView>
              </TouchableOpacity>
              <ThemedTextInput
                style={{ marginHorizontal: 10, fontSize: 20 }}
                onChangeText={(text) => {
                  handleInputChange("quantity", text);
                }}
              >
                {form.quantity}
              </ThemedTextInput>
              <TouchableOpacity onPress={increment}>
                <ThemedView
                  lightColor="#F3F4F6"
                  darkColor="#2c2c2c"
                  style={styles.stepperbtn}
                >
                  <ThemedText lightColor="">+</ThemedText>
                </ThemedView>
              </TouchableOpacity>
            </View>
          </View>
          <ThemedText style={styles.label}>Sales Person</ThemedText>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <ThemedView
              darkColor="#2C2C2E"
              lightColor="#F3F4F6"
              style={styles.dropDown}
            >
              <ThemedText style={styles.label}>{salesPerson}</ThemedText>
              <FontAwesome
                style={{ color: "#9CA3AF" }}
                name="chevron-down"
                size={24}
                color="black"
              />
            </ThemedView>
          </TouchableOpacity>
          <SalesPersonModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onSubmit={handleModalSubmit} // Pass the function down
          />
          <ThemedText style={styles.label}>Service</ThemedText>
          {services.map((service, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                select(index);
              }}
            >
              <Radiobutton
                darkColor="#fff"
                lightColor="#2c2c2c"
                value={service}
                isSelected={selected === index}
              />
            </TouchableOpacity>
          ))}
          <View>
            <ThemedText style={styles.label}>Keep Negatives</ThemedText>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={negative}>
                <Radiobutton
                  darkColor="#fff"
                  lightColor="#2c2c2c"
                  value="Yes"
                  isSelected={form.keepNegatives}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={negative}>
                <Radiobutton
                  darkColor="#fff"
                  lightColor="#2c2c2c"
                  value="No"
                  isSelected={!form.keepNegatives}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <ThemedView style={styles.bottomRow}>
          <View style={{ flexDirection: "row" }}>
            <ThemedText style={styles.price}>Total: </ThemedText>
            <ThemedText style={[styles.price, { color: "red" }]}>
              R{form.price}
            </ThemedText>
          </View>
          <TouchableOpacity style={styles.submitbtn} onPress={handleSubmit}>
            <ThemedText style={styles.btnText}>SUBMIT ORDER</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  price: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stepper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stepperText: {},
  stepperbtn: {
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  submitbtn: {
    width: "55%",
    height: 45,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#41B544",
    borderRadius: 15,
    padding: 5,
  },
  btnText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  label: {
    fontSize: 20,
  },
  dropDown: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 45,
    alignItems: "center",
    padding: 5,
    borderRadius: 10,
    borderColor: "#41B544",
    borderWidth: 1,
    marginBottom: 10,
  },
});
