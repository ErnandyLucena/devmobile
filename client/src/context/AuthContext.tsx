import React, { createContext, useContext, useEffect, useState } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  name: string;
  email: string;
};

type AuthContextData = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Carregar usuário salvo (persistência)
  useEffect(() => {
    async function loadStorage() {
      const storedUser = await AsyncStorage.getItem("@user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      setLoading(false); // Splash pode fechar
    }

    loadStorage();
  }, []);

  // ------- LOGIN FAKE -------
  async function login(email: string, password: string) {
    setLoading(true);

    // Simulação de API
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (email !== "" && password !== "") {
      const loggedUser = {
        name: "Usuário Exemplo",
        email: email,
      };

      setUser(loggedUser);
      await AsyncStorage.setItem("@user", JSON.stringify(loggedUser));
    }

    setLoading(false);
  }

  // ------- LOGOUT -------
  async function logout() {
    setUser(null);
    await AsyncStorage.removeItem("@user");
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
