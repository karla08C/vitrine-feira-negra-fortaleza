import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  X,
  ArrowRight,
  MessageSquare,
  AlertCircle,
  KeyRound,
  Check,
  ShieldAlert,
} from "lucide-react";

interface AdminLoginModalProps {
  aberto: boolean;
  onFechar: () => void;
  onLogin: (senha: string) => boolean;
  onSucesso: () => void;
  motivo?: "cadastrar" | "painel" | "geral";
}

const AUTH_STORAGE_KEY = "vitrine_negra_admin_authenticated";
const PASSWORD_STORAGE_KEY = "vitrine_negra_admin_pass";
const DEFAULT_PASSWORD = "admin123";

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  aberto,
  onFechar,
  onLogin,
  onSucesso,
  motivo = "geral",
}) => {
  const [passo, setPasso] = useState<"login" | "alterar_senha">("login");
  const [senha, setSenha] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [eraSenhaPadrao, setEraSenhaPadrao] = useState(false);

  useEffect(() => {
    if (aberto) {
      setSenha("");
      setNovaSenha("");
      setConfirmarSenha("");
      setErro("");
      setMostrarSenha(false);

      // Se já estiver autenticado no localStorage, abrir direto no modo de alterar senha
      try {
        const jaAutenticado = localStorage.getItem(AUTH_STORAGE_KEY) === "true";
        if (jaAutenticado) {
          setPasso("alterar_senha");
          const storedPass = localStorage.getItem(PASSWORD_STORAGE_KEY) || DEFAULT_PASSWORD;
          setEraSenhaPadrao(storedPass === DEFAULT_PASSWORD);
        } else {
          setPasso("login");
        }
      } catch {
        setPasso("login");
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          handleFecharLimpo();
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    }
  }, [aberto]);

  if (!aberto) return null;

  function handleFecharLimpo() {
    if (passo === "alterar_senha") {
      // Login já foi validado com sucesso anteriormente
      onSucesso();
    }
    onFechar();
  }

  function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!senha.trim()) {
      setErro("Por favor, digite a senha de administrador.");
      return;
    }

    const sucesso = onLogin(senha);
    if (sucesso) {
      setErro("");
      const isDefault = senha.trim() === DEFAULT_PASSWORD;
      setEraSenhaPadrao(isDefault);
      // Avança imediatamente para a etapa de pedir para alterar a senha
      setPasso("alterar_senha");
    } else {
      setErro("Senha incorreta. Verifique os caracteres e tente novamente.");
    }
  }

  function handleSalvarNovaSenhaSubmit(e: React.FormEvent) {
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

    try {
      localStorage.setItem(PASSWORD_STORAGE_KEY, limpaNova);
      // Notifica sucesso, atualiza senha e fecha o modal
      onSucesso();
      onFechar();
    } catch {
      setErro("Erro ao salvar a nova senha no navegador.");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-950/70 backdrop-blur-xs transition-opacity"
        onClick={handleFecharLimpo}
      />

      {/* Modal Container */}
      <div className="relative bg-[#FAF1DE] w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl border-2 sm:border-4 border-[#260E05] overflow-hidden z-10 animate-scale-in">
        {/* Header */}
        <div className="bg-[#260E05] text-[#FAF1DE] px-6 py-6 border-b-2 border-[#FAF1DE]/20 relative">
          <button
            id="admin-login-close-btn"
            onClick={handleFecharLimpo}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer text-[#FAF1DE]"
            aria-label="Fechar modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F9910F] text-[#260E05] flex items-center justify-center shadow-md">
              {passo === "login" ? (
                <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
              ) : (
                <KeyRound className="w-6 h-6 stroke-[2.5]" />
              )}
            </div>
            <div>
              <span className="text-[10px] font-extrabold tracking-widest uppercase text-[#F9910F]">
                {passo === "login" ? "Área da Organização" : "Segurança do Administrador"}
              </span>
              <h2 className="font-poster text-xl font-normal leading-tight text-[#FAF1DE] uppercase">
                {passo === "login" ? "Acesso de Administrador" : "Alterar Senha de Acesso"}
              </h2>
            </div>
          </div>

          <p className="text-xs text-[#FAF1DE]/80 mt-3 leading-relaxed">
            {passo === "login"
              ? motivo === "cadastrar"
                ? "Para manter a curadoria oficial da Feira Negra de Fortaleza, o gerenciamento de expositores e eventos é restrito aos organizadores."
                : "Área restrita à coordenação para aprovar candidaturas, cadastrar expositores e atualizar a programação."
              : "Acesso autorizado com sucesso! Recomendamos definir uma nova senha para proteger a gestão da vitrine e da feira."}
          </p>
        </div>

        {/* STEP 1: LOGIN */}
        {passo === "login" && (
          <form onSubmit={handleLoginSubmit} className="p-6 space-y-4">
            <div>
              <label
                htmlFor="admin-password-input"
                className="block text-xs font-bold uppercase tracking-wider text-[#260E05] mb-2"
              >
                Senha Atual de Acesso
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#260E05]/40">
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

              {erro && (
                <div className="flex items-center gap-1.5 mt-2.5 p-2 rounded-xl bg-red-100 border border-red-300 text-xs text-red-800 font-semibold animate-fade-up">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-700" />
                  <span>{erro}</span>
                </div>
              )}

              <div className="mt-2.5 p-2.5 rounded-xl bg-amber-500/10 border border-[#260E05]/15 text-[11px] text-[#260E05] flex items-center justify-between gap-2">
                <span className="flex items-center gap-1 font-semibold">
                  <KeyRound className="w-3 h-3 text-[#F9910F]" />
                  Senha padrão inicial:
                </span>
                <code className="font-mono font-bold text-[#260E05] bg-white px-2 py-0.5 rounded border border-[#260E05]/20">
                  admin123
                </code>
              </div>

              <p className="mt-2 text-[11px] text-[#3D2014]/70 italic flex items-center gap-1">
                <span>💡</span>
                <span>Ao entrar, o sistema solicitará que você atualize sua senha por segurança.</span>
              </p>
            </div>

            <button
              id="admin-login-submit-btn"
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#260E05] hover:bg-[#F9910F] text-[#FAF1DE] hover:text-[#260E05] font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Entrar como Administrador</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Help box for entrepreneurs */}
            <div className="pt-2 border-t border-[#260E05]/10">
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white border border-[#260E05]/15">
                <MessageSquare className="w-4 h-4 text-[#F9910F] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-bold text-[#260E05]">É afroempreendedor de Fortaleza?</p>
                  <p className="text-[#3D2014]/80 mt-0.5 leading-normal">
                    Você não precisa de senha para participar. Envie sua inscrição diretamente na aba <strong>Quero Expor</strong>.
                  </p>
                  <a
                    href="#quero-expor"
                    onClick={handleFecharLimpo}
                    className="inline-flex items-center gap-1 text-[#F9910F] hover:text-[#260E05] font-bold mt-1.5 uppercase text-[10px] tracking-wider"
                  >
                    Ir para formulário de inscrição →
                  </a>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* STEP 2: PEDIR PARA ALTERAR A SENHA (QUANDO ENTRA NO ADMIN) */}
        {passo === "alterar_senha" && (
          <form onSubmit={handleSalvarNovaSenhaSubmit} className="p-6 space-y-4">
            {/* Aviso de segurança amigável */}
            {eraSenhaPadrao ? (
              <div className="p-3.5 rounded-2xl bg-amber-100 border border-amber-300 text-[#260E05] flex items-start gap-2.5">
                <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed">
                  <p className="font-bold text-[#260E05]">Recomendação de Segurança</p>
                  <p className="text-[#3D2014]/90 mt-0.5">
                    Você utilizou a senha padrão (<strong>admin123</strong>). Por favor, defina uma nova senha exclusiva da sua equipe organizadora.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-stone-100 border border-stone-200 text-xs text-[#260E05] leading-relaxed">
                Digite uma nova senha com no mínimo 4 caracteres para proteger o painel.
              </div>
            )}

            {/* Nova Senha */}
            <div>
              <label
                htmlFor="nova-senha-modal-input"
                className="block text-xs font-bold uppercase tracking-wider text-[#260E05] mb-1.5"
              >
                Nova Senha de Administrador
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#260E05]/40">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="nova-senha-modal-input"
                  type={mostrarSenha ? "text" : "password"}
                  value={novaSenha}
                  onChange={(e) => {
                    setNovaSenha(e.target.value);
                    if (erro) setErro("");
                  }}
                  placeholder="Mínimo 4 caracteres"
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

            {/* Confirmar Nova Senha */}
            <div>
              <label
                htmlFor="confirmar-senha-modal-input"
                className="block text-xs font-bold uppercase tracking-wider text-[#260E05] mb-1.5"
              >
                Confirmar Nova Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#260E05]/40">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="confirmar-senha-modal-input"
                  type={mostrarSenha ? "text" : "password"}
                  value={confirmarSenha}
                  onChange={(e) => {
                    setConfirmarSenha(e.target.value);
                    if (erro) setErro("");
                  }}
                  placeholder="Digite novamente a nova senha"
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-white border-2 border-[#260E05]/20 text-sm text-[#260E05] placeholder:text-[#260E05]/40 focus:outline-none focus:border-[#F9910F] transition-all font-medium"
                />
              </div>
            </div>

            {erro && (
              <div className="flex items-center gap-1.5 p-2.5 rounded-xl bg-red-100 border border-red-300 text-xs text-red-800 font-semibold animate-fade-up">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-700" />
                <span>{erro}</span>
              </div>
            )}

            {/* Ações */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
              <button
                id="salvar-nova-senha-btn"
                type="submit"
                className="w-full sm:flex-1 py-3.5 px-4 rounded-xl bg-[#260E05] hover:bg-[#F9910F] text-[#FAF1DE] hover:text-[#260E05] font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Check className="w-4 h-4" />
                <span>Salvar Nova Senha</span>
              </button>

              <button
                id="pular-alterar-senha-btn"
                type="button"
                onClick={handleFecharLimpo}
                className="w-full sm:w-auto py-3 px-4 rounded-xl border border-[#260E05]/20 hover:bg-[#260E05]/5 text-[#260E05] font-semibold text-xs tracking-wider transition-colors cursor-pointer text-center"
              >
                Manter senha atual
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
