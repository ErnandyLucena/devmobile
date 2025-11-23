import React, { createContext, useState, useContext, useCallback } from 'react';
import { getAllMedicos } from '../services/medicos.service';

const MedicosContext = createContext();

export const useMedicos = () => {
  return useContext(MedicosContext);
};

export const MedicosProvider = ({ children }) => {
  const [medicos, setMedicos] = useState([]);

  // Função para atualizar a lista de médicos
  const updateMedicosList = useCallback(async () => {
    try {
      const data = await getAllMedicos(); 
      setMedicos(data);
    } catch (error) {
      console.log('Erro ao carregar médicos:', error);
    }
  }, []);

  return (
    <MedicosContext.Provider value={{ medicos, updateMedicosList }}>
      {children}
    </MedicosContext.Provider>
  );
};
