import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ExternalLink,
  MessageCircle,
  Share2,
  Ticket,
  Check,
  Store,
  Plus,
  Pencil,
  Trash2,
  Shield,
  ArrowRight,
} from "lucide-react";
import { EventoFeira, ToastInfo } from "../types";

interface EventosSectionProps {
  eventos: EventoFeira[];
  isAdmin?: boolean;
  onNovoEvento?: () => void;
  onEditarEvento?: (evento: EventoFeira) => void;
  onRemoverEvento?: (id: string) => void;
  onIrParaQueroExpor?: () => void;
  onToast: (toast: ToastInfo) => void;
}

export const EventosSection: React.FC<EventosSectionProps> = ({
  eventos,
  isAdmin = false,
  onNovoEvento,
  onEditarEvento,
  onRemoverEvento,
  onIrParaQueroExpor,
  onToast,
}) => {
  const [copiadoId, setCopiadoId] = useState<string | null>(null);
  const [confirmandoExclusaoId, setConfirmandoExclusaoId] = useState<string | null>(null);

  function handleCompartilharEventoWhatsApp(evento: EventoFeira) {
    const texto =
      `🌟 *${evento.titulo} — Feira Negra de Fortaleza*\n\n` +
      `📅 *Quando:* ${evento.data} (${evento.horario})\n` +
      `📍 *Onde:* ${evento.local} — ${evento.bairro} (${evento.endereco})\n` +
      `🎟️ *Entrada:* ${evento.entrada}\n\n` +
      `✨ *Destaques da Programação:*\n` +
      evento.atracaoDestaque.map((a) => `• ${a}`).join("\n") +
      `\n\nVenha prestigiar os afroempreendedores de Fortaleza! Mais detalhes no link do mapa: ${evento.linkMaps}`;

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank");
  }

  async function handleCopiarDetalhesEvento(evento: EventoFeira) {
    const texto =
      `${evento.titulo} — Feira Negra de Fortaleza\n` +
      `Data: ${evento.data} (${evento.horario})\n` +
      `Local: ${evento.local} (${evento.endereco}, ${evento.bairro}, Fortaleza - CE)\n` +
      `Entrada: ${evento.entrada}\n` +
      `Mapa: ${evento.linkMaps}`;

    try {
      await navigator.clipboard.writeText(texto);
      setCopiadoId(evento.id);
      onToast({
        titulo: "Programação copiada! 📅",
        mensagem: `Informações de “${evento.titulo}” prontas para compartilhar.`,
      });
      setTimeout(() => setCopiadoId(null), 2500);
    } catch {
      // Fallback
    }
  }

  return (
    <section id="eventos" className="scroll-mt-20 py-16 md:py-24 border-t border-[#D8C29D]/60">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#260E05] text-[#FAF1DE] border border-[#F9910F]/30 text-xs font-bold uppercase tracking-widest mb-4">
              <Calendar className="w-3.5 h-3.5 text-[#F9910F]" />
              <span>Agenda Presencial Oficial</span>
            </div>

            <h2 className="font-poster text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-[#260E05] uppercase mb-4">
              Próximas Edições da Feira
            </h2>

            <p className="text-base sm:text-lg text-[#3D2014]/85 font-medium leading-relaxed">
              Acompanhe o calendário dos nossos encontros nos espaços culturais de Fortaleza.
              Venha viver a experiência com música ao vivo, oficinas, desfiles e dezenas de estandes autorais.
            </p>
          </div>

          {/* Admin action button */}
          {isAdmin && onNovoEvento && (
            <button
              onClick={onNovoEvento}
              className="inline-flex items-center gap-2 bg-[#260E05] hover:bg-[#F9910F] text-[#FAF1DE] hover:text-[#260E05] px-6 py-3.5 rounded-full font-bold uppercase text-xs tracking-wider transition-all duration-300 shadow-md cursor-pointer shrink-0 self-start md:self-end"
            >
              <Plus className="w-4 h-4" />
              <span>Cadastrar Novo Evento</span>
            </button>
          )}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {eventos.map((evento) => (
            <article
              key={evento.id}
              className="bg-[#FAF1DE] rounded-3xl overflow-hidden border-2 border-[#D8C29D] shadow-sm hover:shadow-xl hover:border-[#260E05] transition-all duration-300 flex flex-col"
            >
              {/* Event Image Banner */}
              <div className="relative h-48 overflow-hidden bg-[#260E05]">
                <img
                  src={evento.foto}
                  alt={evento.titulo}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Status / Free Entry Badge */}
                <div className="absolute top-3 left-3">
                  <span className="backdrop-blur-md bg-[#260E05]/90 text-[#FAF1DE] border border-[#F9910F]/40 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-flex items-center gap-1.5 shadow-xs">
                    <Ticket className="w-3.5 h-3.5 text-[#F9910F]" />
                    <span>Entrada Gratuita</span>
                  </span>
                </div>

                {/* Admin controls overlay */}
                {isAdmin && onEditarEvento && onRemoverEvento && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-[#260E05]/90 p-1 rounded-full border border-white/20">
                    <button
                      onClick={() => onEditarEvento(evento)}
                      className="p-1.5 hover:bg-white/20 rounded-full text-white transition-colors cursor-pointer"
                      title="Editar evento"
                    >
                      <Pencil className="w-3.5 h-3.5 text-[#F9910F]" />
                    </button>
                    {confirmandoExclusaoId !== evento.id ? (
                      <button
                        onClick={() => setConfirmandoExclusaoId(evento.id)}
                        className="p-1.5 hover:bg-red-500/20 rounded-full text-red-400 transition-colors cursor-pointer"
                        title="Excluir evento"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <div className="flex items-center gap-1 bg-red-600 px-2 py-0.5 rounded-full text-[10px] text-white">
                        <span>Excluir?</span>
                        <button
                          onClick={() => {
                            onRemoverEvento(evento.id);
                            setConfirmandoExclusaoId(null);
                          }}
                          className="font-bold underline cursor-pointer"
                        >
                          Sim
                        </button>
                        <button
                          onClick={() => setConfirmandoExclusaoId(null)}
                          className="cursor-pointer ml-1"
                        >
                          Não
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Date highlight on image bottom */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#F9910F]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{evento.horario}</span>
                  </div>
                </div>
              </div>

              {/* Event Body */}
              <div className="p-6 sm:p-7 flex flex-col flex-1">
                {/* Date Tag */}
                <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#260E05] bg-[#F8E4B8] border border-[#D8C29D] px-3 py-1 rounded-full uppercase tracking-wider mb-3 self-start">
                  <Calendar className="w-3.5 h-3.5 text-[#F9910F]" />
                  <span>{evento.data}</span>
                </div>

                <h3 className="font-poster text-xl sm:text-2xl font-normal text-[#260E05] mb-2 leading-tight uppercase">
                  {evento.titulo}
                </h3>

                <p className="text-xs font-bold text-[#3D2014]/70 uppercase tracking-wider mb-4">
                  {evento.subtitulo}
                </p>

                {/* Location Info */}
                <div className="p-3.5 rounded-2xl bg-white/70 border border-[#D8C29D] mb-5 space-y-1">
                  <div className="flex items-start gap-2 text-xs font-bold text-[#260E05]">
                    <MapPin className="w-4 h-4 text-[#F9910F] shrink-0 mt-0.5" />
                    <span>{evento.local}</span>
                  </div>
                  <p className="text-[11px] text-[#3D2014]/70 pl-6 font-medium">
                    {evento.endereco} · {evento.bairro}
                  </p>
                </div>

                <p className="text-sm text-[#3D2014] font-medium leading-relaxed mb-5">
                  {evento.descricao}
                </p>

                {/* Highlights list */}
                <div className="mb-6 space-y-2 pt-4 border-t border-[#D8C29D]/60">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#260E05] block mb-2">
                    ✦ Destaques da Programação:
                  </span>
                  {evento.atracaoDestaque.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-medium text-[#3D2014]">
                      <Sparkles className="w-3.5 h-3.5 text-[#F9910F] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="mt-auto pt-4 border-t border-[#D8C29D]/60 flex flex-col gap-2.5">
                  <button
                    onClick={() => handleCompartilharEventoWhatsApp(evento)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#260E05] hover:bg-[#F9910F] text-[#FAF1DE] hover:text-[#260E05] px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-[#F9910F]" />
                    <span>Convidar no WhatsApp</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={evento.linkMaps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-stone-50 border border-[#D8C29D] text-[#260E05] px-3 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#F9910F]" />
                      <span>Ver Mapa</span>
                      <ExternalLink className="w-3 h-3 text-[#3D2014]/50" />
                    </a>

                    <button
                      onClick={() => handleCopiarDetalhesEvento(evento)}
                      className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-stone-50 border border-[#D8C29D] text-[#260E05] px-3 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      {copiadoId === evento.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-bold">Copiado</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3.5 h-3.5 text-[#3D2014]/70" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Exhibitors & Artists Call to Action */}
        <div className="rounded-3xl p-8 sm:p-12 border-4 border-[#3D2014] bg-[#F8E4B8] flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl bg-afro-grid">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#F9910F] bg-[#260E05] px-3 py-1 rounded-full">
              <Store className="w-4 h-4" />
              <span>Inscrições Abertas</span>
            </div>
            <h3 className="font-poster text-2xl sm:text-3xl text-[#260E05] uppercase">
              Quer expor sua marca na Feira Negra?
            </h3>
            <p className="text-sm sm:text-base text-[#3D2014] max-w-xl leading-relaxed font-medium">
              Se você é afroempreendedor(a), artesão, estilista, gastrônomo ou artista de Fortaleza e região, preencha o formulário e faça parte da nossa comunidade.
            </p>
          </div>

          <a
            href="#quero-expor"
            onClick={(e) => {
              if (onIrParaQueroExpor) {
                e.preventDefault();
                onIrParaQueroExpor();
              }
            }}
            className="inline-flex items-center justify-center gap-2.5 bg-[#260E05] hover:bg-[#F9910F] text-[#FAF1DE] hover:text-[#260E05] px-8 py-4 rounded-full font-bold uppercase text-xs sm:text-sm tracking-wider transition-all duration-300 shadow-lg hover:scale-103 active:scale-98 shrink-0 cursor-pointer"
          >
            <span>Preencher Formulário de Expositor</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
