export interface Negocio {
  id: string;
  nome: string;
  categoria: string;
  descricao: string;
  whatsapp: string;
  foto?: string;
  destaque?: boolean;
}

export type Categoria =
  | "Moda e Vestuário"
  | "Acessórios"
  | "Artesanato"
  | "Gastronomia"
  | "Beleza e Cosméticos";

export interface ToastInfo {
  titulo: string;
  mensagem: string;
}

export type StatusSolicitacao = "pendente" | "aprovado" | "rejeitado";

export interface SolicitacaoExpositor {
  id: string;
  nomeNegocio: string;
  responsavel: string;
  categoria: string;
  descricao: string;
  whatsapp: string;
  instagram?: string;
  foto?: string;
  dataEnvio: string;
  status: StatusSolicitacao;
  motivo?: string;
}

export interface EventoFeira {
  id: string;
  titulo: string;
  subtitulo: string;
  data: string;
  horario: string;
  local: string;
  endereco: string;
  bairro: string;
  cidade: string;
  descricao: string;
  atracaoDestaque: string[];
  entrada: string;
  linkMaps: string;
  foto: string;
  status: "confirmado" | "proximo" | "em_breve";
}
