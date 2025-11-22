import { View, Text, TouchableOpacity, ScrollView, StatusBar } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from "../../context/auth/AuthContext";
import { Header } from "../../components/Header";
import { styles } from "./styles";

export function ProfileScreen() {
  const { logout, user } = useAuth();
  const nome = user?.nomeCompleto || user?.nomeComplete || user?.nomeAbreviado || "Usuário";
  const email = user?.email || "—";
  const telefone = user?.tel || user?.telefone || "—";
  const cpf = user?.cpf || "—";
  const status = user?.situacao?.[0] || "Ativo";
  const statusColor = status === "Ativo" ? "#48BB78" : "#E53E3E";
  const codigoConselho = user?.codigoConselho || user?.crm || "—";
  const especialidade = user?.especialidade || "—";
  const cargo = user?.cargo || "—";
  const setor = user?.setor || "—";

  const getDataAdmissao = () => {
    if (user?.dataAdmissao) {
      return user.dataAdmissao.toDate?.().toLocaleDateString('pt-BR') || "—";
    }
    if (user?.dataCriacao) {
      return user.dataCriacao.toDate?.().toLocaleDateString('pt-BR') || "—";
    }
    return "—";
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" /> {/* Alterado para branco igual Home */}
      
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Header />
        
        <View style={styles.userCard}>
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Informações Pessoais</Text>

            <View style={styles.infoGroup}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Nome</Text>
                <View style={styles.infoValueContainer}>
                  <Text style={styles.infoValue}>{nome}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Email</Text>
                <View style={styles.infoValueContainer}>
                  <Text style={styles.infoValue}>{email}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>CPF</Text>
                <View style={styles.infoValueContainer}>
                  <Text style={styles.infoValue}>{cpf}</Text>
                </View>
              </View>

              {user?.tipo === "funcionario" && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Data de Admissão</Text>
                  <View style={styles.infoValueContainer}>
                    <Text style={styles.infoValue}>{getDataAdmissao()}</Text>
                  </View>
                </View>
              )}
            </View>
          </View>

          {user?.tipo === "medico" && (
            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Informações Profissionais</Text>

              <View style={styles.infoGroup}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>CRM</Text>
                  <View style={styles.infoValueContainer}>
                    <Text style={styles.infoValue}>{codigoConselho}</Text>
                  </View>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Especialidade</Text>
                  <View style={styles.infoValueContainer}>
                    <Text style={styles.infoValue}>{especialidade}</Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          {user?.tipo === "funcionario" && (
            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Informações de Trabalho</Text>

              <View style={styles.infoGroup}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Cargo</Text>
                  <View style={styles.infoValueContainer}>
                    <Text style={styles.infoValue}>{cargo}</Text>
                  </View>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Setor</Text>
                  <View style={styles.infoValueContainer}>
                    <Text style={styles.infoValue}>{setor}</Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Informações de Contato</Text>

            <View style={styles.infoGroup}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Telefone</Text>
                <View style={styles.infoValueContainer}>
                  <Text style={styles.infoValue}>{telefone}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Status</Text>
                <View style={styles.infoValueContainer}>
                  <Text style={styles.infoValue}>{status}</Text>
                  <View
                    style={[
                      styles.statusDot,
                      { backgroundColor: statusColor }
                    ]}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Ionicons name="log-out-outline" size={20} color="#E53E3E" />
          <Text style={styles.logoutButtonText}>Sair da Conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}