import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../../types/(auth)/User";

export async function loadUserData(email: string, setUser: (user: User | null) => void) {
  try {
    let userData: any = null;
    const emailLower = email.toLowerCase();

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

    if (!userData) {
      const qMed = query(
        collection(db, "medicos"),
        where("email", "==", emailLower)
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

export async function checkCPFExists(cpf: string): Promise<{ exists: boolean; data?: any; collection?: string }> {
  try {
    const cpfClean = cpf.replace(/\D/g, '');

    const qFunc = query(
      collection(db, "funcionarios"),
      where("cpf", "==", cpfClean)
    );
    const snapFunc = await getDocs(qFunc);

    if (!snapFunc.empty) {
      return { 
        exists: true, 
        data: snapFunc.docs[0].data(),
        collection: "funcionarios"
      };
    }

    const qMed = query(
      collection(db, "medicos"),
      where("cpf", "==", cpfClean)
    );
    const snapMed = await getDocs(qMed);

    if (!snapMed.empty) {
      return { 
        exists: true, 
        data: snapMed.docs[0].data(),
        collection: "medicos"
      };
    }

    return { exists: false };
  } catch (error) {
    console.log("Erro ao verificar CPF:", error);
    return { exists: false };
  }
}

export async function checkEmailExists(email: string): Promise<boolean> {
  try {
    const emailLower = email.toLowerCase();


    const qFunc = query(
      collection(db, "funcionarios"),
      where("email", "==", emailLower)
    );
    const snapFunc = await getDocs(qFunc);

    if (!snapFunc.empty) {
      return true;
    }

    const qMed = query(
      collection(db, "medicos"),
      where("email", "==", emailLower)
    );
    const snapMed = await getDocs(qMed);

    if (!snapMed.empty) {
      return true;
    }

    return false;
  } catch (error) {
    console.log("Erro ao verificar email:", error);
    return false;
  }
}