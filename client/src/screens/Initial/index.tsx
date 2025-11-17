import React from "react";
import { View, Text, Image } from "react-native";
import { Button } from "../../components/Button";
import { styles } from "./styles"; 
import image from "../../../assets/doctors.png"

export default function InitialScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Image
        source={image}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>Bem-vindo</Text>

      <Text style={styles.subtitle}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Donec euismod, nisi vel consectetur.
      </Text>

      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={() => navigation.navigate("Login")} />
        <Button
          title="Registrar-se"
          variant="secondary"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </View>
  );
}