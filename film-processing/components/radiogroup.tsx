import { TouchableOpacity } from "react-native";
import { Radiobutton, type ButtonProp } from "./radiobutton";
import { useState } from "react";


export function Radiogroup() {
    const [selected, setSelected] = useState(0);
  const services = [
    "Email in High Resolution",
    "Email in low Resolution",
    "Print Only",
    "Print and email",
    "Develop only",
  ];

  function select(index: number){
    setSelected(index);
  }

  return(
   services.map((service,index) =>(
        <TouchableOpacity key={index} onPress={()=>{
            select(index);
        }}>
            <Radiobutton darkColor="#fff" lightColor="#2c2c2c" value={service} isSelected={selected === index} />
        </TouchableOpacity>
   ))
  );
}
