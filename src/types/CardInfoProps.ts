export interface CardInfoProps {
  nome: string;
  salario: string | number;
  empresa: string | number;
  onAdd: () => void;
  onEdit: any;
  onDelete: () => void;
}