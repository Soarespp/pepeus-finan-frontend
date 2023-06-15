import { LacamentosData } from "../contexts/financeiro/FinanContexts";
import { ValidaPeriodo } from "./utilsGeral";

export const getLancamentosMes = (
  lancametos: LacamentosData | undefined,
  dtValida: Date
) => {
  const itens = lancametos
    ?.filter((itm) => ValidaPeriodo(itm.dtFim, dtValida, itm.dtCompra))
    .map((lancamento) => ({
      descricao: lancamento.descricao,
      valor: -1 * lancamento.valor,
    }));

  return itens || [];
};

export const sumLancamentosMes = (
  lancamentos: LacamentosData | undefined,
  dtValida: Date
): number => {
  const sum: number =
    lancamentos?.reduce((sum, currente) => {
      return ValidaPeriodo(currente.dtFim, dtValida, currente?.dtCompra)
        ? sum - currente.valor
        : sum;
    }, 0) || 0;

  return sum;
};
