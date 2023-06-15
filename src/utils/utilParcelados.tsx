import { format } from "date-fns";
import { ParcelaData } from "../contexts/financeiro/FinanContexts";
import { ValidaPeriodo } from "./utilsGeral";

export const sumParceladosMes = (
  parcelados: ParcelaData | undefined,
  dtValida: Date
): number => {
  if (dtValida && format(dtValida, "yyyy/mm") === "2023/01") {
    console.log(format(dtValida, "yyyy/mm"));
  }
  const sum: number =
    parcelados?.reduce((sum, currente) => {
      return ValidaPeriodo(currente.dtFim, dtValida, currente.dtCompra)
        ? sum -
            currente.valor /
              currente.vezes /
              ((!!currente?.pessoas ? currente?.pessoas?.length : 0) + 1)
        : sum;
    }, 0) || 0;
  return sum;
};
