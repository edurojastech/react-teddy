export default function formatarParaMoedaReal(valor: string | number): string {
  let numero: number;

  if (typeof valor === 'string') {
    // Troca vírgula por ponto para parseFloat funcionar
    const valorNormalizado = valor.replace(',', '.').replace(/[^\d.]/g, '');
    numero = parseFloat(valorNormalizado);
  } else {
    numero = valor;
  }

  if (isNaN(numero) || numero === null) {
    return 'R$ 0,00';
  }

  return numero.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });
}
