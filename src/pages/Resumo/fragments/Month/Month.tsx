import React from "react";
import { TableRow, TableCell } from "@mui/material";
import {
  LacamentosType,
  ParcelaData,
} from "../../../../contexts/financeiro/FinanContexts";

import { sumParceladosMes } from "../../../../utils/utilParcelados";
import { ValidaPeriodo } from "../../../../utils/utilsGeral";

const Month = ({
  row,
  year,
  itens,
}: {
  row: Partial<LacamentosType>;
  year: number;
  itens?: ParcelaData;
}) => {
  const Months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const returnValueShow = (
    valor: number,
    type?: "despesa" | "receita" | undefined
  ): number => {
    if (!type) {
      return valor;
    }

    return type === "receita" ? valor : valor * -1;
  };

  if (itens) {
    return (
      <TableRow key={row.id}>
        <TableCell align="right">{row.descricao}</TableCell>
        {Months?.map((month) => (
          <TableCell key={month} align="right">
            {returnValueShow(
              sumParceladosMes(itens, new Date(`${year}/${month + 1}/01`))
            ).toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  return (
    <TableRow key={row.id}>
      <TableCell align="right">{row.descricao}</TableCell>
      {Months?.map((month) => (
        <TableCell key={month} align="right">
          {ValidaPeriodo(
            row.dtFim,
            new Date(`${year}/${month + 1}/01`),
            row.dtCompra
          )
            ? returnValueShow(Number(row.valor), row.type)?.toLocaleString(
                "pt-br",
                {
                  style: "currency",
                  currency: "BRL",
                }
              )
            : "0,00"}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default Month;
