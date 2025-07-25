/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from 'react';
import type { ModalDeleteProps } from '../../../types/Cliente';

const ModalDelete: React.FC<ModalDeleteProps> = ({
  show,
  onClose,
  onDelete,
  clienteRemover = null,
}) => {
  const [name, setNome] = useState('');
  const [id, setId] = useState('')

  useEffect(() => {
    if (clienteRemover) {
      setNome(clienteRemover.name)
      setId(clienteRemover.id)
    }
  }, [clienteRemover, show, id]);

  if (!show) return null
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
              Excluir cliente:
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>Você está prestes a excluir o cliente: <b>{name}</b></p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn w-100 text-white"
              style={{ backgroundColor: '#f15a24' }}
              onClick={onDelete}
            >
              Excluir cliente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
