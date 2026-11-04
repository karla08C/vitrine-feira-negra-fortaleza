import React, { useState } from "react";
import {
  X,
  Users,
  Check,
  Ban,
  MessageCircle,
  ExternalLink,
  Store,
  Calendar,
  Clock,
  Sparkles,
  Search,
} from "lucide-react";
import { SolicitacaoExpositor, StatusSolicitacao } from "../types";
import { getWhatsAppUrl } from "../utils/formatters";

interface AdminSolicitacoesModalProps {
  aberto: boolean;
  onFechar: () => void;
  solicitacoes: SolicitacaoExpositor[];
  onAprovar: (solicitacao: SolicitacaoExpositor) => void;
  onRejeitar: (id: string) => void;
}

export const AdminSolicitacoesModal: React.FC<AdminSolicitacoesModalProps> = ({
  aberto,
  onFechar,
  solicitacoes,
  onAprovar,
  onRejeitar,
}) => {
  const [filtroStatus, setFiltroStatus] = useState<StatusSolicitacao | "todas">("pendente");
  const [busca, setBusca] = useState("");

  if (!aberto) return null;

  const filtradas = solicitacoes.filter((item) => {
    const condStatus = filtroStatus === "todas" || item.status === filtroStatus;
    const termo = busca.toLowerCase().trim();
    const condBusca =
      !termo ||
      item.nomeNegocio.toLowerCase().includes(termo) ||
      item.responsavel.toLowerCase().includes(termo) ||
      item.categoria.toLowerCase().includes(termo);
    return condStatus && condBusca;
  });

  const pendentesCount = solicitacoes.filter((s) => s.status === "pendente").length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-up">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#FAF1DE] border-4 border-[#3D2014] rounded-3xl shadow-2xl overflow-hidden text-[#260E05]">
        {/* Header */}
        <div className="p-6 border-b-2 border-[#260E05]/15 flex items-center justify-between gap-4 bg-[#F8E4B8] bg-afro-grid">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#260E05] text-[#F9910F] text-xs font-bold uppercase tracking-wider mb-2">
              <Users className="w-3.5 h-3.5" />
              <span>Gestão de Candidaturas</span>
              {pendentesCount > 0 && (
                <span className="bg-[#F9910F] text-[#260E05] text-[10px] font-black px-2 py-0.2 rounded-full">
                  {pendentesCount} {pendentesCount === 1 ? "pendente" : "pendentes"}
                </span>
              )}
            </div>
            <h3 className="font-poster text-2xl sm:text-3xl uppercase text-[#260E05]">
              Candidaturas para Expor
            </h3>
            <p className="text-xs sm:text-sm text-[#3D2014]/80 font-medium">
              Analise os formulários recebidos e aprove expositores diretamente para o catálogo da Vitrine.
            </p>
          </div>

          <button
            onClick={onFechar}
            className="p-2 rounded-full bg-[#260E05]/10 hover:bg-[#260E05] hover:text-[#FAF1DE] transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters and search toolbar */}
        <div className="p-4 sm:p-5 border-b border-[#260E05]/10 bg-white/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Status buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setFiltroStatus("pendente")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                filtroStatus === "pendente"
                  ? "bg-[#260E05] text-[#FAF1DE] shadow-sm"
                  : "bg-white text-[#260E05] border border-[#D8C29D]"
              }`}
            >
              Pendentes ({pendentesCount})
            </button>

            <button
              onClick={() => setFiltroStatus("aprovado")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                filtroStatus === "aprovado"
                  ? "bg-[#16594C] text-white shadow-sm"
                  : "bg-white text-[#260E05] border border-[#D8C29D]"
              }`}
            >
              Aprovadas ({solicitacoes.filter((s) => s.status === "aprovado").length})
            </button>

            <button
              onClick={() => setFiltroStatus("rejeitado")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                filtroStatus === "rejeitado"
                  ? "bg-stone-700 text-white shadow-sm"
                  : "bg-white text-[#260E05] border border-[#D8C29D]"
              }`}
            >
              Recusadas ({solicitacoes.filter((s) => s.status === "rejeitado").length})
            </button>

            <button
              onClick={() => setFiltroStatus("todas")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                filtroStatus === "todas"
                  ? "bg-[#260E05] text-[#FAF1DE] shadow-sm"
                  : "bg-white text-[#260E05] border border-[#D8C29D]"
              }`}
            >
              Todas ({solicitacoes.length})
            </button>
          </div>

          {/* Search bar */}
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-[#3D2014]/50 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar candidatura..."
              className="w-full pl-9 pr-3 py-1.5 rounded-full bg-white border border-[#D8C29D] text-xs font-medium focus:outline-none focus:border-[#F9910F]"
            />
          </div>
        </div>

        {/* Applications list */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {filtradas.length > 0 ? (
            filtradas.map((sol) => (
              <div
                key={sol.id}
                className="bg-white border-2 border-[#D8C29D] rounded-2xl p-5 shadow-xs hover:border-[#260E05] transition-all flex flex-col md:flex-row gap-5 items-start justify-between"
              >
                {/* Visual Avatar / Photo */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl overflow-hidden border-2 border-[#260E05] bg-[#260E05]">
                  {sol.foto ? (
                    <img
                      src={sol.foto}
                      alt={sol.nomeNegocio}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-poster text-2xl text-[#F9910F]">
                      {sol.nomeNegocio.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-poster text-lg sm:text-xl text-[#260E05] uppercase">
                      {sol.nomeNegocio}
                    </h4>

                    {/* Status badge */}
                    {sol.status === "pendente" && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
                        Pendente
                      </span>
                    )}
                    {sol.status === "aprovado" && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Aprovado na Vitrine
                      </span>
                    )}
                    {sol.status === "rejeitado" && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-stone-100 text-stone-600 border border-stone-300">
                        Recusado
                      </span>
                    )}

                    <span className="text-[11px] font-bold text-[#F9910F] bg-[#260E05] px-2.5 py-0.5 rounded-full">
                      {sol.categoria}
                    </span>
                  </div>

                  <p className="text-xs text-[#3D2014]/70 font-medium">
                    Responsável: <strong className="text-[#260E05]">{sol.responsavel}</strong> •
                    Enviado em: {sol.dataEnvio}
                  </p>

                  <p className="text-sm text-[#3D2014] font-medium leading-relaxed bg-[#FAF1DE] p-3 rounded-xl border border-[#D8C29D]/50">
                    {sol.descricao}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-semibold pt-1">
                    <a
                      href={getWhatsAppUrl(sol.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#128C7E] hover:underline"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp: {sol.whatsapp}</span>
                    </a>

                    {sol.instagram && (
                      <span className="text-[#3D2014]/80">
                        Instagram: <strong className="text-[#260E05]">{sol.instagram}</strong>
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0 self-stretch md:self-center justify-end">
                  {sol.status === "pendente" && (
                    <>
                      <button
                        onClick={() => onAprovar(sol)}
                        className="inline-flex items-center justify-center gap-1.5 bg-[#16594C] hover:bg-[#0E3D34] text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                        title="Aprovar e adicionar ao catálogo da vitrine"
                      >
                        <Check className="w-4 h-4" />
                        <span>Aprovar Expositor</span>
                      </button>

                      <button
                        onClick={() => onRejeitar(sol.id)}
                        className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                        title="Recusar solicitação"
                      >
                        <Ban className="w-3.5 h-3.5 text-stone-500" />
                        <span>Recusar</span>
                      </button>
                    </>
                  )}

                  <a
                    href={`https://api.whatsapp.com/send?phone=55${sol.whatsapp.replace(/\D/g, "")}&text=Ol%C3%A1%20${encodeURIComponent(sol.responsavel)}!%20Falamos%20da%20organiza%C3%A7%C3%A3o%20da%20Feira%20Negra%20de%20Fortaleza%20sobre%20sua%20inscri%C3%A7%C3%A3o%20da%20marca%20${encodeURIComponent(sol.nomeNegocio)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 bg-[#FAF1DE] hover:bg-[#D8C29D] text-[#260E05] border border-[#260E05]/20 px-3 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#128C7E]" />
                    <span>Falar no WhatsApp</span>
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-14 bg-white/70 rounded-2xl border border-[#D8C29D]">
              <Users className="w-12 h-12 text-[#3D2014]/30 mx-auto mb-3" />
              <h4 className="font-poster text-lg text-[#260E05] uppercase">
                Nenhuma candidatura encontrada
              </h4>
              <p className="text-xs text-[#3D2014]/70 mt-1">
                {filtroStatus === "pendente"
                  ? "Não há candidaturas pendentes no momento. Todas foram avaliadas!"
                  : "Nenhum registro para o filtro selecionado."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
