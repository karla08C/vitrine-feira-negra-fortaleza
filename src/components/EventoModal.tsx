import React, { useState, useEffect } from "react";
import { X, Calendar, MapPin, Sparkles, Image, Clock, Ticket } from "lucide-react";
import { EventoFeira } from "../types";

interface EventoModalProps {
  aberto: boolean;
  onFechar: () => void;
  onSalvar: (dados: Partial<EventoFeira>) => void;
  eventoEditar?: EventoFeira | null;
}

export const EventoModal: React.FC<EventoModalProps> = ({
  aberto,
  onFechar,
  onSalvar,
  eventoEditar,
}) => {
  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [local, setLocal] = useState("");
  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("Fortaleza — CE");
  const [descricao, setDescricao] = useState("");
  const [atracoesTexto, setAtracoesTexto] = useState("");
  const [entrada, setEntrada] = useState("Entrada Gratuita e Aberta ao Público");
  const [linkMaps, setLinkMaps] = useState("");
  const [foto, setFoto] = useState("");
  const [status, setStatus] = useState<"confirmado" | "proximo" | "em_breve">("confirmado");

  useEffect(() => {
    if (eventoEditar) {
      setTitulo(eventoEditar.titulo || "");
      setSubtitulo(eventoEditar.subtitulo || "");
      setData(eventoEditar.data || "");
      setHorario(eventoEditar.horario || "");
      setLocal(eventoEditar.local || "");
      setEndereco(eventoEditar.endereco || "");
      setBairro(eventoEditar.bairro || "");
      setCidade(eventoEditar.cidade || "Fortaleza — CE");
      setDescricao(eventoEditar.descricao || "");
      setAtracoesTexto((eventoEditar.atracaoDestaque || []).join(", "));
      setEntrada(eventoEditar.entrada || "Entrada Gratuita e Aberta ao Público");
      setLinkMaps(eventoEditar.linkMaps || "");
      setFoto(eventoEditar.foto || "");
      setStatus(eventoEditar.status || "confirmado");
    } else {
      setTitulo("");
      setSubtitulo("");
      setData("");
      setHorario("16h às 21h30");
      setLocal("");
      setEndereco("");
      setBairro("");
      setCidade("Fortaleza — CE");
      setDescricao("");
      setAtracoesTexto("Roda de Samba, Desfile de Moda Afro, Praça Gastronômica");
      setEntrada("Entrada Gratuita e Aberta ao Público");
      setLinkMaps("");
      setFoto("https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?w=900&q=80");
      setStatus("confirmado");
    }
  }, [eventoEditar, aberto]);

  if (!aberto) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!titulo.trim() || !data.trim() || !local.trim()) return;

    const atracoes = atracoesTexto
      .split(",")
      .map((a) => a.trim())
      .filter(Boolean);

    onSalvar({
      ...(eventoEditar ? { id: eventoEditar.id } : {}),
      titulo: titulo.trim(),
      subtitulo: subtitulo.trim(),
      data: data.trim(),
      horario: horario.trim(),
      local: local.trim(),
      endereco: endereco.trim(),
      bairro: bairro.trim(),
      cidade: cidade.trim(),
      descricao: descricao.trim(),
      atracaoDestaque: atracoes.length > 0 ? atracoes : ["Música ao Vivo", "Gastronomia", "Artesanato"],
      entrada: entrada.trim(),
      linkMaps: linkMaps.trim() || `https://maps.google.com/?q=${encodeURIComponent(`${local} ${bairro} Fortaleza`)}`,
      foto: foto.trim() || "https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?w=900&q=80",
      status,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-up">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#FAF1DE] border-4 border-[#3D2014] rounded-3xl shadow-2xl p-6 sm:p-8 text-[#260E05]">
        {/* Close Button */}
        <button
          onClick={onFechar}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#260E05]/10 hover:bg-[#260E05] hover:text-[#FAF1DE] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 border-b-2 border-[#260E05]/15 pb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#260E05] text-[#F9910F] text-xs font-bold uppercase tracking-wider mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>Gestão de Eventos da Feira</span>
          </div>
          <h3 className="font-poster text-2xl sm:text-3xl uppercase text-[#260E05]">
            {eventoEditar ? "Editar Evento" : "Cadastrar Novo Evento"}
          </h3>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1">
                Título do Evento *
              </label>
              <input
                type="text"
                required
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ex: Feira Negra no Dragão do Mar"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-[#D8C29D] text-sm font-medium focus:outline-none focus:border-[#F9910F]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1">
                Subtítulo / Destaque
              </label>
              <input
                type="text"
                value={subtitulo}
                onChange={(e) => setSubtitulo(e.target.value)}
                placeholder="Ex: Moda autoral e gastronomia afro"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-[#D8C29D] text-sm font-medium focus:outline-none focus:border-[#F9910F]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1">
                Data do Evento *
              </label>
              <input
                type="text"
                required
                value={data}
                onChange={(e) => setData(e.target.value)}
                placeholder="Ex: Sábado, 15 de Novembro"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-[#D8C29D] text-sm font-medium focus:outline-none focus:border-[#F9910F]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1">
                Horário
              </label>
              <input
                type="text"
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
                placeholder="Ex: 16h às 21h30"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-[#D8C29D] text-sm font-medium focus:outline-none focus:border-[#F9910F]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1">
                Local *
              </label>
              <input
                type="text"
                required
                value={local}
                onChange={(e) => setLocal(e.target.value)}
                placeholder="Ex: Dragão do Mar"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-[#D8C29D] text-sm font-medium focus:outline-none focus:border-[#F9910F]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1">
                Bairro
              </label>
              <input
                type="text"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                placeholder="Ex: Praia de Iracema"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-[#D8C29D] text-sm font-medium focus:outline-none focus:border-[#F9910F]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-[#D8C29D] text-sm font-bold focus:outline-none focus:border-[#F9910F]"
              >
                <option value="confirmado">Confirmado</option>
                <option value="proximo">Próximo</option>
                <option value="em_breve">Em Breve</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1">
              Endereço Completo
            </label>
            <input
              type="text"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              placeholder="Ex: Rua Dragão do Mar, 81 — Praça Verde"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-[#D8C29D] text-sm font-medium focus:outline-none focus:border-[#F9910F]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1">
              Descrição do Evento
            </label>
            <textarea
              rows={3}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descreva as atrações, estandes e atividades programadas para a edição..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-[#D8C29D] text-sm font-medium focus:outline-none focus:border-[#F9910F]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1">
              Atrações em Destaque (separadas por vírgula)
            </label>
            <input
              type="text"
              value={atracoesTexto}
              onChange={(e) => setAtracoesTexto(e.target.value)}
              placeholder="Roda de Samba, Desfile Afro, Quitutes, Oficina de Turbantes"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-[#D8C29D] text-sm font-medium focus:outline-none focus:border-[#F9910F]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1">
                Link do Google Maps
              </label>
              <input
                type="url"
                value={linkMaps}
                onChange={(e) => setLinkMaps(e.target.value)}
                placeholder="https://maps.google.com/..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-[#D8C29D] text-sm font-medium focus:outline-none focus:border-[#F9910F]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1">
                URL da Foto
              </label>
              <input
                type="url"
                value={foto}
                onChange={(e) => setFoto(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-[#D8C29D] text-sm font-medium focus:outline-none focus:border-[#F9910F]"
              />
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#260E05]/15">
            <button
              type="button"
              onClick={onFechar}
              className="px-5 py-2.5 rounded-full border-2 border-[#260E05] text-[#260E05] hover:bg-[#260E05] hover:text-[#FAF1DE] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-7 py-2.5 rounded-full bg-[#260E05] hover:bg-[#F9910F] text-[#FAF1DE] hover:text-[#260E05] font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              Salvar Evento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
