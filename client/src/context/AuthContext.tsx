import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth, db } from "../services/firebase";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";

import { User } from "../types/(auth)/User";
import { AuthContextData } from "../types/(auth)/AuthContextData";
import { RegisterData } from "../types/(auth)/RegisterData";

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ----------------------------------------------------
  // CARREGAR USUÁRIO SALVO
  // ----------------------------------------------------
  useEffect(() => {
    async function loadStorage() {
      const storedUser = await AsyncStorage.getItem("@user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      setLoading(false);
    }

    loadStorage();
  }, []);

  // ----------------------------------------------------
  // LOGIN
  // ----------------------------------------------------
  async function login(email: string, password: string) {
    setLoading(true);

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);

      const uid = response.user.uid;
      let userData: any = null;

      // Buscar FUNCIONÁRIO
      const qFunc = query(
        collection(db, "funcionarios"),
        where("email", "==", email)
      );
      const snapFunc = await getDocs(qFunc);

      if (!snapFunc.empty) {
        userData = {
          ...snapFunc.docs[0].data(),
          uid,
          tipo: "funcionario",
        };
      }

      // Buscar MÉDICO
      if (!userData) {
        const qMed = query(
          collection(db, "medicos"),
          where("email", "==", email)
        );
        const snapMed = await getDocs(qMed);

        if (!snapMed.empty) {
          userData = {
            ...snapMed.docs[0].data(),
            uid,
            tipo: "medico",
          };
        }
      }

      if (!userData) {
        throw new Error("USER_NOT_FOUND");
      }

      await AsyncStorage.setItem("@user", JSON.stringify(userData));
      setUser(userData);
      return userData;

    } catch (error) {
      console.log("Erro no login:", error);
      throw new Error("INVALID_LOGIN"); // <-- IMPORTANTE!
    } finally {
      setLoading(false);
    }
  }

  // ----------------------------------------------------
  // REGISTRO
  // ----------------------------------------------------
  async function register(dados: RegisterData) {
    setLoading(true);

    try {
      const { nome, email, senha, tipo, ...extras } = dados;

      const userCred = await createUserWithEmailAndPassword(auth, email, senha);
      const uid = userCred.user.uid;

      const path = tipo === "medico" ? "medicos" : "funcionarios";

      const ref = doc(db, path, uid);

      const userData = {
        nome,
        email,
        tipo,
        uid,
        ativo: true,
        createdAt: new Date(),
        ...extras, // CRM, cargo, etc
      };

      await setDoc(ref, userData);

      await AsyncStorage.setItem("@user", JSON.stringify(userData));
      setUser(userData);

    } catch (error) {
      console.log("Erro ao registrar:", error);
      throw new Error("REGISTER_ERROR"); // <-- PARA MODAL
    } finally {
      setLoading(false);
    }
  }

  // ----------------------------------------------------
  // LOGOUT
  // ----------------------------------------------------
  async function logout() {
    setUser(null);
    await AsyncStorage.removeItem("@user");
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
