import { db } from "./firebase"; 
import { 
  addDoc,
  collection, 
  getDocs, 
  getDoc,
  doc,
  query, 
  orderBy, 
  serverTimestamp, 
  updateDoc,
  deleteDoc,
  where
} from "firebase/firestore";

// Função para cadastrar pacientes
export async function cadastrarPaciente(data) { 
  try {
    console.log("Dados recebidos para cadastro:", data);
    
    const pacienteData = {
      nome: data.nome || "",
      cpf: data.cpf || "",
      email: data.email || "",
      telefone: data.telefone || "",
      criadoEm: serverTimestamp(),
    };

    const ref = await addDoc(collection(db, "pacientes"), pacienteData);
    return { success: true, id: ref.id };
  } catch (error) {
    console.log("Erro ao cadastrar paciente:", error);
    return { success: false, error };
  }
}

// Função para buscar todos os pacientes
export async function getAllPacientes() {
  try {
    const q = query(collection(db, "pacientes"), orderBy("criadoEm", "desc"));
    const snapshot = await getDocs(q);
    const lista = snapshot.docs.map(doc => {
      const data = doc.data();
      return { 
        id: doc.id, 
        ...data,
        nome: data.nome || "",
        cpf: data.cpf || "",
        email: data.email || "",
        telefone: data.telefone || "",
      };
    });
    return lista;
  } catch (error) {
    console.log("Erro ao buscar pacientes:", error);
    throw error;
  }
}

// Função para buscar paciente por ID
export async function getPacienteById(id) {
  try {
    const docRef = doc(db, "pacientes", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("Paciente não encontrado");
      return null;
    }
  } catch (error) {
    console.log("Erro ao buscar paciente:", error);
    throw error;
  }
}

// Função para excluir um paciente
export async function excluirPaciente(id) {
  try {
    await deleteDoc(doc(db, "pacientes", id));
    return { success: true };
  } catch (error) {
    console.log("Erro ao excluir paciente:", error);
    return { success: false, error };
  }
}

// Função para atualizar os dados de um paciente
export async function atualizarPaciente(id, data) {
  try {
    const docRef = doc(db, "pacientes", id);
    await updateDoc(docRef, {
      ...data,
      atualizadoEm: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.log("Erro ao atualizar paciente:", error);
    return { success: false, error };
  }
}

// Função para buscar paciente por CPF
export async function getPacienteByCpf(cpf) {
  try {
    const q = query(collection(db, "pacientes"), where("cpf", "==", cpf));
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    } else {
      console.log("Paciente não encontrado com CPF:", cpf);
      return null;
    }
  } catch (error) {
    console.log("Erro ao buscar paciente por CPF:", error);
    throw error;
  }
}