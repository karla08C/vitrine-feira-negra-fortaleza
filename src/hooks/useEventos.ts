import { useState, useEffect, useCallback } from "react";
import { EventoFeira } from "../types";
import { EVENTOS_FEIRA } from "../data/eventosData";

const EVENTOS_STORAGE_KEY = "feira_negra_eventos_v1";

function getInitialEventos(): EventoFeira[] {
  try {
    const saved = localStorage.getItem(EVENTOS_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Erro ao carregar eventos:", e);
  }
  return EVENTOS_FEIRA;
}

export function useEventos() {
  const [eventos, setEventos] = useState<EventoFeira[]>([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    setEventos(getInitialEventos());
    setCarregado(true);
  }, []);

  useEffect(() => {
    if (carregado) {
      try {
        localStorage.setItem(EVENTOS_STORAGE_KEY, JSON.stringify(eventos));
      } catch (err) {
        console.error("Erro ao salvar eventos no localStorage:", err);
      }
    }
  }, [eventos, carregado]);

  const adicionarEvento = useCallback((dados: Omit<EventoFeira, "id">): EventoFeira => {
    const novo: EventoFeira = {
      ...dados,
      id: `evento-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    };
    setEventos((prev) => [novo, ...prev]);
    return novo;
  }, []);

  const editarEvento = useCallback((id: string, dados: Partial<EventoFeira>) => {
    setEventos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...dados } : item))
    );
  }, []);

  const removerEvento = useCallback((id: string) => {
    setEventos((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const restaurarPadrao = useCallback(() => {
    setEventos(EVENTOS_FEIRA);
    try {
      localStorage.removeItem(EVENTOS_STORAGE_KEY);
    } catch {}
  }, []);

  return {
    eventos,
    adicionarEvento,
    editarEvento,
    removerEvento,
    restaurarPadrao,
  };
}
