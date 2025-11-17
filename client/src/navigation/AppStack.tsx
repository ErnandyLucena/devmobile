import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Tabs } from "./(tabs)/Tabs";
import { NovoAgendamentoScreen } from "../screens/NovoAgendamento"; 

const Stack = createNativeStackNavigator();

export function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="Agendamentos" component={Tabs} />
      <Stack.Screen name="NovoAgendamento" component={NovoAgendamentoScreen} />
    </Stack.Navigator>
  );
}