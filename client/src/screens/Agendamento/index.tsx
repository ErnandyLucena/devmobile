import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { Header } from "../../components/Header";
import { AppointmentCard } from "../../components/AppointmentCard";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Mock data - substitua pela sua API real
const mockAgendamentos = [
    {
        id: 1,
        data: "2024-01-15",
        horaInicio: "10:00",
        horaFim: "10:30",
        status: "Confirmado",
        tipoAgendamento: "Consulta",
        observacoes: "Primeira consulta",
        paciente: {
            idPaciente: 678,
            nome: "Emanuelle Luciana"
        }
    },
    {
        id: 2,
        data: "2024-01-15",
        horaInicio: "11:00",
        horaFim: "11:30",
        status: "Pendente",
        tipoAgendamento: "Retorno",
        observacoes: "Acompanhamento pós-cirurgia",
        paciente: {
            idPaciente: 679,
            nome: "Carlos Silva"
        }
    }
];

type RootStackParamList = {
    Tabs: undefined;
    NovoAgendamento: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function AgendamentosScreen() {
    const navigation = useNavigation<NavigationProp>();

    const handleNovoAgendamento = () => {
        navigation.navigate("NovoAgendamento"); 
    };


    return (
        <View style={styles.container}>
            <Header />

            <ScrollView style={styles.scrollView}>
                {/* Header com título e botão Novo */}
                <View style={styles.header}>
                    <Text style={styles.title}>Agendamentos</Text>
                    <TouchableOpacity
                        style={styles.novoButton}
                        onPress={handleNovoAgendamento}
                    >
                        <Text style={styles.novoButtonText}>Novo</Text>
                    </TouchableOpacity>
                </View>

                {/* Lista de Agendamentos */}
                <View style={styles.agendamentosList}>
                    {mockAgendamentos.map((agendamento) => (
                        <AppointmentCard
                            key={agendamento.id}
                            hour={agendamento.horaInicio}
                            title={agendamento.tipoAgendamento}
                            patient={agendamento.paciente.nome}
                            status={agendamento.status}
                            showStatus={true}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}