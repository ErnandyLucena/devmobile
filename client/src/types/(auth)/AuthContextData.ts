import { User } from "firebase/auth";
import { RegisterData } from "./RegisterData";

export interface AuthContextData {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (dados: RegisterData) => Promise<void>;
};
