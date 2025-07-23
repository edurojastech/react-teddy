/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from 'react';
import type { ModalClienteProps } from '../../../types/Cliente';
import { formatarParaReal, limparNumero } from '../../../utils/moneyFormat';

const ModalCliente: React.FC<ModalClienteProps> = ({
  show,
  onClose,
  onSubmit,
  clienteEditando = null,
}) => {
  const [nome, setNome] = useState('');
  const [salario, setSalario] = useState('');
  const [valorEmpresa, setValorEmpresa] = useState('');

  const MoneyChange = (e: React.ChangeEvent<HTMLInputElement>, typeSalario:boolean) => {
    const valorDigitado = e.target.value;
    const numeroLimpo = limparNumero(valorDigitado);
    
    typeSalario ? setSalario(numeroLimpo) : setValorEmpresa(numeroLimpo)
  };

  useEffect(() => {
    if (clienteEditando) {
      setNome(clienteEditando.nome);
      setSalario(clienteEditando.salario);
      setValorEmpresa(clienteEditando.valorEmpresa);
    } else {
      setNome('');
      setSalario('');
      setValorEmpresa('');
    }
  }, [clienteEditando, show]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ nome, salario, valorEmpresa });
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
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Digite o nome:"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Digite o salário:"
                value={formatarParaReal(salario)}
                onChange={(e) => MoneyChange(e, true)}
                required
              />
              <input
                type="text"
                className="form-control"
                placeholder="Digite o valor da empresa:"
                value={formatarParaReal(valorEmpresa)}
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
