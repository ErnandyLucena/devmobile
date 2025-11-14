import { UserService } from './user.service';
import { ProfileService } from './profile.service';
import { DoctorService } from './doctor.service';
import { EmployeeService } from './employee.service';
import { PatientService } from './patient.service';
import { HashUtil } from '../utils/hash.util';
import { JwtUtil } from '../utils/jwt.util';

export const AuthService = {
  async register(data: {
    email: string;
    password: string;
    name: string;
    cpf: string;
    tipo: string;
    crm?: string;
    especialidade?: string;
    setor?: string;
    cargo?: string;
    data_admissao?: string;
    convenio?: string;
  }) {

     console.log('Dados recebidos no AuthService:', data);
  console.log('recebido:', data.name);
  console.log('Tipo do nome:', typeof data.name);
    // apagar essa pohaaaa aqui dpss
    const existingUser = await UserService.findByEmail(data.email);
    if (existingUser) {
      throw new Error('Email já cadastrado');
    }

    const passwordHash = await HashUtil.hash(data.password);

    // Criar usuário
    const user = await UserService.create({
      email: data.email,
      password_hash: passwordHash,
      tipo: data.tipo
    });

    // Criar perfil
    await ProfileService.create({
      usuario_id: user.id,
      nome: data.name,
      cpf: data.cpf
    });

    // Criar registro específico
    let specificRecord;
    
    if (data.tipo === 'medico' && data.crm && data.especialidade) {
      specificRecord = await DoctorService.create({
        usuario_id: user.id,
        crm: data.crm,
        especialidade: data.especialidade,
        ativo: true
      });
    } else if (data.tipo === 'funcionario' && data.setor && data.cargo && data.data_admissao) {
      specificRecord = await EmployeeService.create({
        usuario_id: user.id,
        setor: data.setor,
        cargo: data.cargo,
        data_admissao: new Date(data.data_admissao)
      });
    } else if (data.tipo === 'paciente') {
      specificRecord = await PatientService.create({
        usuario_id: user.id,
        convenio: data.convenio,
      });
    }

    return {
      id: user.id,
      email: user.email,
      tipo: user.tipo,
      name: data.name
    };
  },

  async login(data: { email: string; password: string }) {
    // Buscar usuário por email
    const user = await UserService.findByEmail(data.email);
    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    // Verificar senha
    const passwordMatch = await HashUtil.compare(data.password, user.password_hash);
    if (!passwordMatch) {
      throw new Error('Credenciais inválidas');
    }

    // Buscar perfil para pegar o nome
    const profile = await ProfileService.findByUserId(user.id);

    // Gerar token JWT
    const token = JwtUtil.sign({
      userId: user.id,
      email: user.email,
      tipo: user.tipo
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        tipo: user.tipo,
        name: profile?.nome
      }
    };
  },

  async getMe(userId: number) {
    // Buscar usuário
    const user = await UserService.findById(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Buscar perfil
    const profile = await ProfileService.findByUserId(userId);

    // Buscar dados específicos baseado no tipo
    let specificData = null;
    
    if (user.tipo === 'medico') {
      specificData = await DoctorService.findByUserId(userId);
    } else if (user.tipo === 'funcionario') {
      specificData = await EmployeeService.findByUserId(userId);
    } else if (user.tipo === 'paciente') {
      specificData = await PatientService.findByUserId(userId);
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        tipo: user.tipo,
        data_criacao: user.data_criacao
      },
      profile: {
        nome: profile?.nome,
        cpf: profile?.cpf,
        telefone: profile?.telefone,
        data_nascimento: profile?.data_nascimento
      },
      specific: specificData
    };
  }
};