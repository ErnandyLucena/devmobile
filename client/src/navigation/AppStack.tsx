import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Tabs } from "./(tabs)/Tabs";
import { NovoAgendamentoScreen } from "../screens/Agendamentos/NovoAgendamento";
import { DetalhesConsultaScreen } from "../screens/Agendamentos/DetalhesConsulta";
import { ReagendarConsultaScreen } from "../screens/Agendamentos/ReagendarConsultas";
import FuncListScreen from "../screens/Funcionarios/Funcionarios/FuncList";
import FuncNovoScreen from "../screens/Funcionarios/Funcionarios/FuncNovo";
import FuncDetalhesScreen from "../screens/Funcionarios/Funcionarios/FuncDetalhes";
import FuncEditarScreen from "../screens/Funcionarios/Funcionarios/FuncEditar";
import MedicosListScreen from "../screens/Funcionarios/Medicos/MedicosList";
import { MedicoNovoScreen } from "../screens/Funcionarios/Medicos/MedicosNovo";
import MedicosDetalhesScreen from "../screens/Funcionarios/Medicos/MedicosDetalhes";
import MedicosEditarScreen from "../screens/Funcionarios/Medicos/MedicosEditar";
import { ConcluirConsultaScreen } from "../screens/Agendamentos/ConcluirConsulta";


const Stack = createNativeStackNavigator();

export function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        headerTintColor: "#2B5BFF",
        headerTitleStyle: {
          fontWeight: "600",
          fontSize: 18,
        },
        headerStyle: {
          backgroundColor: "#fff",
        },
      }}
    >
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{ headerShown: false }}
      />

      {/* ROTAS DE CONSULTAS */}
      <Stack.Screen
        name="NovoAgendamento"
        component={NovoAgendamentoScreen}
        options={{ title: "Novo Agendamento" }}
      />
      <Stack.Screen
        name="DetalhesConsulta"
        component={DetalhesConsultaScreen}
        options={{ title: "Detalhes da Consulta" }}
      />
      <Stack.Screen
        name="ReagendarConsulta"
        component={ReagendarConsultaScreen}
        options={{ title: "Reagendar Consulta" }}
      />
      
      <Stack.Screen
        name="ConcluirConsulta"
        component={ConcluirConsultaScreen}
        options={{ title: "Concluir Consulta" }}
      />

      {/* ROTAS DE FUNCIONÁRIOS */}
      <Stack.Screen
        name="FuncList"
        component={FuncListScreen}
        options={{ title: "Funcionários" }}
      />
      <Stack.Screen
        name="FuncNovo"
        component={FuncNovoScreen}
        options={{ title: "Novo Funcionário" }}
      />
      <Stack.Screen
        name="FuncDetalhes"
        component={FuncDetalhesScreen}
        options={{ title: "Detalhes do Funcionário" }}
      />
      <Stack.Screen
        name="FuncEditar"
        component={FuncEditarScreen}
        options={{ title: "Editar Funcionário" }}
      />

      {/* ROTAS DE MÉDICOS */}
      <Stack.Screen
        name="MedicosList"
        component={MedicosListScreen}
        options={{ title: "Médicos" }}
      />
      <Stack.Screen
        name="MedicosNovo"
        component={MedicoNovoScreen}
        options={{ title: "Novo Médico" }}
      />
      <Stack.Screen
        name="MedicosDetalhes"
        component={MedicosDetalhesScreen}
        options={{ title: "Detalhes do Médico" }}
      />
      <Stack.Screen
        name="MedicosEditar"
        component={MedicosEditarScreen}
        options={{ title: "Editar Médico" }}
      />
    </Stack.Navigator>
  );
}