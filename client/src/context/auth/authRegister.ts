import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../services/firebase"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RegisterData } from "../../types/(auth)/RegisterData";
import { User } from "../../types/(auth)/User";
import { checkCPFExists, checkEmailExists } from "./authUtils";

export async function registerUser(
  dados: RegisterData,
  setUser: (user: User | null) => void,
  setLoading: (loading: boolean) => void
) {
  setLoading(true);

  try {
    const { nome, email, senha, tipo, cpf, ...extras } = dados;
    const emailLower = email.toLowerCase();
    const cpfClean = cpf.replace(/\D/g, '');

    console.log("📝 Iniciando registro:", { email: emailLower, cpf: cpfClean, tipo });

    // 1. Verificar se CPF existe
    const cpfCheck = await checkCPFExists(cpfClean);
    
    if (!cpfCheck.exists) {
      throw new Error("CPF não cadastrado no sistema. Contate um funcionário para realizar seu cadastro.");
    }

    // 2. Verificar se email já existe
    const emailExists = await checkEmailExists(emailLower);
    if (emailExists) {
      throw new Error("Email já cadastrado no sistema.");
    }

    // 3. Verificar se o tipo corresponde
    if (cpfCheck.collection !== (tipo === "medico" ? "medicos" : "funcionarios")) {
      throw new Error(`Este CPF está cadastrado como ${cpfCheck.collection === "medicos" ? "médico" : "funcionário"}. Selecione o tipo correto.`);
    }

    // 4. Criar conta no Auth
    const userCred = await createUserWithEmailAndPassword(auth, emailLower, senha);
    const uid = userCred.user.uid;

    console.log("✅ Conta Auth criada com UID:", uid);

    // 5. Atualizar documento no Firestore
    const userData = {
      ...cpfCheck.data,
      email: emailLower,
      uid: uid,
      situacao: ["Ativo"],
      dataCriacaoConta: new Date()
    };

    await setDoc(doc(db, cpfCheck.collection!, cpfCheck.data.uid || uid), userData);

    console.log("✅ Dados salvos no Firestore");

    // 6. Salvar no state e AsyncStorage
    const userToSave = {
      ...userData,
      tipo: tipo
    };

    await AsyncStorage.setItem("@user", JSON.stringify(userToSave));
    setUser(userToSave);

    console.log("✅ Registro concluído com sucesso");

    return userToSave;

  } catch (error: any) {
    console.log("❌ Erro ao registrar:", error);
    throw new Error(error.message || "Erro ao registrar usuário.");
  } finally {
    setLoading(false);
  }
}