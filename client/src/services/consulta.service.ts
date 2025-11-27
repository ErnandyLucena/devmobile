import { db } from "./firebase";
import { 
  addDoc, 
  collection, 
  query, 
  where, 
  orderBy, 
  getDocs 
} from "firebase/firestore";

// Salvar consulta concluída
async function concluirConsulta(data) {
  try {
    await addDoc(collection(db, "consultas"), data);
    return { success: true };
  } catch (error) {
    console.log("Erro ao concluir consulta:", error);
    return { success: false, error };
  }
}

// Buscar histórico pelo CPF do paciente
export async function getHistoricoByPacienteId(pacienteId: string) {
  try {
    const q = query(
      collection(db, "consultas"),
      where("pacienteId", "==", pacienteId)
    );

    const snapshot = await getDocs(q);

    const lista = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return lista;

  } catch (error) {
    console.log("Erro ao buscar histórico:", error);
    return [];
  }
}


// Exportando no objeto service
export const consultaService = {
  concluirConsulta,
  getHistoricoByPacienteId
};
