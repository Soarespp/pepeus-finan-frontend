import { useCallback, useState } from "react";
import ApiAxios from "../../service/ApiAxios";

export type categoriaType = {
  descricao: string;
  color: string;
  type: "READ_ONLY" | "NEW" | "UPDATE" | "DELETE";
  user: string;
  _id?: string;
};

export type categoriasData = categoriaType[];

const useCategoria = () => {
  const [data, setData] = useState<categoriasData>();
  const getDadosCategoria = useCallback(
    (user: String | undefined) =>
      ApiAxios.get(`/categoria?user=${user}`).then((response) => {
        setData(response.data.categorias);
      }),
    []
  );

  const insertCategoria = async (data: Partial<categoriaType>) => {
    return (
      !!data &&
      (await ApiAxios.post("/categoria", {
        ...data,
      }))
    );
  };

  const updateCategoria = async (data: categoriasData | undefined) => {
    if (!data) {
      return;
    }

    return (
      !!data &&
      (await ApiAxios.put(`/categoria`, {
        ...data,
      }))
    );
  };

  const delCategoria = async (id: string) => {
    return await ApiAxios.delete(`/categoria/${id}`);
  };

  // const aplicarCategoria = async (categorias: categoriasData) => {
  //   return (
  //     !!categorias &&
  //     (await ApiAxios.post("/categoria/aplicar_categorias", {
  //       categorias: [...categorias],
  //     }))
  //   );
  // };

  const aplicarCategoria = async (categorias: categoriasData, user: string) => {
    return (
      !!categorias &&
      (await ApiAxios.post("/categoria/aplicar_categorias", {
        categorias: [...categorias],
      }).then(() => getDadosCategoria(user)))
    );
  };

  return {
    data,
    getDadosCategoria,
    insertCategoria,
    updateCategoria,
    delCategoria,
    aplicarCategoria,
  };
};

export default useCategoria;
