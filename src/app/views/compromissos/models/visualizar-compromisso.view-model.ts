import { ListarContatoViewModel } from "../../contatos/models/listar-contato.view-model";
import { TipoLocalEnum } from "./tipo-local-compromisso.enum";

export type VisualizarCompromissoViewModel = {
  id: string;
  assunto: string;
  local: string;
  tipoLocal: TipoLocalEnum;
  link: string;
  data: Date;
  horaInicio: string;
  horaTermino: string;
  contato?: ListarContatoViewModel
}