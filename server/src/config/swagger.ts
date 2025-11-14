import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Hospital API',
    version: '1.0.0',
    description: 'API para sistema hospitalar - Gestão de médicos, pacientes, consultas e agendamentos'
  },
  servers: [
    {
      url: 'http://localhost:3001/api',
      description: 'Servidor de Desenvolvimento'
    }
  ],
  paths: {
    // ========== AUTH ==========
    '/auth/register': {
      post: {
        summary: 'Registrar novo usuário',
        tags: ['Authentication'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password', 'name', 'cpf', 'tipo'],
                properties: {
                  email: { type: 'string', example: 'dr.silva@hospital.com' },
                  password: { type: 'string', example: 'senha123' },
                  name: { type: 'string', example: 'Dr. João Silva' },
                  cpf: { type: 'string', example: '123.456.789-00' },
                  tipo: { type: 'string', example: 'medico', enum: ['medico', 'paciente', 'funcionario'] },
                  crm: { type: 'string', example: 'CRM/SP 123456' },
                  especialidade: { type: 'string', example: 'Cardiologia' },
                  setor: { type: 'string', example: 'Recepção' },
                  cargo: { type: 'string', example: 'Recepcionista' },
                  data_admissao: { type: 'string', example: '2024-01-15' },
                  convenio: { type: 'string', example: 'Unimed' }
                }
              }
            }
          }
        },
        responses: {
          201: { description: 'Usuário criado com sucesso' },
          400: { description: 'Dados inválidos' }
        }
      }
    },
    '/auth/login': {
      post: {
        summary: 'Fazer login',
        tags: ['Authentication'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', example: 'dr.silva@hospital.com' },
                  password: { type: 'string', example: 'senha123' }
                }
              }
            }
          }
        },
        responses: {
          200: { description: 'Login realizado com sucesso' },
          401: { description: 'Credenciais inválidas' }
        }
      }
    },
    '/auth/me': {
      get: {
        summary: 'Obter dados do usuário logado',
        tags: ['Authentication'],
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Dados do usuário' },
          401: { description: 'Não autorizado' }
        }
      }
    },

    // ========== DOUTOR ==========
    '/doctors': {
    get: {
        summary: 'Listar todos os médicos',
        tags: ['Doctors'],
        responses: {
        200: { description: 'Lista de médicos' }
        }
    },
    post: {
        summary: 'Criar novo médico',
        tags: ['Doctors'],
        security: [{ bearerAuth: [] }],
        requestBody: {
        required: true,
        content: {
            'application/json': {
            schema: {
                type: 'object',
                required: ['usuario_id', 'crm', 'especialidade'],
                properties: {
                usuario_id: { type: 'integer', example: 1 },
                crm: { type: 'string', example: 'CRM/SP 123456' },
                especialidade: { type: 'string', example: 'Cardiologia' },
                ativo: { type: 'boolean', example: true }
                }
            }
            }
        }
        },
        responses: {
        201: { description: 'Médico criado com sucesso' },
        400: { description: 'Dados inválidos' },
        401: { description: 'Não autorizado' }
        }
    }
    },
    '/doctors/me': {
    get: {
        summary: 'Obter perfil do médico logado',
        tags: ['Doctors'],
        security: [{ bearerAuth: [] }],
        responses: {
        200: { description: 'Perfil do médico' },
        401: { description: 'Não autorizado' },
        403: { description: 'Acesso negado - não é médico' }
        }
    }
    },

    // ========== PACIENTES ==========
    '/patients/profile': {
      get: {
        summary: 'Obter perfil do paciente logado',
        tags: ['Patients'],
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Perfil do paciente' },
          401: { description: 'Não autorizado' },
          403: { description: 'Acesso negado - não é paciente' }
        }
      }
    },

    // ========== FUNCIONARIOS ==========
    '/employees/profile': {
      get: {
        summary: 'Obter perfil do funcionário logado',
        tags: ['Employees'],
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Perfil do funcionário' },
          401: { description: 'Não autorizado' },
          403: { description: 'Acesso negado - não é funcionário' }
        }
      }
    },

    // ========== PROFILES ==========
    '/profiles/me': {
      get: {
        summary: 'Obter perfil pessoal do usuário logado',
        tags: ['Profiles'],
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Perfil pessoal' },
          401: { description: 'Não autorizado' }
        }
      },
      put: {
        summary: 'Atualizar perfil pessoal',
        tags: ['Profiles'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  nome: { type: 'string', example: 'Novo Nome' },
                  telefone: { type: 'string', example: '(11) 99999-9999' },
                  data_nascimento: { type: 'string', example: '1990-01-01' }
                }
              }
            }
          }
        },
        responses: {
          200: { description: 'Perfil atualizado com sucesso' },
          400: { description: 'Dados inválidos' }
        }
      }
    },

    // ========== AGENDA ==========
    '/schedules/availability': {
      get: {
        summary: 'Buscar horários disponíveis do médico',
        tags: ['Schedules'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'medico_id',
            in: 'query',
            required: true,
            schema: { type: 'integer', example: 1 }
          },
          {
            name: 'data',
            in: 'query',
            required: true,
            schema: { type: 'string', example: '2024-01-20' }
          }
        ],
        responses: {
          200: { description: 'Lista de horários disponíveis' },
          400: { description: 'Parâmetros inválidos' }
        }
      }
    },

    // ========== CONSULTA ==========
    '/appointments': {
      post: {
        summary: 'Agendar nova consulta',
        tags: ['Appointments'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['paciente_id', 'medico_id', 'data_consulta'],
                properties: {
                  paciente_id: { type: 'integer', example: 1 },
                  medico_id: { type: 'integer', example: 1 },
                  data_consulta: { type: 'string', example: '2024-01-20T14:30:00Z' },
                  observacoes: { type: 'string', example: 'Consulta de retorno' }
                }
              }
            }
          }
        },
        responses: {
          201: { description: 'Consulta agendada com sucesso' },
          400: { description: 'Dados inválidos' }
        }
      }
    },
    '/appointments/my-appointments': {
      get: {
        summary: 'Obter minhas consultas',
        tags: ['Appointments'],
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Lista de consultas do usuário' },
          401: { description: 'Não autorizado' }
        }
      }
    },

    // ========== USUARIOSS ==========
    '/users/profile': {
      get: {
        summary: 'Obter perfil do usuário logado',
        tags: ['Users'],
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Perfil do usuário' },
          401: { description: 'Não autorizado' }
        }
      }
    }
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
};

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "Hospital API Documentation"
  }));
};