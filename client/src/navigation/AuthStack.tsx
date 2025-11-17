import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InitialScreen from "../screens/Initial";
import LoginScreen from "../screens/Login";
import RegisterScreen from "../screens/Register";
import { AgendamentosScreen } from "../screens/Agendamento";
import { NovoAgendamentoScreen } from "../screens/NovoAgendamento";

const Stack = createNativeStackNavigator();

export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Initial" component={InitialScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}
