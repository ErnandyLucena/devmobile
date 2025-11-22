import { auth } from "../../services/firebase"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../../types/(auth)/User";

export async function logoutUser(
  setUser: (user: User | null) => void
) {
  try {
    await auth.signOut();
    setUser(null);
    await AsyncStorage.removeItem("@user");
    console.log("✅ Logout realizado com sucesso");
  } catch (error) {
    console.log("❌ Erro ao fazer logout:", error);
    throw new Error("Erro ao sair da conta.");
  }
}