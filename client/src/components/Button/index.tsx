import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";

type Props = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
};

export function Button({ title, onPress, variant = "primary" }: Props) {
  return (
    <TouchableOpacity
      style={[styles.button, variant === "secondary" && styles.secondary]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, variant === "secondary" && styles.secondaryText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}