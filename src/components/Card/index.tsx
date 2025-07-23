import React from 'react';
import "./style.css"

interface CardInfoProps {
  nome: string;
  salario: number;
  empresa: number;
  onAdd: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const Card: React.FC<CardInfoProps> = ({ nome, salario, empresa, onAdd, onEdit, onDelete }) => {
  return (
    <div className="card shadow-sm p-3 mb-3">
      <h5 className="fw-bold">{nome}</h5>
      <p>Salário: R${salario.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
      <p>Empresa: R${empresa.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
      <div className="d-flex justify-content-between align-items-center px-4 mt-3">
        <i className="bi bi-plus-lg fs-4" style={{ cursor: 'pointer' }} onClick={onAdd}></i>
        <i className="bi bi-pencil fs-5" style={{ cursor: 'pointer' }} onClick={onEdit}></i>
        <i className="bi bi-trash-fill text-danger fs-5" style={{ cursor: 'pointer' }} onClick={onDelete}></i>
      </div>
    </div>
  );
};

export default Card;
