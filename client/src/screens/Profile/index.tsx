import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, StatusBar } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from "../../context/AuthContext"; 
import { Header } from "../../components/Header";
import { styles } from "./styles";

export function ProfileScreen() {
  const { logout, user } = useAuth();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7FAFC" />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Header />
        
        {/* Espaçamento entre Header e conteúdo */}
        <View style={styles.headerSpacing} />
        
        {/* Card do Usuário */}
        <View style={styles.userCard}>
          <View style={styles.avatarSection}>
            <View style={styles.userInfo}>
              <View style={styles.specialtyBadge}>
                <Text style={styles.specialtyText}>Ortopedista</Text>
              </View>
            </View>
          </View>

          {/* Informações Profissionais */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Informações Profissionais</Text>
            
            <View style={styles.infoGroup}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>CRM</Text>
                <View style={styles.infoValueContainer}>
                  <Text style={styles.infoValue}>343535</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Especialidade</Text>
                <View style={styles.infoValueContainer}>
                  <Text style={styles.infoValue}>Ortopedista</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Registro</Text>
                <View style={styles.infoValueContainer}>
                  <Text style={styles.infoValue}>Ativo</Text>
                  <View style={[styles.statusDot, styles.statusActive]} />
                </View>
              </View>
            </View>
          </View>

          {/* Informações de Contato */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Informações de Contato</Text>
            
            <View style={styles.infoGroup}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Email</Text>
                <View style={styles.infoValueContainer}>
                  <Text style={styles.infoValue}>gabriela.borba@clinica.com</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Telefone</Text>
                <View style={styles.infoValueContainer}>
                  <Text style={styles.infoValue}>(11) 99999-9999</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Botão de Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Ionicons name="log-out-outline" size={20} color="#E53E3E" />
          <Text style={styles.logoutButtonText}>Sair da Conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

