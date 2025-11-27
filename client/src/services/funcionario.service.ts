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
} from "firebase/firestore";

export async function cadastrarFuncionario(data) {
  try {
    console.log("📌 Dados recebidos para cadastro:", data);

    const funcionarioData = {
      nomeCompleto: data.nomeCompleto || "",
      cargo: data.cargo || "",
      setor: data.setor || "",
      cpf: data.cpf || "",
      tel: data.tel || "",
      email: data.email || "",
      tipo: "funcionario",
      situacao: data.situacao || "Ativo", // MUDANÇA: String em vez de array
      dataAdmissao: data.dataAdmissao || serverTimestamp(),
      criadoEm: serverTimestamp(),
    };

    const ref = await addDoc(collection(db, "funcionarios"), funcionarioData);
    return { success: true, id: ref.id };

  } catch (error) {
    console.log("❌ Erro ao cadastrar funcionário:", error);
    return { success: false, error };
  }
}

export async function getAllFuncionarios() {
  try {
    const q = query(collection(db, "funcionarios"), orderBy("criadoEm", "desc"));
    const snapshot = await getDocs(q);

    const lista = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      situacao: doc.data().situacao || "Ativo" // Garantir que sempre tenha situacao
    }));

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
      return { 
        id: snap.id, 
        ...data,
        situacao: data.situacao || "Ativo" // Garantir situacao
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
    const docRef = doc(db, "funcionarios", id);
    await updateDoc(docRef, {
      ...data,
      atualizadoEm: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.log("❌ Erro ao atualizar funcionário:", error);
    return { success: false, error };
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

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      situacao: doc.data().situacao || "Ativo"
    }));

  } catch (error) {
    console.log("❌ Erro ao buscar funcionários:", error);
    throw error;
  }
}