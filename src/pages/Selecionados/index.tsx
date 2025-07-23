/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../../layouts/Dashboard";
import Card from "../../components/Card";
import "./styles.css"

export default function Selecionados() {
  const [userName, setUserName] = useState(localStorage.getItem("UserName"));
  const navigate = useNavigate();

  const handleAdd = () => alert('Adicionar clicado!');
  const handleEdit = () => alert('Editar clicado!');
  const handleDelete = () => alert('Excluir clicado!');

  useEffect(() => {
    userName == null && navigate("/");
  }, [userName]);

  return (
    <main>
      <Dashboard nameUser={userName}>
        <div className="container mt-3">
          <h4>Clientes selecionados:</h4>
        </div>
        <div className="container grid mt-2">
          <Card
            nome="Eduardo"
            salario={3500}
            empresa={120000}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <Card
            nome="Eduardo"
            salario={3500}
            empresa={120000}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <Card
            nome="Eduardo"
            salario={3500}
            empresa={120000}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <Card
            nome="Eduardo"
            salario={3500}
            empresa={120000}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </Dashboard>
    </main>
  );
}
