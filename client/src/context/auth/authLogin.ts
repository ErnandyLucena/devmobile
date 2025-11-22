import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase"; 
import { loadUserData } from "./authUtils";
import { User } from "../../types/(auth)/User";

export async function loginUser(
  email: string, 
  password: string, 
  setUser: (user: User | null) => void,
  setLoading: (loading: boolean) => void
) {
  setLoading(true);

  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    const userData = await loadUserData(email, setUser);
    
    if (!userData) {
      throw new Error("USER_NOT_FOUND");
    }

    return userData;

  } catch (error: any) {
    console.log("Erro no login:", error);
    
    if (error.code === 'auth/user-not-found') {
      throw new Error("Usuário não encontrado.");
    } else if (error.code === 'auth/wrong-password') {
      throw new Error("Senha incorreta.");
    } else if (error.code === 'auth/invalid-email') {
      throw new Error("Email inválido.");
    } else {
      throw new Error("Erro ao fazer login. Tente novamente.");
    }
  } finally {
    setLoading(false);
  }
}