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

// Função para cadastrar agendamentos
export async function cadastrarAgendamento(data) { 
  try {
    console.log("Dados recebidos para agendamento:", data);
    
    const agendamentoData = {
      cpfPaciente: data.cpfPaciente || "",
      nomePaciente: data.nomePaciente || "",
      data: data.data || "",
      horaInicio: data.horaInicio || "",
      horaFim: data.horaFim || "",
      observacoes: data.observacoes || "",
      status: data.status || "Confirmado",
      tipoAgendamento: data.tipoAgendamento || "Consulta",
      criadoEm: serverTimestamp(),
    };

    const ref = await addDoc(collection(db, "agendamentos"), agendamentoData);
    return { success: true, id: ref.id };
  } catch (error) {
    console.log("Erro ao cadastrar agendamento:", error);
    return { success: false, error };
  }
}

export async function getAllAgendamentos() {
  try {
    const q = query(collection(db, "agendamentos"), orderBy("criadoEm", "desc"));
    const snapshot = await getDocs(q);
    const lista = snapshot.docs.map(doc => {
      const data = doc.data();
      return { 
        id: doc.id, 
        ...data,
        cpfPaciente: data.cpfPaciente || "",
        nomePaciente: data.nomePaciente || "",
        data: data.data || "",
        horaInicio: data.horaInicio || "",
        horaFim: data.horaFim || "",
        observacoes: data.observacoes || "",
        status: data.status || "Confirmado",
        tipoAgendamento: data.tipoAgendamento || "Consulta",
      };
    });
    return lista;
  } catch (error) {
    console.log("Erro ao buscar agendamentos:", error);
    throw error;
  }
}

export async function getAgendamentoById(id) {
  try {
    const docRef = doc(db, "agendamentos", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("Agendamento não encontrado");
      return null;
    }
  } catch (error) {
    console.log("Erro ao buscar agendamento:", error);
    throw error;
  }
}

export async function getAgendamentosByPaciente(cpfPaciente) {
  try {
    const q = query(
      collection(db, "agendamentos"), 
      where("cpfPaciente", "==", cpfPaciente),
      orderBy("data", "desc")
    );
    const snapshot = await getDocs(q);
    const lista = snapshot.docs.map(doc => {
      const data = doc.data();
      return { id: doc.id, ...data };
    });
    return lista;
  } catch (error) {
    console.log("Erro ao buscar agendamentos:", error);
    throw error;
  }
}

export async function excluirAgendamento(id) {
  try {
    await deleteDoc(doc(db, "agendamentos", id));
    return { success: true };
  } catch (error) {
    console.log("Erro ao excluir agendamento:", error);
    return { success: false, error };
  }
}

export async function atualizarAgendamento(id, data) {
  try {
    const docRef = doc(db, "agendamentos", id);
    await updateDoc(docRef, {
      ...data,
      atualizadoEm: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.log("Erro ao atualizar agendamento:", error);
    return { success: false, error };
  }
}

export async function getAgendamentosByStatus(status) {
  try {
    const q = query(
      collection(db, "agendamentos"), 
      where("status", "==", status),
      orderBy("data", "asc")
    );
    const snapshot = await getDocs(q);
    const lista = snapshot.docs.map(doc => {
      const data = doc.data();
      return { id: doc.id, ...data };
    });
    return lista;
  } catch (error) {
    console.log("Erro ao buscar agendamentos por status:", error);
    throw error;
  }
}

export async function concluirAgendamento(id) {
  try {
    const ref = doc(db, "agendamentos", id);
    await updateDoc(ref, {
      status: "Concluido",
      atualizadoEm: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.log("Erro ao concluir agendamento:", error);
    return { success: false, error };
  }
}

export async function getAgendamentosByDate(date: string) {
  try {
    const q = query(
      collection(db, "agendamentos"),
      where("data", "==", date),
      orderBy("horaInicio", "asc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.log("Erro ao buscar agendamentos por data:", error);
    return [];
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
