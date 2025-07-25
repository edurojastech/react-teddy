/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from "react";
import { useClientesPage } from "./useClientePage";
import { limparNumero } from "../../utils/moneyFormat";
import Card from "../../components/Card";
import ModalCliente from "../../components/Modais/ModalCliente";
import ModalDelete from "../../components/Modais/ModalDelete";
import Dashboard from "../../layouts/Dashboard";
import "./styles.css";
import Pagination from "../../components/Pagination";
import Loader from "../../components/Loader";

export default function Home() {
  const {
    userName,
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
  } = useClientesPage()

  return (
    <main>
      <Dashboard nameUser={userName}>
        {hideLoader && <Loader />}
        {
          !hideLoader && (
            <>
              <div className="container mt-3">
                <p><b>{clientesList.length}</b> clientes encontrados:</p>
              </div>

              <div className="container grid mb-2">
                {
                  clientesList?.map(({ name, salary, companyValuation, id }, key) => {
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
                          companyValuation: limparNumero(`${companyValuation}`),
                          id: id
                        })}
                        onDelete={() => {
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
            </>
          )
        }

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