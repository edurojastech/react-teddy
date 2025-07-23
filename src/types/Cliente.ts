export interface Cliente {
  nome: string;
  salario: string;
  valorEmpresa: string;
}

export interface ModalClienteProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (data: Cliente) => void;
  clienteEditando?: Cliente | null; // se vier preenchido, entra no modo "editar"
}
