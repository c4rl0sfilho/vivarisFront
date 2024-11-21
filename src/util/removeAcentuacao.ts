export function removeAcentuacao(texto: string): string {
    return texto
      .normalize("NFD") // Separa os caracteres com acentuação em suas partes
      .replace(/[\u0300-\u036f]/g, ""); // Remove os diacríticos
  }