import { TipoLocalEnum } from "./tipo-local-compromisso.enum";

export type FormCompromissoViewModel = {
  assunto: string;
  local: string;
  tipoLocal: TipoLocalEnum;
  link: string;
  data: Date;
  horaInicio: string;
  horaTermino: string;
  contatoId?: string;
}

