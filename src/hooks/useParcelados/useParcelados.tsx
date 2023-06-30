import { useCallback, useState } from "react";
import ApiAxios from "../../service/ApiAxios";
import { formataParcelados } from "../../utils/utilParcelados";

export interface Parcela {
  _id: string;
  valor: number;
  user: string;
  descricao: string;
  cartao: string;
  vezes: number;
  dtFim: Date;
  dtCompra: Date;
  observacao?: string;
  pessoas?: { name: string }[];
}

export type ParcelaData = Parcela[];

const useParcelados = () => {
  const [data, setData] = useState<ParcelaData>();

  const getDadosParcelados = useCallback(
    (user: string | undefined) =>
      ApiAxios.get(`/parcelados?user=${user}`).then((response) => {
        setData(formataParcelados(response.data.parcelados));
      }),
    []
  );

  const insertParcela = useCallback(async (data: Parcela | undefined) => {
    return (
      !!data &&
      (await ApiAxios.post("/parcelados", {
        ...data,
      }))
    );
  }, []);

  const updateParcela = useCallback(async (data: Parcela | undefined) => {
    if (!data) {
      return;
    }

    await ApiAxios.put("/parcelados", { data }).catch((error) => {
      console.log({ error });
    });
  }, []);

  const delParcela = useCallback(
    async (id: string) => await ApiAxios.delete(`/parcelados?_id=${id}`),
    []
  );

  // const insertParcela = async (data: Parcela | undefined) => {
  //   return (
  //     !!data &&
  //     (await ApiAxios.post("/parcelados", {
  //       ...data,
  //     }))
  //   );
  // };

  // const updateParcela = async (data: Parcela | undefined) => {
  //   if (!data) {
  //     return;
  //   }

  //   const id = data._id;
  //   let dataUpdate: Partial<Parcela> = { ...data };
  //   delete dataUpdate._id;
  //   return (
  //     !!data &&
  //     (await ApiAxios.put(`/parcelados/${id}`, {
  //       ...dataUpdate,
  //     }))
  //   );
  // };

  // const delParcela = async (id: string) => {
  //   return await ApiAxios.delete(`/parcelados/${id}`);
  // };

  return { data, getDadosParcelados, insertParcela, updateParcela, delParcela };
};

export default useParcelados;
