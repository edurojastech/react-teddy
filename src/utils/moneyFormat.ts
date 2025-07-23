export const limparNumero = (valor: string) => valor.replace(/[^\d]/g, '');

// Formatar para moeda real
export const formatarParaReal = (valor: string): string => {
  const numeroLimpo = limparNumero(valor);

  const numero = parseFloat(numeroLimpo) / 100;
  if (isNaN(numero)) return '';

  return numero.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};