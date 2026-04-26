import { TextInput, type TextInputProps } from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedTextInputProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const placeholderColor = "#9CA3AF";
  const backgroundColor = useThemeColor(
    { light: "#F3F4F6", dark: "#2C2C2E" },
    "background",
  );

  return (
    <TextInput
      style={[{ color, backgroundColor }, style]}
      placeholderTextColor={placeholderColor}
      {...otherProps}
    />
  );
}
