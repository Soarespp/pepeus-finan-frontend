import { useCallback, useState } from "react";
import ApiAxios from "../../service/ApiAxios";

export interface ExtraData {
  valor: number;
  descricao: string;
  user: string;
  _id?: string;
  dtFim?: Date;
  isState?: "update" | "unknown" | "transaction";
}

export type ExtraType = ExtraData[];

const useExtras = () => {
  const [data, setData] = useState<ExtraType>();
  const getDadosExtra = useCallback(
    (user: String) =>
      ApiAxios.get(`/extras/${user}`).then((response) => {
        setData(response.data.extras);
      }),
    []
  );

  const insertLancamento = async (data: Partial<ExtraType>) => {
    return (
      !!data &&
      (await ApiAxios.post("/extras", {
        ...data,
      }))
    );
  };

  const updateLancamento = async (data: ExtraData) => {
    return (
      !!data &&
      (await ApiAxios.put("/extras", {
        ...data,
      }))
    );
  };

  const delExtra = async (id: string) => {
    return await ApiAxios.delete(`/extras/${id}`);
  };

  return {
    data,
    getDadosExtra,
    insertLancamento,
    updateLancamento,
    delExtra,
  };
};

export default useExtras;
