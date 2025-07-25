/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Cliente {
  id?: any,
  name: string;
  salary: string | number;
  companyValuation: string | number;
}

export interface ClienteRemove {
  id: any,
  name: string;
}

export interface ModalClienteProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (data: Cliente) => any;
  clienteEditando?: Cliente | null; 
}

export interface ModalDeleteProps {
  show: boolean;
  onClose: () => void;
  onDelete?: (id: any) => void;
  clienteRemover?: ClienteRemove | null
}
