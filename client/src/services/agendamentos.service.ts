// ------------- agendamentos.service.js CORRIGIDO -------------

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

// Cadastrar agendamento
export async function cadastrarAgendamento(data) { 
  try {
    const payload = {
      cpfPaciente: data.cpfPaciente,
      nomePaciente: data.nomePaciente,
      data: data.data,               // YYYY-MM-DD
      horaInicio: data.horaInicio,   // ISO completo
      horaFim: data.horaFim,         // ISO completo
      observacoes: data.observacoes || "",
      status: data.status || "Confirmado",
      tipoAgendamento: data.tipoAgendamento || "Consulta",
      criadoEm: serverTimestamp(),
    };

    const ref = await addDoc(collection(db, "agendamentos"), payload);

    return { success: true, id: ref.id };
  } catch (error) {
    return { success: false, error };
  }
}

// Buscar todos
export async function getAllAgendamentos() {
  try {
    const q = query(collection(db, "agendamentos"), orderBy("criadoEm", "desc"));
    const snap = await getDocs(q);

    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error;
  }
}

// Buscar por ID
export async function getAgendamentoById(id) {
  const snap = await getDoc(doc(db, "agendamentos", id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

// Atualizar
export async function atualizarAgendamento(id, data) {
  try {
    await updateDoc(doc(db, "agendamentos", id), {
      ...data,
      atualizadoEm: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

// Excluir
export async function excluirAgendamento(id) {
  try {
    await deleteDoc(doc(db, "agendamentos", id));
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

export async function getInfoPanels() {
  try {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    // Agendamentos deste mês
    const agendamentosSnapshot = await getDocs(collection(db, "agendamentos"));
    const agendamentos = agendamentosSnapshot.docs.map(doc => doc.data());

    const agendamentosEsteMes = agendamentos.filter(a => {
      const data = new Date(a.data);
      return data >= firstDayOfMonth && data <= lastDayOfMonth;
    });

    // Pacientes atendidos
    const consultasSnapshot = await getDocs(collection(db, "consultas"));
    const consultas = consultasSnapshot.docs.map(doc => doc.data());
    const pacientesAtendidos = consultas.filter(c => c.status === "Concluido");

    // Reconsultas agendadas
    const reconsultas = agendamentos.filter(a => a.tipoAgendamento === "Reconsulta");

    return [
      { label: "Agendamento\neste mês", value: agendamentosEsteMes.length.toString() },
      { label: "Pacientes\natendidos", value: pacientesAtendidos.length.toString() },
      { label: "Reconsultas\nagendadas", value: reconsultas.length.toString() },
    ];

  } catch (error) {
    console.log("Erro ao gerar painéis:", error);
    return [];
  }
}

