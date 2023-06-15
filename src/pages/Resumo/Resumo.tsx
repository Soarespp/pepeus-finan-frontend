import React, { useState } from "react";

import {
  TableContainer,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Grid,
  Button,
  Typography,
} from "@mui/material";
import { addYears, getYear } from "date-fns";

import { useFinanContext } from "../../contexts/financeiro/FinanContexts";
import { getExtraSum, getTotaisYear } from "../../utils/useFinanUtils";
import Month from "./fragments/Month";
import Consolidacao from "./fragments/Consolidacao";

const Resumo = () => {
  const { lancamentos, salario, extras, parcelados } = useFinanContext();
  const [year, setYear] = useState(new Date());

  console.log("resumo", { parcelados, lancamentos });

  return (
    <Grid
      container
      sx={{
        margin: "20px auto",
        display: "flex",
      }}
    >
      <Grid
        item
        justifyContent="center"
        textAlign="center"
        xs={12}
        display="flex"
        sx={{ boxShadow: "0px 2px 2px 2px gray" }}
      >
        <Button onClick={() => setYear(addYears(year, -1))}>Prev</Button>
        <Typography variant="h6">{getYear(year)}</Typography>
        <Button onClick={() => setYear(addYears(year, 1))}>Next</Button>
      </Grid>
      <Grid container sx={{ boxShadow: "0px 1px 1px 1px gray" }}>
        <Grid container item xs={12}>
          <TableContainer>
            <TableHead>
              <TableRow>
                <TableCell align="right"></TableCell>
                <TableCell align="right">Janeiro</TableCell>
                <TableCell align="right">Fevereiro</TableCell>
                <TableCell align="right">Março</TableCell>
                <TableCell align="right">Abril</TableCell>
                <TableCell align="right">Maio</TableCell>
                <TableCell align="right">Junho</TableCell>
                <TableCell align="right">Julho</TableCell>
                <TableCell align="right">Agosto</TableCell>
                <TableCell align="right">Setembro</TableCell>
                <TableCell align="right">Outubro</TableCell>
                <TableCell align="right">Novembro</TableCell>
                <TableCell align="right">Dezembro</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <Month
                row={{ descricao: "Salario", type: "receita", valor: salario }}
                year={getYear(year)}
              />

              {lancamentos
                ?.filter(
                  (item) =>
                    (!item.dtFim || getYear(item.dtFim) === getYear(year)) &&
                    item?.type === "receita"
                )
                .map((row) => (
                  <Month row={row} year={getYear(year)} />
                ))}
              <Month
                row={{
                  descricao: "Cartões",
                  type: "despesa",
                  valor: 0,
                }}
                year={getYear(year)}
                itens={parcelados}
              />
              <Month
                row={{
                  descricao: "Extras",
                  type: "despesa",
                  valor: getExtraSum(extras),
                }}
                year={getYear(year)}
              />
              {lancamentos
                ?.filter(
                  (item) =>
                    (!item.dtFim || getYear(item.dtFim) === getYear(year)) &&
                    item?.type === "despesa"
                )
                .map((row) => (
                  <Month row={row} year={getYear(year)} />
                ))}
              <Month
                row={{
                  descricao: "Total",
                  valor: getTotaisYear({
                    lancamentos: lancamentos,
                    year: Number(getYear(year)),
                    salario,
                  }),
                }}
                year={getYear(year)}
              />
            </TableBody>
          </TableContainer>
        </Grid>
      </Grid>
      <Consolidacao />
    </Grid>
  );
};

export default Resumo;
