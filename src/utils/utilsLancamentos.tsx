import { LacamentosData } from "../hooks/useLancamentos/useLancamentos";
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
  dtValida: Date,
  descCard?: boolean,
  descResumo?: boolean,
  type?: string
): number => {
  const sum: number =
    lancamentos
      ?.filter((item) => (descCard ? !item.lancamentoCard : true))
      ?.filter((item) => (descResumo ? !item.resumo : true))
      ?.filter((item) => (type ? item.type === type : true))
      ?.filter((item) => ValidaPeriodo(item.dtFim, dtValida, item?.dtCompra))
      .reduce((sum, currente) => {
        const value =
          (currente.type === "despesa" ? -1 * currente.valor : currente.valor) /
          (currente.vezes || 1);
        return sum + value;
      }, 0) || 0;

  return Math.round(sum);
};

export const fomartaLancamentos = (lancamentos: LacamentosData) => {
  const lancamentoFormatado = lancamentos?.map((item) => {
    if (!item.dtCompra) {
      return { ...item };
    }

    if (!item.dtFim) {
      return {
        ...item,
        dtCompra: new Date(item.dtCompra),
      };
    }

    return {
      ...item,
      dtFim: new Date(item.dtFim),
      dtCompra: new Date(item.dtCompra),
    };
  });
  return lancamentoFormatado;
};
