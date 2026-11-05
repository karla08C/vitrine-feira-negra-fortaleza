import React, { useState, useEffect } from "react";
import { KeyRound, ShieldAlert, Lock, Eye, EyeOff, X, Check, AlertCircle } from "lucide-react";

interface AlterarSenhaModalProps {
  aberto: boolean;
  onFechar: () => void;
  onSalvarNovaSenha: (novaSenha: string) => { success: boolean; message: string };
  isDefaultPassword?: boolean;
  onSucesso?: () => void;
}

export const AlterarSenhaModal: React.FC<AlterarSenhaModalProps> = ({
  aberto,
  onFechar,
  onSalvarNovaSenha,
  isDefaultPassword = false,
  onSucesso,
}) => {
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (aberto) {
      setNovaSenha("");
      setConfirmarSenha("");
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
    setErro("");

    const limpaNova = novaSenha.trim();
    const limpaConf = confirmarSenha.trim();

    if (!limpaNova) {
      setErro("Por favor, digite a nova senha.");
      return;
    }

    if (limpaNova.length < 4) {
      setErro("A nova senha deve ter no mínimo 4 caracteres.");
      return;
    }

    if (limpaNova !== limpaConf) {
      setErro("A confirmação da senha não confere com a nova senha digitada.");
      return;
    }

    const resultado = onSalvarNovaSenha(limpaNova);
    if (resultado.success) {
      if (onSucesso) onSucesso();
      onFechar();
    } else {
      setErro(resultado.message);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-950/70 backdrop-blur-xs transition-opacity"
        onClick={onFechar}
      />

      {/* Modal Container */}
      <div className="relative bg-[#FAF1DE] w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl border-2 sm:border-4 border-[#260E05] overflow-hidden z-10 animate-scale-in">
        {/* Header */}
        <div className="bg-[#260E05] text-[#FAF1DE] px-6 py-5 relative border-b-2 border-[#FAF1DE]/20">
          <button
            id="alterar-senha-close-btn"
            onClick={onFechar}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer text-[#FAF1DE]"
            aria-label="Fechar modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#F9910F] text-[#260E05] flex items-center justify-center shadow-md">
              <KeyRound className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold tracking-widest uppercase text-[#F9910F]">
                Segurança do Administrador
              </span>
              <h2 className="font-poster text-xl font-normal leading-tight text-[#FAF1DE] uppercase">
                Alterar Senha de Acesso
              </h2>
            </div>
          </div>
        </div>

        {/* Informative Security Notice */}
        <div className="px-6 pt-5 pb-2">
          {isDefaultPassword ? (
            <div className="p-3.5 rounded-2xl bg-amber-100 border border-amber-300 text-[#260E05] flex items-start gap-2.5">
              <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed">
                <p className="font-bold text-[#260E05]">Recomendação Importante</p>
                <p className="text-[#3D2014]/90 mt-0.5">
                  Você acabou de acessar o painel com a senha padrão do sistema (<strong>admin123</strong>). Defina agora uma nova senha exclusiva da organização para proteger o cadastro de expositores e eventos.
                </p>
              </div>
            </div>
          ) : (
            <p className="text-xs text-[#3D2014]/80 leading-relaxed font-medium">
              Defina uma nova senha para o acesso de gerenciamento e curadoria da Feira Negra de Fortaleza.
            </p>
          )}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* New Password Input */}
          <div>
            <label
              htmlFor="nova-senha-input"
              className="block text-xs font-bold uppercase tracking-wider text-[#260E05] mb-1.5"
            >
              Nova Senha
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#260E05]/40">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="nova-senha-input"
                type={mostrarSenha ? "text" : "password"}
                value={novaSenha}
                onChange={(e) => {
                  setNovaSenha(e.target.value);
                  if (erro) setErro("");
                }}
                placeholder="Mínimo de 4 caracteres"
                autoFocus
                className="w-full pl-10 pr-12 py-3 rounded-xl bg-white border-2 border-[#260E05]/20 text-sm text-[#260E05] placeholder:text-[#260E05]/40 focus:outline-none focus:border-[#F9910F] transition-all font-medium"
              />
              <button
                type="button"
                onClick={() => setMostrarSenha((prev) => !prev)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#260E05]/40 hover:text-[#260E05] transition-colors cursor-pointer"
                aria-label={mostrarSenha ? "Ocultar senha" : "Ver senha"}
              >
                {mostrarSenha ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm New Password Input */}
          <div>
            <label
              htmlFor="confirmar-senha-input"
              className="block text-xs font-bold uppercase tracking-wider text-[#260E05] mb-1.5"
            >
              Confirmar Nova Senha
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#260E05]/40">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="confirmar-senha-input"
                type={mostrarSenha ? "text" : "password"}
                value={confirmarSenha}
                onChange={(e) => {
                  setConfirmarSenha(e.target.value);
                  if (erro) setErro("");
                }}
                placeholder="Repita a nova senha"
                className="w-full pl-10 pr-12 py-3 rounded-xl bg-white border-2 border-[#260E05]/20 text-sm text-[#260E05] placeholder:text-[#260E05]/40 focus:outline-none focus:border-[#F9910F] transition-all font-medium"
              />
            </div>
          </div>

          {/* Error Message */}
          {erro && (
            <div className="flex items-center gap-1.5 p-2.5 rounded-xl bg-red-100 border border-red-300 text-xs text-red-800 font-semibold animate-fade-up">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-700" />
              <span>{erro}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
            <button
              id="salvar-nova-senha-btn"
              type="submit"
              className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#260E05] hover:bg-[#F9910F] text-[#FAF1DE] hover:text-[#260E05] font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Check className="w-4 h-4" />
              <span>Salvar Nova Senha</span>
            </button>

            <button
              id="cancelar-alterar-senha-btn"
              type="button"
              onClick={onFechar}
              className="w-full sm:w-auto py-3 px-4 rounded-xl border border-[#260E05]/20 hover:bg-[#260E05]/5 text-[#260E05] font-semibold text-xs tracking-wider transition-colors cursor-pointer"
            >
              Lembrar mais tarde
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
