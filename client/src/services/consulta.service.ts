// consulta.service.js
import { db } from "./firebase";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";

// Salvar consulta concluída
async function concluirConsulta(data) {
  try {
    // Sempre garantir CPF somente números
    if (data.cpfPaciente) {
      data.cpfPaciente = data.cpfPaciente.replace(/\D/g, "");
    }

    await addDoc(collection(db, "consultas"), data);
    return { success: true };
  } catch (error) {
    console.log("Erro ao concluir consulta:", error);
    return { success: false, error };
  }
}

// Buscar histórico pelo CPF do paciente
export async function getHistoricoByPacienteCpf(cpfPaciente) {
  try {
    const cpfFormatado = cpfPaciente.replace(/\D/g, "");

    const q = query(
      collection(db, "consultas"),
      where("cpfPaciente", "==", cpfFormatado)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => {
      const data = doc.data();

      return {
        id: doc.id,
        ...data,
        dataConclusao: data.dataConclusao
          ? new Date(data.dataConclusao)
          : null
      };
    });

  } catch (error) {
    console.log("Erro ao buscar histórico:", error);
    return [];
  }
}

export const consultaService = {
  concluirConsulta,
  getHistoricoByPacienteCpf
};
