import { StatusItemTarefa } from "./status-item.enum";

export type ItemTarefaViewModel = {
  id?: string;
  titulo: string;
  status: StatusItemTarefa;
  concluido: boolean;
}