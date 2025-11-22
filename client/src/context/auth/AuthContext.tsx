import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../services/firebase"; 
import { onAuthStateChanged } from "firebase/auth";
import { User } from "../../types/(auth)/User";
import { AuthContextData } from "../../types/(auth)/AuthContextData";
import { RegisterData } from "../../types/(auth)/RegisterData";
import { loginUser } from "./authLogin";
import { registerUser } from "./authRegister";
import { logoutUser } from "./authLogout";
import { loadUserData } from "./authUtils";

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser && firebaseUser.email) {
        if (!user) {
          await loadUserData(firebaseUser.email, setUser);
        }
      } else {
        setUser(null);
        await AsyncStorage.removeItem("@user");
      }
      setLoading(false);
    });

    async function loadFromStorage() {
      const storedUser = await AsyncStorage.getItem("@user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }

    loadFromStorage();
    return () => unsub();
  }, []);

  const login = async (email: string, password: string) => {
    return await loginUser(email, password, setUser, setLoading);
  };

  const register = async (dados: RegisterData) => {
    return await registerUser(dados, setUser, setLoading);
  };

  const logout = async () => {
    await logoutUser(setUser);
  };

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