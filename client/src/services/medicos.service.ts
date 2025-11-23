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

export async function cadastrarMedico(data) { 
  try {
    console.log("Dados recebidos para cadastro:", data);
    
    const medicoData = {
      nmPrestador: data.nmPrestador || "",
      nmMnemonico: data.nmMnemonico || "",
      dsCodigoConselho: data.dsCodigoConselho || "",
      dsCRM: data.dsCRM || "",
      dsEmail: data.dsEmail || "",
      especialidade: data.especialidade || "",
      situacao: data.situacao || "Ativo", 
      criadoEm: serverTimestamp(),
    };

    const ref = await addDoc(collection(db, "medicos"), medicoData);
    return { success: true, id: ref.id };
  } catch (error) {
    console.log("Erro ao cadastrar médico:", error);
    return { success: false, error };
  }
}

// Função para buscar todos os médicos
export async function getAllMedicos() {
  try {
    const q = query(collection(db, "medicos"), orderBy("criadoEm", "desc"));
    const snapshot = await getDocs(q);
    const lista = snapshot.docs.map(doc => {
      const data = doc.data();
      return { 
        id: doc.id, 
        ...data,
        situacao: data.situacao || "Ativo" 
      };
    });
    return lista;
  } catch (error) {
    console.log("Erro ao buscar médicos:", error);
    throw error;
  }
}

// Função para buscar médicos por ID
export async function getMedicoById(id) {
  try {
    const docRef = doc(db, "medicos", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return { 
        id: docSnap.id, 
        ...data,
        situacao: data.situacao || "Ativo"
      };
    } else {
      console.log("Médico não encontrado");
      return null;
    }
  } catch (error) {
    console.log("Erro ao buscar médico:", error);
    throw error;
  }
}

// Função para excluir um médico
export async function excluirMedico(id) {
  try {
    await deleteDoc(doc(db, "medicos", id));
    return { success: true };
  } catch (error) {
    console.log("Erro ao excluir médico:", error);
    return { success: false, error };
  }
}

// Função para atualizar os dados de um médico
export async function atualizarMedico(id, data) {
  try {
    const docRef = doc(db, "medicos", id);
    await updateDoc(docRef, {
      ...data,
      atualizadoEm: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.log("Erro ao atualizar médico:", error);
    return { success: false, error };
  }
}

// Função de busca de médicos com base em um ou mais parâmetros
export async function searchMedicos(queryParams) {
  try {
    const { searchText } = queryParams;

    let q = query(collection(db, "medicos"));

    if (searchText) {
      const lowerSearchText = searchText.toLowerCase();
      q = query(
        collection(db, "medicos"),
        where("nmPrestador", ">=", lowerSearchText),
        where("nmPrestador", "<=", lowerSearchText + '\uf8ff')
      );
    }

    const snapshot = await getDocs(q);
    const filteredMedicos = snapshot.docs.map(doc => {
      const data = doc.data();
      return { 
        id: doc.id, 
        ...data,
        situacao: data.situacao || "Ativo"
      };
    });

    return filteredMedicos;
  } catch (error) {
    console.log("Erro ao buscar médicos:", error);
    throw error;
  }
}