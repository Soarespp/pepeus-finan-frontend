import { useCallback, useState } from "react";
import ApiAxios from "../../service/ApiAxios";
import { fomartaLancamentos } from "../../utils/utilsLancamentos";

export interface LacamentosType {
  _id: string;
  descricao: string;
  type: "despesa" | "receita";
  valor: number;
  user: string;
  dtCompra?: Date;
  vezes?: number;
  dtFim?: Date;
  default?: boolean;
  lancamentoCard?: boolean;
  resumo?: boolean;
}

export type LacamentosData = LacamentosType[];

const useLancamentos = () => {
  const [data, setData] = useState<LacamentosData>();
  const getDadosLancamentos = useCallback(
    (user: String) =>
      ApiAxios.get(`/lancamentos/${user}`).then((response) => {
        setData(fomartaLancamentos(response.data.lancamentos));
      }),
    []
  );

  const insertLancamento = async (data: Partial<LacamentosType>) => {
    return (
      !!data &&
      (await ApiAxios.post("/lancamentos", {
        ...data,
      }))
    );
  };

  const delCarteira = async (id: string) => {
    return await ApiAxios.delete(`/lancamentos/${id}`);
  };

  return {
    data,
    getDadosLancamentos,
    insertLancamento,
    delCarteira,
  };
};

export default useLancamentos;
