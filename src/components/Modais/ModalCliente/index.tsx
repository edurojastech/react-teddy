/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from 'react';
import type { ModalClienteProps } from '../../../types/Cliente';
import { formatarParaReal, limparNumero } from '../../../utils/moneyFormat';
import formatarParaMoedaReal from '../../../utils/formatarValorReal';
import removerFormatacaoMoeda from '../../../utils/removerFormatacaoMoeda';

const ModalCliente: React.FC<ModalClienteProps> = ({
  show,
  onClose,
  onSubmit,
  clienteEditando = null,
}) => {
  const [name, setNome] = useState('');
  const [salary, setSalario] = useState('');
  const [companyValuation, setValorEmpresa] = useState('');

  const MoneyChange = (e: React.ChangeEvent<HTMLInputElement>, typeSalario:boolean) => {
    const valorDigitado = e.target.value;
    const numeroLimpo = limparNumero(valorDigitado);
    typeSalario ? setSalario(formatarParaReal(numeroLimpo)) : setValorEmpresa(formatarParaReal(numeroLimpo))
  };

  useEffect(() => {
    if (clienteEditando) {
      setNome(clienteEditando.name);
      setSalario(formatarParaMoedaReal(clienteEditando.salary))
      setValorEmpresa(formatarParaMoedaReal(clienteEditando.companyValuation))
    } else {
      setNome('');
      setSalario('');
      setValorEmpresa('');
    }
  }, [clienteEditando, show]);

  const handleSubmit = (e: React.FormEvent) => {
    const valorEmpresa = removerFormatacaoMoeda(companyValuation)
    const valorSalario = removerFormatacaoMoeda(salary)
    e.preventDefault();
    onSubmit({ name, salary: valorSalario, companyValuation: valorEmpresa });
    onClose();
  };

  if (!show) return null;
  const modoEdicao = clienteEditando !== null;

  return (
    <div
      className="modal show d-block"
      tabIndex={-1}
      role="dialog"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog modal-dialog-centered animate__animated animate__zoomIn" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold">
              {modoEdicao ? 'Editar cliente:' : 'Criar cliente:'}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <label htmlFor="name">Nome:</label>
              <input
                name='name'
                type="text"
                className="form-control mb-3"
                placeholder="Digite o nome:"
                value={name}
                onChange={(e) => setNome(e.target.value)}
                required
              />

              <label htmlFor="salary">Salário:</label>
              <input
                name='salary'
                type="text"
                className="form-control mb-3"
                placeholder="Digite o salário:"
                value={salary}
                onChange={(e) => MoneyChange(e, true)}
                required
              />

              <label htmlFor="companyValuation">Valor da empresa:</label>
              <input
                name='companyValuation'
                type="text"
                className="form-control"
                placeholder="Digite o valor da empresa:"
                value={companyValuation}
                onChange={(e) => MoneyChange(e, false)}
                required
              />
            </div>

            <div className="modal-footer">
              <button
                type="submit"
                className="btn w-100 text-white"
                style={{ backgroundColor: '#f15a24' }}
              >
                {modoEdicao ? 'Salvar alterações' : 'Criar cliente'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalCliente;
