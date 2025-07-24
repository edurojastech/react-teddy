/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type Cliente } from "../../types/Cliente";
import { getClients, postClient } from "../../API/fetch";
import { limparNumero } from "../../utils/moneyFormat";
import Card from "../../components/Card";
import ModalCliente from "../../components/Modais/ModalCliente";
import Dashboard from "../../layouts/Dashboard";
import "./styles.css";

export default function Home() {
  const [userName, setUserName] = useState(localStorage.getItem("UserName"));
  const navigate = useNavigate();

  const [cliente, setCliente] = useState<Cliente[]>([]);
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

  const handleSubmit =  async (novoCliente: Cliente) => {
    if (clienteEditando) {
      setCliente((prev) =>
        prev.map((c) =>
          c === clienteEditando ? novoCliente : c
        )
      );
    } else {
      setCliente((prev) => [...prev, novoCliente]);
      console.log(novoCliente)
      await postClient(novoCliente).then((resp) => {
        if(resp) {
          alert('Cliente cadastrado com Sucesso!')
          setMostrarModal(false)
          listarClientes()
        }
      })
    }
    setClienteEditando(null);
  };

  const listarClientes = () => {
    getClients(1, 40).then(resp => setClientesList(resp.clients))
  }

  useEffect(() => {
    userName == null && navigate("/");
    listarClientes()
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
                    name: name,
                    salary: limparNumero(`${salary}`),
                    companyValuation:  limparNumero(`${companyValuation}`)
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
