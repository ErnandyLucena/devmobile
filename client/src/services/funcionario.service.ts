// services/funcionario.service.js
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
  where,
  Timestamp
} from "firebase/firestore";

// Função para converter data BR para Timestamp do Firestore
const parseDataBRToTimestamp = (dataBR) => {
  if (!dataBR || dataBR.length !== 10) return null;
  
  try {
    const [day, month, year] = dataBR.split('/');
    const date = new Date(year, month - 1, day); // mês é 0-indexed no JavaScript
    
    if (isNaN(date.getTime())) {
      console.log("❌ Data inválida:", dataBR);
      return null;
    }
    
    return Timestamp.fromDate(date);
  } catch (error) {
    console.log("❌ Erro ao converter data:", error);
    return null;
  }
};

// Função para converter Timestamp para data BR
export const formatTimestampToBR = (timestamp) => {
  if (!timestamp) return '';
  
  try {
    const date = timestamp.toDate();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  } catch (error) {
    console.log("❌ Erro ao formatar timestamp:", error);
    return '';
  }
};

export async function cadastrarFuncionario(data) {
  try {
    console.log("📌 Dados recebidos para cadastro:", data);

    // Converter dataAdmissao de BR para Timestamp
    const dataAdmissaoTimestamp = data.dataAdmissao 
      ? parseDataBRToTimestamp(data.dataAdmissao)
      : null;

    console.log("📅 Data convertida:", {
      original: data.dataAdmissao,
      timestamp: dataAdmissaoTimestamp
    });

    const funcionarioData = {
      nomeCompleto: data.nomeCompleto || "",
      cargo: data.cargo || "",
      setor: data.setor || "",
      cpf: data.cpf || "",
      tel: data.tel || "",
      email: data.email || "",
      tipo: "funcionario",
      situacao: data.situacao || "Ativo",
      dataAdmissao: dataAdmissaoTimestamp || serverTimestamp(), // Usar Timestamp ou serverTimestamp
      criadoEm: serverTimestamp(),
    };

    console.log("📤 Dados a serem salvos no Firestore:", funcionarioData);

    const ref = await addDoc(collection(db, "funcionarios"), funcionarioData);
    
    console.log("✅ Funcionário cadastrado com ID:", ref.id);
    return { success: true, id: ref.id };

  } catch (error) {
    console.log("❌ Erro ao cadastrar funcionário:", error);
    return { success: false, error: error.message };
  }
}

export async function getAllFuncionarios() {
  try {
    const q = query(collection(db, "funcionarios"), orderBy("criadoEm", "desc"));
    const snapshot = await getDocs(q);

    const lista = snapshot.docs.map(doc => {
      const data = doc.data();
      
      // Converter Timestamp para data BR
      const dataAdmissaoBR = data.dataAdmissao 
        ? formatTimestampToBR(data.dataAdmissao)
        : '';

      return {
        id: doc.id,
        ...data,
        dataAdmissao: dataAdmissaoBR, // Manter como string BR para exibição
        dataAdmissaoTimestamp: data.dataAdmissao, // Manter o timestamp original
        situacao: data.situacao || "Ativo"
      };
    });

    return lista;
  } catch (error) {
    console.log("❌ Erro ao buscar funcionários:", error);
    throw error;
  }
}

export async function getFuncionarioById(id) {
  try {
    const ref = doc(db, "funcionarios", id);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      const data = snap.data();
      
      // Converter Timestamp para data BR
      const dataAdmissaoBR = data.dataAdmissao 
        ? formatTimestampToBR(data.dataAdmissao)
        : '';

      return { 
        id: snap.id, 
        ...data,
        dataAdmissao: dataAdmissaoBR, // Para exibição no formulário
        dataAdmissaoTimestamp: data.dataAdmissao, // Timestamp original
        situacao: data.situacao || "Ativo"
      };
    }

    console.log("⚠ Funcionário não encontrado");
    return null;

  } catch (error) {
    console.log("❌ Erro ao buscar funcionário:", error);
    throw error;
  }
}

export async function excluirFuncionario(id) {
  try {
    await deleteDoc(doc(db, "funcionarios", id));
    return { success: true };

  } catch (error) {
    console.log("❌ Erro ao excluir funcionário:", error);
    return { success: false, error };
  }
}

export async function atualizarFuncionario(id, data) {
  try {
    // Converter dataAdmissao de BR para Timestamp se existir
    const dataAdmissaoTimestamp = data.dataAdmissao 
      ? parseDataBRToTimestamp(data.dataAdmissao)
      : data.dataAdmissaoTimestamp; // Manter o timestamp original se não houver nova data

    const updateData = {
      ...data,
      dataAdmissao: dataAdmissaoTimestamp,
      atualizadoEm: serverTimestamp()
    };

    // Remover campos auxiliares
    delete updateData.dataAdmissaoTimestamp;

    console.log("📤 Dados para atualização:", updateData);

    const docRef = doc(db, "funcionarios", id);
    await updateDoc(docRef, updateData);
    
    return { success: true };
  } catch (error) {
    console.log("❌ Erro ao atualizar funcionário:", error);
    return { success: false, error: error.message };
  }
}

export async function searchFuncionarios({ searchText }) {
  try {
    if (!searchText) {
      return getAllFuncionarios();
    }

    const text = searchText.toLowerCase();

    const q = query(
      collection(db, "funcionarios"),
      where("nomeCompleto", ">=", text),
      where("nomeCompleto", "<=", text + "\uf8ff")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => {
      const data = doc.data();
      
      // Converter Timestamp para data BR
      const dataAdmissaoBR = data.dataAdmissao 
        ? formatTimestampToBR(data.dataAdmissao)
        : '';

      return {
        id: doc.id,
        ...data,
        dataAdmissao: dataAdmissaoBR,
        dataAdmissaoTimestamp: data.dataAdmissao,
        situacao: data.situacao || "Ativo"
      };
    });

  } catch (error) {
    console.log("❌ Erro ao buscar funcionários:", error);
    throw error;
  }
}