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
} from "lucide-react";
import { EVENTOS_FEIRA, EventoFeira } from "../data/eventosData";
import { ToastInfo } from "../types";

interface EventosSectionProps {
  onToast: (toast: ToastInfo) => void;
}

export const EventosSection: React.FC<EventosSectionProps> = ({ onToast }) => {
  const [copiadoId, setCopiadoId] = useState<string | null>(null);

  function handleCompartilharEventoWhatsApp(evento: EventoFeira) {
    const texto = `🌟 *${evento.titulo} — Feira Negra de Fortaleza*\n\n` +
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
    const texto = `${evento.titulo} — Feira Negra de Fortaleza\n` +
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
    <section id="eventos" className="scroll-mt-20 py-16 md:py-24 border-t border-stone-200/70">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-amber-800 text-xs font-bold uppercase tracking-wider mb-4">
            <Calendar className="w-3.5 h-3.5 text-amber-600" />
            <span>Agenda & Programação Presencial</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.15] text-stone-900 mb-6">
            Próximas Edições da Feira Negra
          </h2>

          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            Acompanhe o calendário dos nossos encontros presenciais em Fortaleza. Venha viver a
            experiência completa com música ao vivo, oficinas, gastronomia afro e dezenas de estandes autorais.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {EVENTOS_FEIRA.map((evento) => (
            <article
              key={evento.id}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              {/* Event Image Banner */}
              <div className="relative h-48 overflow-hidden bg-stone-100">
                <img
                  src={evento.foto}
                  alt={evento.titulo}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Status / Free Entry Badge */}
                <div className="absolute top-3 left-3">
                  <span className="backdrop-blur-md bg-white/95 text-stone-900 border border-stone-200/60 text-xs font-bold px-3 py-1 rounded-full inline-flex items-center gap-1.5 shadow-xs">
                    <Ticket className="w-3.5 h-3.5 text-[#E04823]" />
                    <span>Entrada Franca</span>
                  </span>
                </div>

                {/* Date highlight on image bottom */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{evento.horario}</span>
                  </div>
                </div>
              </div>

              {/* Event Body */}
              <div className="p-6 sm:p-7 flex flex-col flex-1">
                {/* Date Tag */}
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E04823] uppercase tracking-wider mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>{evento.data}</span>
                </div>

                <h3 className="font-display text-2xl font-bold text-stone-900 mb-2 leading-tight">
                  {evento.titulo}
                </h3>

                <p className="text-xs font-semibold text-stone-500 mb-4">
                  {evento.subtitulo}
                </p>

                {/* Location Info */}
                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80 mb-5 space-y-1">
                  <div className="flex items-start gap-2 text-xs font-bold text-stone-900">
                    <MapPin className="w-4 h-4 text-[#E04823] shrink-0 mt-0.5" />
                    <span>{evento.local}</span>
                  </div>
                  <p className="text-[11px] text-stone-500 pl-6">
                    {evento.endereco} · {evento.bairro}
                  </p>
                </div>

                <p className="text-sm text-stone-600 leading-relaxed mb-5">
                  {evento.descricao}
                </p>

                {/* Highlights list */}
                <div className="mb-6 space-y-2 pt-4 border-t border-stone-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2">
                    Destaques do Encontro:
                  </span>
                  {evento.atracaoDestaque.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-stone-700">
                      <Sparkles className="w-3.5 h-3.5 text-[#F0AC33] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="mt-auto pt-4 border-t border-stone-100 flex flex-col gap-2.5">
                  <button
                    onClick={() => handleCompartilharEventoWhatsApp(evento)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#128C7E] hover:bg-[#0E7064] text-white px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-xs active:scale-[0.98] cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Convidar no WhatsApp</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={evento.linkMaps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-700 px-3 py-2 rounded-full text-xs font-medium transition-colors"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#E04823]" />
                      <span>Ver no Mapa</span>
                      <ExternalLink className="w-3 h-3 text-stone-400" />
                    </a>

                    <button
                      onClick={() => handleCopiarDetalhesEvento(evento)}
                      className="inline-flex items-center justify-center gap-1.5 bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-700 px-3 py-2 rounded-full text-xs font-medium transition-colors cursor-pointer"
                    >
                      {copiadoId === evento.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600 font-semibold">Copiado</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3.5 h-3.5 text-stone-500" />
                          <span>Copiar info</span>
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
        <div className="rounded-3xl p-8 sm:p-10 border border-amber-200/80 bg-gradient-to-br from-amber-50/80 to-orange-50/50 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E04823]">
              <Store className="w-4 h-4" />
              <span>Inscrição para Expositores & Artistas</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-stone-900">
              Quer expor sua marca na próxima Feira Negra?
            </h3>
            <p className="text-sm text-stone-600 max-w-xl leading-relaxed">
              Se você é afroempreendedor(a), artesão, estilista, gastrônomo ou artista de Fortaleza e região metropolitana, venha expor conosco.
            </p>
          </div>

          <a
            href="https://wa.me/5585999990000?text=Ol%C3%A1!%20Sou%20afroempreendedor(a)%20e%20gostaria%20de%20informa%C3%A7%C3%B5es%20para%20expor%20na%20pr%C3%B3xima%20Feira%20Negra%20de%20Fortaleza."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 bg-[#181513] hover:bg-stone-800 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-all shadow-sm active:scale-[0.98] shrink-0"
          >
            <MessageCircle className="w-4 h-4 text-amber-400" />
            <span>Falar com a Curadoria no WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
