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
