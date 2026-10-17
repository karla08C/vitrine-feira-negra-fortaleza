export function formatWhatsApp(val: string): string {
  const digits = (val || "").replace(/\D/g, "").slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function unformatDigits(val: string): string {
  return (val || "").replace(/\D/g, "");
}

export function isValidWhatsApp(val: string): boolean {
  const digits = unformatDigits(val);
  return digits.length === 10 || digits.length === 11;
}

export function getWhatsAppUrl(val: string): string {
  const digits = unformatDigits(val);
  return `https://wa.me/55${digits}`;
}

export function getBusinessShareUrl(id: string): string {
  if (typeof window !== "undefined") {
    const url = new URL(window.location.href);
    url.hash = `card-negocio-${id}`;
    return url.toString();
  }
  return `#card-negocio-${id}`;
}

export function getFormattedShareMessage(
  negocio: { id: string; nome: string; categoria: string; descricao: string; whatsapp?: string },
  customUrl?: string
): string {
  const url = customUrl || getBusinessShareUrl(negocio.id);
  const waDigits = negocio.whatsapp ? unformatDigits(negocio.whatsapp) : "";
  const waContato = waDigits ? `📱 WhatsApp do empreendedor: https://wa.me/55${waDigits}` : "";

  return [
    `✨ *Conheça ${negocio.nome} na Vitrine Negra de Fortaleza!*`,
    `🏷️ *Categoria:* ${negocio.categoria}`,
    `💬 ${negocio.descricao}`,
    waContato,
    `\n🌟 *Acesse a vitrine digital e fortaleça o afroempreendedorismo:*`,
    `👉 ${url}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function getWhatsAppShareUrl(
  negocio: { id: string; nome: string; categoria: string; descricao: string; whatsapp?: string },
  customUrl?: string
): string {
  const message = getFormattedShareMessage(negocio, customUrl);
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
}
