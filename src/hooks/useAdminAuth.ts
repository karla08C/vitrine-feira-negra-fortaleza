import { useState, useEffect, useCallback } from "react";

const AUTH_STORAGE_KEY = "vitrine_negra_admin_authenticated";
const PASSWORD_STORAGE_KEY = "vitrine_negra_admin_pass";
const DEFAULT_PASSWORD = "admin123";

export function useAdminAuth() {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  });

  const [currentPassword, setCurrentPassword] = useState<string>(() => {
    try {
      return localStorage.getItem(PASSWORD_STORAGE_KEY) || DEFAULT_PASSWORD;
    } catch {
      return DEFAULT_PASSWORD;
    }
  });

  useEffect(() => {
    try {
      if (isAdmin) {
        localStorage.setItem(AUTH_STORAGE_KEY, "true");
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch {}
  }, [isAdmin]);

  const login = useCallback(
    (password: string): boolean => {
      const storedPass =
        localStorage.getItem(PASSWORD_STORAGE_KEY) || DEFAULT_PASSWORD;
      if (password.trim() === storedPass.trim()) {
        setIsAdmin(true);
        return true;
      }
      return false;
    },
    []
  );

  const logout = useCallback(() => {
    setIsAdmin(false);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {}
  }, []);

  const alterarSenha = useCallback(
    (senhaAtual: string, novaSenha: string): { success: boolean; message: string } => {
      const storedPass =
        localStorage.getItem(PASSWORD_STORAGE_KEY) || DEFAULT_PASSWORD;

      if (senhaAtual.trim() !== storedPass.trim()) {
        return { success: false, message: "A senha atual informada está incorreta." };
      }

      if (novaSenha.trim().length < 4) {
        return { success: false, message: "A nova senha deve ter no mínimo 4 caracteres." };
      }

      try {
        localStorage.setItem(PASSWORD_STORAGE_KEY, novaSenha.trim());
        setCurrentPassword(novaSenha.trim());
        return { success: true, message: "Senha de administrador atualizada com sucesso!" };
      } catch {
        return { success: false, message: "Erro ao salvar nova senha no navegador." };
      }
    },
    []
  );

  return {
    isAdmin,
    login,
    logout,
    alterarSenha,
    defaultPassword: DEFAULT_PASSWORD,
  };
}
