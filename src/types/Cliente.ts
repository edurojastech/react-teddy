export interface Cliente {
  name: string;
  salary: string | number;
  companyValuation: string | number;
}

export interface ModalClienteProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (data: Cliente) => void;
  clienteEditando?: Cliente | null; // se vier preenchido, entra no modo "editar"
}
