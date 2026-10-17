import React, { useState, useEffect } from "react";
import { Share2, MessageCircle, Copy, Check, X, ExternalLink, Sparkles } from "lucide-react";
import { Negocio, ToastInfo } from "../types";
import {
  getBusinessShareUrl,
  getFormattedShareMessage,
  getWhatsAppShareUrl,
} from "../utils/formatters";
import { getCategoriaCor } from "../data/seedData";

interface CompartilharModalProps {
  negocio: Negocio | null;
  aberto: boolean;
  onFechar: () => void;
  onToast: (toast: ToastInfo) => void;
}

export const CompartilharModal: React.FC<CompartilharModalProps> = ({
  negocio,
  aberto,
  onFechar,
  onToast,
}) => {
  const [copiouLink, setCopiouLink] = useState(false);
  const [copiouTexto, setCopiouTexto] = useState(false);

  useEffect(() => {
    if (!aberto) return;
    setCopiouLink(false);
    setCopiouTexto(false);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onFechar();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [aberto, onFechar]);

  if (!aberto || !negocio) return null;

  const shareUrl = getBusinessShareUrl(negocio.id);
  const mensagemFormatada = getFormattedShareMessage(negocio, shareUrl);
  const whatsAppShareUrl = getWhatsAppShareUrl(negocio, shareUrl);
  const corCategoria = getCategoriaCor(negocio.categoria);
  const temSuporteNativeShare = typeof navigator !== "undefined" && !!navigator.share;

  async function handleCopiarLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiouLink(true);
      onToast({
        titulo: "Link copiado! 🔗",
        mensagem: `Link para “${negocio?.nome}” copiado para a área de transferência.`,
      });
      setTimeout(() => setCopiouLink(false), 2500);
    } catch {
      fallbackCopy(shareUrl);
      setCopiouLink(true);
      onToast({
        titulo: "Link copiado! 🔗",
        mensagem: "Compartilhe o link com amigos e clientes.",
      });
      setTimeout(() => setCopiouLink(false), 2500);
    }
  }

  async function handleCopiarTexto() {
    try {
      await navigator.clipboard.writeText(mensagemFormatada);
      setCopiouTexto(true);
      onToast({
        titulo: "Mensagem copiada! 📋",
        mensagem: "Mensagem pronta para colar no WhatsApp, Instagram ou redes sociais.",
      });
      setTimeout(() => setCopiouTexto(false), 2500);
    } catch {
      fallbackCopy(mensagemFormatada);
      setCopiouTexto(true);
      onToast({
        titulo: "Mensagem copiada! 📋",
        mensagem: "Cole onde quiser para divulgar este negócio.",
      });
      setTimeout(() => setCopiouTexto(false), 2500);
    }
  }

  function fallbackCopy(text: string) {
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }

  async function handleNativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${negocio?.nome} — Vitrine Negra Fortaleza`,
          text: `Conheça ${negocio?.nome} na Vitrine Negra de Fortaleza!\n\n${negocio?.descricao}`,
          url: shareUrl,
        });
      } catch (e) {
        // User cancelled
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-sm animate-scale-in"
        onClick={onFechar}
      />

      {/* Modal Card */}
      <div className="relative bg-white w-full sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl shadow-2xl animate-scale-in border border-stone-200">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 py-5 border-b border-stone-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-orange-50 text-[#E04823] flex items-center justify-center shrink-0 border border-orange-100">
            <Share2 className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-display text-xl font-bold leading-tight text-stone-900 truncate">
              Divulgar Empreendimento
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Envie no WhatsApp ou copie o link formatado
            </p>
          </div>
          <button
            id="share-modal-close-btn"
            onClick={onFechar}
            className="w-9 h-9 rounded-full hover:bg-stone-100 flex items-center justify-center transition-colors text-stone-400 hover:text-stone-700 cursor-pointer"
            aria-label="Fechar modal de compartilhamento"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Target Business Card Highlight */}
          <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80">
            {negocio.foto ? (
              <img
                src={negocio.foto}
                alt={negocio.nome}
                className="w-14 h-14 rounded-xl object-cover shrink-0 border border-stone-200"
              />
            ) : (
              <div
                className="w-14 h-14 rounded-xl bg-[#141210] flex items-center justify-center text-xl font-bold font-display shrink-0 text-white/40"
              >
                {negocio.nome.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <span
                className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full mb-1"
                style={{ backgroundColor: corCategoria.tintBg, color: corCategoria.tintText }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: corCategoria.dotColor }} />
                <span>{negocio.categoria}</span>
              </span>
              <h3 className="font-display text-base font-bold text-stone-900 truncate leading-tight">
                {negocio.nome}
              </h3>
              <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                {negocio.descricao}
              </p>
            </div>
          </div>

          {/* WhatsApp Direct Action Banner */}
          <a
            id="share-modal-whatsapp-btn"
            href={whatsAppShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2.5 bg-[#128C7E] hover:bg-[#0E7064] text-white px-5 py-3.5 rounded-2xl font-semibold shadow-xs hover:shadow transition-all active:scale-[0.98] text-sm sm:text-base cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Compartilhar no WhatsApp</span>
            <ExternalLink className="w-4 h-4 ml-auto opacity-80" />
          </a>

          {/* Message Preview */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Mensagem pronta para envio
              </span>
              <button
                id="copy-text-btn"
                onClick={handleCopiarTexto}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#E04823] hover:text-[#C83E1D] transition-colors cursor-pointer"
              >
                {copiouTexto ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copiada!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar texto</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 font-mono whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto selection:bg-[#E04823]/20">
              {mensagemFormatada}
            </div>
          </div>

          {/* Share Link Field */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
              Link direto do negócio
            </span>
            <div className="flex items-center gap-2">
              <input
                id="share-link-input"
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 truncate select-all focus:outline-none"
              />
              <button
                id="copy-link-btn"
                onClick={handleCopiarLink}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-800 text-xs font-bold transition-colors shrink-0 cursor-pointer shadow-xs"
              >
                {copiouLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Native Mobile Share Option */}
          {temSuporteNativeShare && (
            <button
              id="native-share-btn"
              onClick={handleNativeShare}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-stone-200 hover:bg-stone-50 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Abrir menu do celular (Instagram, Mensagens, etc.)</span>
            </button>
          )}

          {/* Close button */}
          <div className="pt-1">
            <button
              id="share-modal-cancel-btn"
              type="button"
              onClick={onFechar}
              className="w-full py-3 rounded-full border border-stone-200 text-sm font-semibold hover:bg-stone-50 transition-colors cursor-pointer text-stone-700"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
