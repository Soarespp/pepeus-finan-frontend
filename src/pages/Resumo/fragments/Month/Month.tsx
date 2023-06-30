import React from "react";
import { TableRow, TableCell, IconButton } from "@mui/material";

import { sumParceladosMes } from "../../../../utils/utilParcelados";
import { ValidaPeriodo } from "../../../../utils/utilsGeral";
import { ParcelaData } from "../../../../hooks/useParcelados/useParcelados";
import {
  LacamentosData,
  LacamentosType,
} from "../../../../hooks/useLancamentos/useLancamentos";
import { ExtraType } from "../../../../hooks/useExtras/useExtras";
import { sumLancamentosMes } from "../../../../utils/utilsLancamentos";
import { getExtraSum } from "../../../../utils/utilsExtra";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";

type totaType = LacamentosData | ExtraType | ParcelaData | undefined;

const Month = ({
  row,
  year,
  itens,
  lancamentos,
  total,
  eventClick,
  subItem = false,
}: {
  row: Partial<LacamentosType>;
  year: number;
  itens?: ParcelaData;
  lancamentos?: {
    lancamentos: LacamentosData;
    type?: "despesa" | "receita";
  };
  total?: {
    descricao: string;
    itens: totaType;
  }[];
  eventClick?: () => void;
  subItem?: boolean;
}) => {
  const Months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const salario = Number(row.valor) / (row.vezes || 1);

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
      <TableRow key={row._id}>
        <TableCell align="right">
          <div
            style={{
              display: "flex",
              padding: "8px 26px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton size="large" onClick={eventClick}>
              <ChevronRightIcon />
            </IconButton>
            {row.descricao}
          </div>
        </TableCell>
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

      // <TableRow key={row._id}>
      //   <TableCell align="right">{row.descricao}</TableCell>
      //   {Months?.map((month) => (
      //     <TableCell key={month} align="right">
      //       {returnValueShow(
      //         sumParceladosMes(itens, new Date(`${year}/${month + 1}/01`))
      //       ).toLocaleString("pt-br", {
      //         style: "currency",
      //         currency: "BRL",
      //       })}
      //     </TableCell>
      //   ))}
      // </TableRow>
    );
  }

  if (total) {
    return (
      <TableRow key={row.descricao}>
        <TableCell align="right">{row.descricao}</TableCell>
        {Months?.map((month) => {
          const sumLancamentos = sumLancamentosMes(
            total.find((totalFilter) => totalFilter.descricao === "lancamentos")
              ?.itens as LacamentosData,
            new Date(`${year}/${month + 1}/01`)
          );

          const sumParcelados = sumParceladosMes(
            total.find((totalFilter) => totalFilter.descricao === "parcelados")
              ?.itens as ParcelaData,
            new Date(`${year}/${month + 1}/01`)
          );

          const sumExtra =
            getExtraSum(
              total.find((totalFilter) => totalFilter.descricao === "extras")
                ?.itens as ExtraType
            ) || 0;

          const soma = salario + sumLancamentos + sumParcelados + sumExtra;
          return (
            <TableCell key={month} align="right">
              {soma.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </TableCell>
          );
        })}
      </TableRow>
    );
  }

  if (lancamentos) {
    return (
      <TableRow key={row._id}>
        <TableCell align="right">
          <div
            style={{
              display: "flex",
              padding: "8px 26px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton size="large" onClick={eventClick}>
              <ChevronRightIcon />
            </IconButton>
            {`${row.descricao} tipo ${lancamentos?.type}`}
          </div>
        </TableCell>
        {Months?.map((month) => (
          <TableCell key={month} align="right">
            {returnValueShow(
              sumLancamentosMes(
                lancamentos.lancamentos,
                new Date(`${year}/${month + 1}/01`),
                false,
                false,
                lancamentos?.type
              )
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
    <TableRow
      key={row._id}
      sx={{ backgroundColor: subItem ? "#eaeaea" : "#fff" }}
    >
      <TableCell align="right">{row.descricao}</TableCell>
      {Months?.map((month) => (
        <TableCell key={month} align="right">
          {ValidaPeriodo(
            row.dtFim,
            new Date(`${year}/${month + 1}/01`),
            row.dtCompra
          )
            ? returnValueShow(Number(salario), row.type)?.toLocaleString(
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
