import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InitialScreen from "../screens/(auth)/Initial";
import LoginScreen from "../screens/(auth)/Login"; 
import RegisterScreen from "../screens/(auth)/Register"; 

const Stack = createNativeStackNavigator();

export function AuthStack() {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: true,
        headerBackTitle: "Voltar", 
        headerTintColor: "#2B5BFF", 
        headerTitleAlign: "center", 
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
        headerStyle: {
          backgroundColor: "#fff",
        },
      }}
    >
      <Stack.Screen 
        name="Initial" 
        component={InitialScreen} 
        options={{ 
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ 
          title: "Entrar"
        }} 
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen} 
        options={{ 
          title: "Registrar-se" 
        }} 
      />
    </Stack.Navigator>
  );
}