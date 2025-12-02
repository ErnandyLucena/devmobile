import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../../types/(auth)/User";

export async function loadUserData(email: string, setUser: (user: User | null) => void) {
  try {
    let userData: any = null;
    const emailLower = email.toLowerCase();

    // Buscar funcionário
    const qFunc = query(
      collection(db, "funcionarios"),
      where("email", "==", emailLower)
    );
    const snapFunc = await getDocs(qFunc);

    if (!snapFunc.empty) {
      userData = {
        ...snapFunc.docs[0].data(),
        uid: snapFunc.docs[0].id,
        tipo: "funcionario",
      };
    }

    // Buscar médico
    if (!userData) {
      const qMed = query(
        collection(db, "medicos"),
        where("dsEmail", "==", emailLower) // <-- CORREÇÃO AQUI
      );
      const snapMed = await getDocs(qMed);

      if (!snapMed.empty) {
        userData = {
          ...snapMed.docs[0].data(),
          uid: snapMed.docs[0].id,
          tipo: "medico",
        };
      }
    }

    if (userData) {
      await AsyncStorage.setItem("@user", JSON.stringify(userData));
      setUser(userData);
    }

    return userData;
    
  } catch (error) {
    console.log("Erro ao carregar dados:", error);
    return null;
  }
}
