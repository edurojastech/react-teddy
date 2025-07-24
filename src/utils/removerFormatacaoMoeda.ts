export default function removerFormatacaoMoeda(valor: string | number): number {
  if (typeof valor === 'number') return valor;

  // Remove "R$", pontos e espaços, substitui vírgula por ponto
  const numero = valor
    .replace(/\s/g, '') // remove espaços
    .replace('R$', '') // remove o símbolo R$
    .replace(/\./g, '') // remove pontos
    .replace(',', '.') // troca vírgula por ponto

  const resultado = parseFloat(numero);

  return isNaN(resultado) ? 0 : resultado;
}
