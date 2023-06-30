import { getYear } from "date-fns";
import {
  LacamentosData,
  LacamentosType,
} from "../hooks/useLancamentos/useLancamentos";

export const getTotaisYear = ({
  lancamentos,
  year,
  salario,
}: {
  lancamentos: Partial<LacamentosData> | undefined;
  year: number;
  salario: number;
}): number => {
  const resultValue = lancamentos
    ?.filter(
      (item) => getYear(item?.dtFim || new Date()) === year || !item?.dtFim
    )
    .reduce(
      (
        previus: number,
        creature: Partial<LacamentosType> | undefined
      ): number => {
        if (!!creature?.valor) {
          let val =
            creature?.type === "despesa"
              ? -1 * creature?.valor
              : creature?.valor;
          return previus + val;
        }

        return previus;
      },
      0
    );
  return (resultValue || 0) + salario;
};

export const getTotalMonth = ({
  valores,
  salario,
}: {
  valores: { descricao: string; valor: number }[] | undefined;
  salario: number;
}): number => {
  const resultValue = valores?.reduce(
    (
      previus: number,
      creature: {
        descricao: string;
        valor: number;
      }
    ): number => {
      if (!!creature?.valor) {
        return previus + creature?.valor;
      }

      return previus;
    },
    0
  );
  return (resultValue || 0) + salario;
};
