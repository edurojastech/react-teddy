import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getClients, postClient, deleteClient } from "../../API/fetch"; // ajuste se necessário
import { type Cliente, type ClienteRemove } from "../../types/Cliente";

export function useClientesPage() {
  const [userName] = useState(localStorage.getItem("UserName"));
  const navigate = useNavigate();

  const [cliente, setCliente] = useState<Cliente[]>([]);
  const [clientesList, setClientesList] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalDelete, setMostrarModalDelete] = useState(false);
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);
  const [clienteRemove, setClienteRemove] = useState<ClienteRemove | null>(null);
  const [hideLoader, setHideLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  const abrirCadastro = () => {
    setClienteEditando(null);
    setMostrarModal(true);
  };

  const abrirEdicao = (cliente: Cliente) => {
    setClienteEditando(cliente);
    setMostrarModal(true);
  };

  const abrirDelete = (cliente: ClienteRemove) => {
    setClienteRemove(cliente);
    setMostrarModalDelete(true);
  };

  const handleSelect = () => alert("selecionar cliente!");

  const handleSubmit = async (novoCliente: Cliente) => {
    if (clienteEditando) {
      setCliente((prev) =>
        prev.map((c) => (c === clienteEditando ? novoCliente : c))
      );
    } else {
      setCliente((prev) => [...prev, novoCliente]);
      const resp = await postClient(novoCliente);
      console.log(resp)
      if (resp) {
        alert("Cliente cadastrado com Sucesso!");
        listarClientes();
        setCurrentPage(1);
        setMostrarModal(false);
      }
    }
    setClienteEditando(null);
  };

  const listarClientes = (page = 1, limite = 12) => {
    getClients(page, limite).then((resp) => {
      setHideLoader(false);
      setClientesList(resp.clients);
    });
  };

  const deletarCliente = async () => {
    const resp = await deleteClient(clienteRemove?.id);
    if (resp === 200) {
      alert("Cliente removido com Sucesso!");
      setMostrarModalDelete(false);
      listarClientes();
      setCurrentPage(1);
    } else {
      alert("Erro ao deletar, tente novamente!");
    }
  };

  useEffect(() => {
    if (!userName) navigate("/");
    setHideLoader(true);
    listarClientes();
  }, [userName]);

  useEffect(() => {
    listarClientes(currentPage);
  }, [currentPage]);

  return {
    userName,
    cliente,
    clientesList,
    mostrarModal,
    mostrarModalDelete,
    clienteEditando,
    clienteRemove,
    hideLoader,
    currentPage,
    totalPages,
    abrirCadastro,
    abrirEdicao,
    abrirDelete,
    handleSelect,
    handleSubmit,
    listarClientes,
    deletarCliente,
    setCurrentPage,
    setMostrarModal,
    setMostrarModalDelete,
  };
}
