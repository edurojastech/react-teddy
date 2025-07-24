/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type Cliente } from "../../types/Cliente";
import { clientesMocks } from "../../mocks/clientes";
import ModalCliente from "../../components/Modais/ModalCliente";
import Dashboard from "../../layouts/Dashboard";
import Card from "../../components/Card";
import { limparNumero } from "../../utils/moneyFormat";
import "./styles.css"

export default function Home() {
  const [userName, setUserName] = useState(localStorage.getItem("UserName"));
  const navigate = useNavigate();

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);

  const abrirCadastro = () => {
    setClienteEditando(null);
    setMostrarModal(true);
  }

  const abrirEdicao = (cliente: Cliente) => {
    setClienteEditando(cliente);
    setMostrarModal(true);

    return
  };

  const handleAdd = () => alert('Adicionar clicado!')

  const handleEdit = () => { alert('Editar clicado!') }

  const handleDelete = () => alert('Excluir clicado!');

  const handleSubmit = (novoCliente: Cliente) => {
    if (clienteEditando) {
      setClientes((prev) =>
        prev.map((c) =>
          c === clienteEditando ? novoCliente : c
        )
      );
    } else {
      setClientes((prev) => [...prev, novoCliente]);
    }
    setClienteEditando(null);
  };

  useEffect(() => {
    userName == null && navigate("/");
  }, [userName]);

  return (
    <main>
      <Dashboard nameUser={userName}>
        <div className="container mt-3">
          <p><b>{clientesMocks.length}</b> clientes encontrados:</p>
        </div>
        <div className="container grid">
          {
            clientesMocks.map(({ nome, salario, valorEmpresa}, key) => {
              return (
                <Card
                  key={key}
                  nome={nome}
                  salario={salario}
                  empresa={valorEmpresa}
                  onAdd={handleAdd}
                  onEdit={() => abrirEdicao({
                    nome: nome,
                    salario: limparNumero(`${salario}`),
                    valorEmpresa:  limparNumero(`${valorEmpresa}`)
                  })}
                  onDelete={handleDelete}
                />
              )
            })
          }
        </div>

        <div className="container d-grid mb-5">
          <button className="btn btn-outline-primary btn-block" onClick={abrirCadastro}>
            Criar cliente
          </button>
        </div>

        <ModalCliente
          show={mostrarModal}
          onClose={() => setMostrarModal(false)}
          onSubmit={handleSubmit}
          clienteEditando={clienteEditando}
        />
      </Dashboard>
    </main>
  );
}
