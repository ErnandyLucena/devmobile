import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../../types/(auth)/User";


// ===============================================
// 📌 CARREGAR USUÁRIO POR E-MAIL (FUNCIONÁRIO / MÉDICO)
// ===============================================
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

    // Salvar no asyncStorage
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



// ===============================================
// 📌 VERIFICAR SE CPF EXISTE (FUNCIONÁRIO OU MÉDICO)
//     → FUNCIONA MESMO SE O CPF NO BANCO ESTIVER COM MÁSCARA
// ===============================================
export async function checkCPFExists(cpf: string): Promise<{ exists: boolean; data?: any; collection?: string }> {
  try {
    const cpfClean = cpf.replace(/\D/g, ""); // limpa o digitado

    // Função auxiliar para verificar coleção
    async function checkCollection(collectionName: string) {
      const snapshot = await getDocs(collection(db, collectionName));

      for (const docSnap of snapshot.docs) {
        const data = docSnap.data();

        if (!data.cpf) continue;

        const cpfBancoClean = data.cpf.replace(/\D/g, ""); // limpa máscara do Firebase

        if (cpfBancoClean === cpfClean) {
          return {
            exists: true,
            data,
            collection: collectionName
          };
        }
      }

      return { exists: false };
    }

    // Verificar funcionário
    const funcResult = await checkCollection("funcionarios");
    if (funcResult.exists) return funcResult;

    // Verificar médico
    const medResult = await checkCollection("medicos");
    if (medResult.exists) return medResult;

    return { exists: false };

  } catch (error) {
    console.log("Erro ao verificar CPF:", error);
    return { exists: false };
  }
}



// ===============================================
// 📌 VERIFICAR SE EMAIL EXISTE
// ===============================================
export async function checkEmailExists(email: string): Promise<boolean> {
  try {
    const emailLower = email.toLowerCase();

    // Funcionário
    const qFunc = query(
      collection(db, "funcionarios"),
      where("email", "==", emailLower)
    );
    const snapFunc = await getDocs(qFunc);

    if (!snapFunc.empty) return true;

    // Médico
    const qMed = query(
      collection(db, "medicos"),
      where("email", "==", emailLower)
    );
    const snapMed = await getDocs(qMed);

    if (!snapMed.empty) return true;

    return false;

  } catch (error) {
    console.log("Erro ao verificar email:", error);
    return false;
  }
}

