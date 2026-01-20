import Textfield from "@/components/textfield";
import { ThemedText } from "@/components/themed-text";
import { ThemedTextInput } from "@/components/themed-textinput";
import { ThemedView } from "@/components/themed-view";
import { useEffect, useState } from "react";
import { Button, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { SalesPersonModal } from "@/components/salesPersonList";

export default function OrderFormScreen() {
  const [count, setCount] = useState(1);
  const [salesPerson , setSalesPerson] = useState("Please Select Sales Person")
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: 1,
  });

  useEffect(() => {}, [count]);
  const decrement = () => {
    setCount((prev) => Math.max(1, prev - 1));
    setForm({
      ...form,
      quantity: count
    })
  };
  const increment = () => {
    setCount((prev) => prev + 1);
    setForm({
      ...form,
      quantity: count
    })
  };

  const handleInputChange = (key: string, value: string) => {
    setForm({
      ...form,       
      [key]: value   
    });
  };

  const handleSubmit = () => {
    console.log("Submitting Order:", form);
  };

  const openModal = () =>{

  }

  const handleModalSubmit = (selectedPerson: string) => {
    setSalesPerson(selectedPerson);
    console.log("Modal returned:", selectedPerson);
  };

  return (
    <SafeAreaProvider style={{ flex: 1, justifyContent: "center" }}>
      <ThemedView style={{ flex: 1, padding: 20 }}>
        <Textfield
          label="Name & Surname"
          placeholder="Enter your name and surname"
          autoComplete="name"
          onChangeText={(text) => handleInputChange('name', text)}
        />
        <Textfield
          label="Email Address"
          placeholder="Enter your email address"
          autoComplete="email"
           onChangeText={(text) => handleInputChange('email', text)}
        />
        <Textfield
          label="Phone Number"
          placeholder="Enter your phone number"
          autoComplete="tel"
           onChangeText={(text) => handleInputChange('phone', text)}
        />
        <View style={styles.stepper}>
          <ThemedText style={styles.label}>Quantity</ThemedText>
          <View style={{ flexDirection: "row", marginBottom:10}}>
            <TouchableOpacity style={styles.stepperbtn} onPress={decrement}>
              <ThemedText>-</ThemedText>
            </TouchableOpacity>
            <ThemedTextInput style={{ marginHorizontal: 10, fontSize: 20 }}
            onChangeText={(text) => {handleInputChange('quantity', text)}}>
              {count}
            </ThemedTextInput>
            <TouchableOpacity style={styles.stepperbtn} onPress={increment}>
              <ThemedText>+</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
        <ThemedText style={styles.label}>Sales Person</ThemedText>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <ThemedView darkColor="#2C2C2E" lightColor="#F3F4F6" style={styles.dropDown}>
          <ThemedText style={styles.label}>{salesPerson}</ThemedText>
          <FontAwesome style={{color:"#9CA3AF"}}name="chevron-down" size={24} color="black" />
          </ThemedView>
        </TouchableOpacity>
        <SalesPersonModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)}
        onSubmit={handleModalSubmit} // Pass the function down
      />
        <TouchableOpacity style={styles.submitbtn} onPress={handleSubmit}>
          <ThemedText style={styles.btnText}>SUBMIT ORDER</ThemedText>
        </TouchableOpacity>
      
      </ThemedView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  stepper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stepperbtn: {
    width: 25,
    height: 25,
    justifyContent: "center",
    backgroundColor: "#2c2c2c",
    alignItems: "center",
    borderRadius: 5,
  },
  submitbtn: {
    width: "100%",
    height: 45,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#41B544",
    borderRadius: 15,
  },
    btnText:{
    textAlign: "center", 
    fontSize:30,
    fontWeight:"bold",
    lineHeight:40
  },
  label:{
    fontSize:20
  },
  dropDown:{
    flexDirection: "row",
    justifyContent: "space-between",
    height:45,
    alignItems:"center",
    padding: 5,
    borderRadius: 10,
    borderColor: "#41B544",
    borderWidth:1,
    marginBottom: 10
  }
});
