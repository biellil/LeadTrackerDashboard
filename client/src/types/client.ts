export interface Cliente {
  id: number;
  nome_cliente: string;
  telefone: string;
  temperatura: string;
  numero_identificacao: string;
  resumo: string | null;
  nome_empresa: string;
  UltimaMsgLead: string | null;
  create_time: string;
  IA: boolean;
}

export interface NegocioCliente {
  id: number;
  cliente_id: number;
  segmento_empresa: string | null;
  num_pessoas_comercial: number | null;
  usa_automacao_crm: boolean;
  ferramenta_crm: string | null;
  prospeccao_whatsapp: boolean;
  maior_desafio: string | null;
  tempo_tarefas_repetitivas: boolean;
  perde_oportunidades: boolean;
  orcamento_automacao: number | null;
  tempo_implementacao: string | null;
  aberto_para_ia: boolean;
  experiencia_com_ia: boolean;
}

export interface ClienteWithNegocio extends Cliente {
  negocio?: NegocioCliente;
}

export interface DashboardStats {
  totalClientes: number;
  novosLeads: number;
  taxaConversao: number;
  taxaAutomacaoIA: number;
  percentageGrowth: {
    clientes: number;
    leads: number;
    conversao: number;
    automacaoIA: number;
  };
}

export interface SegmentoEmpresa {
  name: string;
  value: number;
  color: string;
}

export interface CrmUsage {
  name: string;
  value: number;
  color: string;
}

export interface ClientGrowthData {
  name: string;
  novosClientes: number;
  comIAAtiva: number;
}

export interface IAMetrics {
  abertosParaIA: number;
  experienciaPrevia: number;
  integracaoCRMCompleta: number;
  prospeccaoWhatsApp: number;
  automacaoTarefas: number;
}

export interface Desafio {
  name: string;
  percentage: number;
  icon: string;
  color: string;
}
