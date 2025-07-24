/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type Cliente } from "../../types/Cliente";
import { getClients } from "../../API/fetch";
import { limparNumero } from "../../utils/moneyFormat";
import Card from "../../components/Card";
import ModalCliente from "../../components/Modais/ModalCliente";
import Dashboard from "../../layouts/Dashboard";
import "./styles.css";



export default function Home() {
  const [userName, setUserName] = useState(localStorage.getItem("UserName"));
  const navigate = useNavigate();

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clientesList, setClientesList] = useState([])
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
    getClients(1, 20).then(resp => setClientesList(resp.clients))
  }, [userName]);

  return (
    <main>
      <Dashboard nameUser={userName}>
        <div className="container mt-3">
          <p><b>{clientesList.length}</b> clientes encontrados:</p>
        </div>
        <div className="container grid">
          {
            clientesList?.map(({ name, salary, companyValuation}, key) => {
              return (
                <Card
                  key={key}
                  nome={name}
                  salario={salary}
                  empresa={companyValuation}
                  onAdd={handleAdd}
                  onEdit={() => abrirEdicao({
                    nome: name,
                    salario: limparNumero(`${salary}`),
                    valorEmpresa:  limparNumero(`${companyValuation}`)
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
