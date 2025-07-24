/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type Cliente, type ClienteRemove } from "../../types/Cliente";
import { deleteClient, getClients, postClient } from "../../API/fetch";
import { limparNumero } from "../../utils/moneyFormat";
import Card from "../../components/Card";
import ModalCliente from "../../components/Modais/ModalCliente";
import ModalDelete from "../../components/Modais/ModalDelete";
import Dashboard from "../../layouts/Dashboard";
import "./styles.css";
import Pagination from "../../components/Pagination";

export default function Home() {
  const [userName, setUserName] = useState(localStorage.getItem("UserName"));
  const navigate = useNavigate()

  const [cliente, setCliente] = useState<Cliente[]>([]);
  const [clientesList, setClientesList] = useState([])
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalDelete, setMostrarModalDelete] = useState(false);
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);
  const [clienteRemove, setClienteRemove] = useState<ClienteRemove | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  const abrirCadastro = () => {
    setClienteEditando(null);
    setMostrarModal(true);
  }

  const abrirEdicao = (cliente: Cliente) => {
    setClienteEditando(cliente);
    setMostrarModal(true);
  }

  const abrirDelete = (cliente: ClienteRemove) => { 
    setClienteRemove(cliente)
  }

  const handleSelect = () => alert('selecionar cliente!')

  const handleSubmit =  async (novoCliente: Cliente) => {
    if (clienteEditando) {
      setCliente((prev) =>
        prev.map((c) =>
          c === clienteEditando ? novoCliente : c
        )
      )
    } else {
      setCliente((prev) => [...prev, novoCliente]);
      await postClient(novoCliente).then((resp) => {
        if(resp) {
          alert('Cliente cadastrado com Sucesso!')
          setMostrarModal(false)
          listarClientes()
          setCurrentPage(1)
        }
      })
    }
    setClienteEditando(null);
  }

  const listarClientes = (page = 1, limite = 12) => {
    getClients(page, limite).then(resp => setClientesList(resp.clients))
  }

  const deletarCliente = async () => {
    deleteClient(clienteRemove?.id).then((resp)=> {
      if(resp == 200){
        alert('Cliente removido com Sucesso!')
        setMostrarModalDelete(false)
        listarClientes()
        setCurrentPage(1)
      }else{
        alert("Erro ao deletar, tente novamente!")
      }
    })
  }

  useEffect(() => {
    userName == null && navigate("/");
    listarClientes()
  }, [userName])

  useEffect(()=> {
    listarClientes(currentPage)
  }, [currentPage])

  return (
    <main>
      <Dashboard nameUser={userName}>
        <div className="container mt-3">
          <p><b>{clientesList.length}</b> clientes encontrados:</p>
        </div>
        <div className="container grid mb-2">
          {
            clientesList?.map(({ name, salary, companyValuation, id}, key) => {
              return (
                <Card
                  key={key}
                  nome={name}
                  salario={salary}
                  empresa={companyValuation}
                  onAdd={handleSelect}
                  onEdit={() => abrirEdicao({
                    name: name,
                    salary: limparNumero(`${salary}`),
                    companyValuation:  limparNumero(`${companyValuation}`),
                    id: id
                  })}
                  onDelete={()=> {
                    setMostrarModalDelete(true)
                    abrirDelete({
                      name: name,
                      id: id,
                    })
                  }}
                />
              )
            })
          }
        </div>

        <div className="container d-grid mb-3">
          <button className="btn btn-outline-primary btn-block" onClick={abrirCadastro}>
            Criar cliente
          </button>
        </div>

        <div className="container mb-5">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>

        <ModalCliente
          show={mostrarModal}
          onClose={() => setMostrarModal(false)}
          onSubmit={handleSubmit}
          clienteEditando={clienteEditando}
        />

        <ModalDelete
          onClose={() => setMostrarModalDelete(false)}          
          show={mostrarModalDelete}
          clienteRemover={clienteRemove}
          onDelete={deletarCliente}
        />
      </Dashboard>
    </main>
  );
}
