/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import "./style.css"
import formatarParaMoedaReal from '../../utils/formatarValorReal';
import type { CardInfoProps } from '../../types/CardInfoProps';


const Card: React.FC<CardInfoProps> = ({ nome, salario, empresa, onAdd, onEdit, onDelete }) => {
  return (
    <div className="card shadow-sm p-3 mb-3">
      <h5 className="fw-bold mb-4" style={{ height: 60}}>{nome}</h5>
      <p className='mb-1'>Salário: {formatarParaMoedaReal(salario)}</p>
      <p>Empresa: {formatarParaMoedaReal(empresa)}</p>
      <div className="d-flex justify-content-between align-items-center" style={{ height: 40 }}>
        <i className="bi bi-plus-lg fs-4" style={{ cursor: 'pointer' }} onClick={onAdd}></i>
        <i className="bi bi-pencil fs-5" style={{ cursor: 'pointer' }} onClick={onEdit}></i>
        <i className="bi bi-trash-fill text-danger fs-5" style={{ cursor: 'pointer' }} onClick={onDelete}></i>
      </div>
    </div>
  );
};

export default Card;
