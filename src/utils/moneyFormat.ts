/* eslint-disable @typescript-eslint/no-explicit-any */
export const limparNumero = (valor: any) => valor?.replace(/[^\d]/g, '');

// Formatar para moeda real
export const formatarParaReal = (valor: string | number): string => {
  const numeroLimpo = limparNumero(valor);

  const numero = parseFloat(numeroLimpo) / 100;
  if (isNaN(numero)) return '';

  return numero.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  }); 
};