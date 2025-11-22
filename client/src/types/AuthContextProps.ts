import { UserData } from "./userData";

export interface AuthContextProps {
    user: any;
    userData: UserData | null;
    userType: "medico" | "funcionario" | null;
    loading: boolean;
    login: (email: string, senha: string) => Promise<void>;
    register: (data: any) => Promise<void>;
    logout: () => Promise<void>;
}
