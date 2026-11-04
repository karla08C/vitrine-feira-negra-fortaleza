import { useState, useEffect, useCallback } from "react";
import { SolicitacaoExpositor } from "../types";

const SOLICITACOES_STORAGE_KEY = "feira_negra_solicitacoes_v1";

const SEED_SOLICITACOES: SolicitacaoExpositor[] = [
  {
    id: "sol-1",
    nomeNegocio: "Ancestral Chic Biojoias",
    responsavel: "Aline Santana",
    categoria: "Acessórios",
    descricao:
      "Criação autoral de colares, brincos e pulseiras utilizando sementes de açaí, madeira de reaproveitamento e fios encerados com estética afro-brasileira.",
    whatsapp: "85988771122",
    instagram: "@ancestralchic.bio",
    foto: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
    dataEnvio: "Hoje às 14:32",
    status: "pendente",
  },
  {
    id: "sol-2",
    nomeNegocio: "Doces da Vovó Benedita",
    responsavel: "Carlos Eduardo Silva",
    categoria: "Gastronomia",
    descricao:
      "Confeitaria tradicional afro-cearense com cocadas cremosas, doce de caju em calda, bolo de macaxeira e quindim artesanal.",
    whatsapp: "85999882233",
    instagram: "@doces.benedita",
    foto: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80",
    dataEnvio: "Ontem às 19:15",
    status: "pendente",
  },
];

function getInitialSolicitacoes(): SolicitacaoExpositor[] {
  try {
    const saved = localStorage.getItem(SOLICITACOES_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Erro ao carregar solicitações:", e);
  }
  return SEED_SOLICITACOES;
}

export function useSolicitacoes() {
  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoExpositor[]>([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    setSolicitacoes(getInitialSolicitacoes());
    setCarregado(true);
  }, []);

  useEffect(() => {
    if (carregado) {
      try {
        localStorage.setItem(SOLICITACOES_STORAGE_KEY, JSON.stringify(solicitacoes));
      } catch (err) {
        console.error("Erro ao salvar solicitações no localStorage:", err);
      }
    }
  }, [solicitacoes, carregado]);

  const enviarSolicitacao = useCallback(
    (dados: Omit<SolicitacaoExpositor, "id" | "dataEnvio" | "status">): SolicitacaoExpositor => {
      const agora = new Date();
      const formatada = `${agora.toLocaleDateString("pt-BR")} às ${agora.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;

      const nova: SolicitacaoExpositor = {
        ...dados,
        id: `sol-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        dataEnvio: formatada,
        status: "pendente",
      };

      setSolicitacoes((prev) => [nova, ...prev]);
      return nova;
    },
    []
  );

  const aprovar = useCallback((id: string) => {
    let solicitacaoAprovada: SolicitacaoExpositor | undefined;
    setSolicitacoes((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          solicitacaoAprovada = { ...item, status: "aprovado" };
          return solicitacaoAprovada;
        }
        return item;
      })
    );
    return solicitacaoAprovada;
  }, []);

  const rejeitar = useCallback((id: string, motivo?: string) => {
    setSolicitacoes((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "rejeitado", motivo: motivo || "Não atende aos critérios no momento" } : item
      )
    );
  }, []);

  const remover = useCallback((id: string) => {
    setSolicitacoes((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const pendentesCount = solicitacoes.filter((s) => s.status === "pendente").length;

  return {
    solicitacoes,
    pendentesCount,
    enviarSolicitacao,
    aprovar,
    rejeitar,
    remover,
  };
}
