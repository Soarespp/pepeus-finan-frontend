import { ValidaPeriodo } from "./utilsGeral";
import { ParcelaData } from "../hooks/useParcelados/useParcelados";

export const sumParceladosMes = (
  parcelados: ParcelaData | undefined,
  dtValida: Date
): number => {
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

const returnDividos = (pessoas: { name: string; _id: string }[] | undefined) =>
  pessoas?.map((item) => item.name);

export const formataParcelados = (parcelados: ParcelaData) => {
  const parceladosFormatado = parcelados?.map((parcela) => {
    if (!parcela?.dtFim && !parcela?.dtFim) {
      return {
        ...parcela,
        divididos: returnDividos(
          parcela.pessoas as { name: string; _id: string }[] | undefined
        ),
      };
    }

    if (!!parcela?.dtFim) {
      parcela.dtFim = new Date(parcela.dtFim);
    }

    if (!!parcela?.dtCompra) {
      parcela.dtCompra = new Date(parcela.dtCompra);
    }

    return {
      ...parcela,
      divididos: returnDividos(
        parcela.pessoas as { name: string; _id: string }[] | undefined
      ),
    };
  });

  return parceladosFormatado;
};
