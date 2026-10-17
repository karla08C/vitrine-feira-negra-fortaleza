import { useState, useEffect, useCallback } from "react";
import { Negocio } from "../types";
import { SEED_NEGOCIOS, STORAGE_KEY } from "../data/seedData";

function getInitialNegocios(): Negocio[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Erro ao carregar dados locais:", e);
  }
  return SEED_NEGOCIOS;
}

export function useNegocios() {
  const [negocios, setNegocios] = useState<Negocio[]>([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    setNegocios(getInitialNegocios());
    setCarregado(true);
  }, []);

  useEffect(() => {
    if (carregado) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(negocios));
      } catch (err) {
        console.error("Erro ao salvar dados locais:", err);
      }
    }
  }, [negocios, carregado]);

  const adicionar = useCallback((dados: Partial<Negocio>): Negocio => {
    const novo: Negocio = {
      id: `neg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      nome: dados.nome || "",
      categoria: dados.categoria || "Moda e Vestuário",
      descricao: dados.descricao || "",
      whatsapp: dados.whatsapp || "",
      foto: dados.foto || "",
      destaque: false,
    };
    setNegocios((prev) => [novo, ...prev]);
    return novo;
  }, []);

  const editar = useCallback((id: string, dados: Partial<Negocio>) => {
    setNegocios((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...dados } : item))
    );
  }, []);

  const alternarDestaque = useCallback((id: string) => {
    setNegocios((prev) =>
      prev.map((item) => (item.id === id ? { ...item, destaque: !item.destaque } : item))
    );
  }, []);

  const remover = useCallback((id: string) => {
    setNegocios((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const limparTudo = useCallback(() => {
    setNegocios(SEED_NEGOCIOS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  return {
    negocios,
    adicionar,
    editar,
    alternarDestaque,
    remover,
    limparTudo,
  };
}
