import { useCallback, useState } from "react";
import ApiAxios from "../../service/ApiAxios";

export type typeCartoes = { descricao: string; valor: number }[];
export type typeVariaveis = {
  descricao: string;
  valor: number;
}[];

export interface Carteira {
  _id: string;
  salario: number;
  user: string;
  alterado?: boolean;
  cartoes?: typeCartoes;
  variaveis: typeVariaveis;
}

const useCarteira = () => {
  const [data, setData] = useState<Carteira>();
  const getDadosCarteira = useCallback(
    (user: String | undefined) =>
      ApiAxios.get(`/carteira/${user}`).then((response) => {
        setData(response.data.carteira);
      }),
    []
  );

  const insertCarteira = async (data: Partial<Carteira>) => {
    return (
      !!data &&
      (await ApiAxios.post("/carteira", {
        ...data,
      }))
    );
  };

  const updateCarteira = async (data: Partial<Carteira> | undefined) => {
    if (!data) {
      return;
    }

    let dataUpdate: Partial<Carteira> = { ...data };
    delete dataUpdate._id;

    return (
      !!data &&
      (await ApiAxios.put(`/carteira/${data.user}`, {
        ...dataUpdate,
      }))
    );
  };

  const delCarteira = async (id: string) => {
    return await ApiAxios.delete(`/carteira/${id}`);
  };

  return {
    data,
    getDadosCarteira,
    insertCarteira,
    updateCarteira,
    delCarteira,
  };
};

export default useCarteira;
