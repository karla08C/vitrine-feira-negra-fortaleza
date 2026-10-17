import React, { useState, useEffect } from "react";
import { ShieldCheck, Lock, Eye, EyeOff, X, ArrowRight, MessageSquare, AlertCircle } from "lucide-react";

interface AdminLoginModalProps {
  aberto: boolean;
  onFechar: () => void;
  onLogin: (senha: string) => boolean;
  onSucesso: () => void;
  motivo?: "cadastrar" | "painel" | "geral";
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  aberto,
  onFechar,
  onLogin,
  onSucesso,
  motivo = "geral",
}) => {
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (aberto) {
      setSenha("");
      setErro("");
      setMostrarSenha(false);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onFechar();
      };
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    }
  }, [aberto, onFechar]);

  if (!aberto) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!senha.trim()) {
      setErro("Por favor, digite a senha de administrador.");
      return;
    }

    const sucesso = onLogin(senha);
    if (sucesso) {
      setErro("");
      onFechar();
      onSucesso();
    } else {
      setErro("Senha incorreta. Verifique os caracteres e tente novamente.");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-sm animate-scale-in"
        onClick={onFechar}
      />

      {/* Modal Container */}
      <div className="relative bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl animate-scale-in border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="bg-[#141210] text-[#FAF7F2] px-6 py-6 border-b border-stone-800 relative">
          <button
            id="admin-login-close-btn"
            onClick={onFechar}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer text-white/80 hover:text-white"
            aria-label="Fechar modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center border border-amber-400/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-amber-400">
                Área da Organização
              </span>
              <h2 className="font-display text-xl font-bold leading-tight text-white">
                Acesso de Administrador
              </h2>
            </div>
          </div>

          <p className="text-xs text-stone-300 mt-3 leading-relaxed">
            {motivo === "cadastrar"
              ? "Para manter a curadoria oficial da Feira Negra de Fortaleza, o cadastro de novas empresas é restrito aos organizadores autorizados."
              : "Área restrita à equipe organizadora para controle, cadastro e edição dos expositores da vitrine."}
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label
              htmlFor="admin-password-input"
              className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2"
            >
              Senha de Acesso
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="admin-password-input"
                type={mostrarSenha ? "text" : "password"}
                value={senha}
                onChange={(e) => {
                  setSenha(e.target.value);
                  if (erro) setErro("");
                }}
                placeholder="Digite a senha de admin"
                autoFocus
                className="w-full pl-10 pr-12 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#E04823]/30 focus:border-[#E04823] transition-all"
              />
              <button
                type="button"
                onClick={() => setMostrarSenha((prev) => !prev)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                aria-label={mostrarSenha ? "Ocultar senha" : "Ver senha"}
              >
                {mostrarSenha ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {erro && (
              <div className="flex items-center gap-1.5 mt-2 text-xs text-red-600 font-medium animate-fade-up">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{erro}</span>
              </div>
            )}

            <div className="mt-2.5 p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-[11px] text-stone-600 flex items-center justify-between gap-2">
              <span>Senha inicial padrão:</span>
              <code className="font-mono font-bold text-stone-900 bg-white px-2 py-0.5 rounded border border-stone-200">
                admin123
              </code>
            </div>
          </div>

          <button
            id="admin-login-submit-btn"
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#E04823] hover:bg-[#C83E1D] text-white font-semibold text-sm active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <span>Entrar como Administrador</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Help box for entrepreneurs */}
          <div className="pt-2 border-t border-stone-100">
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/60">
              <MessageSquare className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="font-semibold text-stone-900">É afroempreendedor de Fortaleza?</p>
                <p className="text-stone-600 mt-0.5 leading-normal">
                  Solicite a inclusão da sua marca diretamente com a curadoria da Feira Negra.
                </p>
                <a
                  href="https://wa.me/5585999990000?text=Ol%C3%A1!%20Sou%20afroempreendedor(a)%20e%20gostaria%20de%20cadastrar%20minha%20marca%20na%20Vitrine%20Negra%20Fortaleza."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#E04823] hover:underline font-semibold mt-1.5"
                >
                  Falar com a organização no WhatsApp →
                </a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
