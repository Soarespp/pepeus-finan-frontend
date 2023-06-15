import { getYear } from "date-fns";
import {
  ExtraData,
  LacamentosData,
  LacamentosType,
} from "../contexts/financeiro/FinanContexts";

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

export const getExtraSum = (dados: ExtraData[]): number => {
  const resultSum = dados?.reduce(
    (previus: number, currente: Partial<ExtraData> | undefined) => {
      return previus + (currente?.valor || 0);
    },
    0
  );

  return resultSum;
};
